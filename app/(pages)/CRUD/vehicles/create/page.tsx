import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { getAuthSecret } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import CreateVehicleForm from '../../../CRUD/CreateVehicleForm'

async function validateAuthorization(): Promise<{ email: string; name?: string | null } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  const secret = getAuthSecret()

  if (!token || !secret) {
    return null
  }

  try {
    const payload = jwt.verify(token, secret) as {
      email: string
      name?: string | null
    }
    return { email: payload.email, name: payload.name }
  } catch (error) {
    console.error('[create.validateAuthorization]', error)
    return null
  }
}

export default async function CreateVehiclePage() {
  const session = await validateAuthorization()

  if (!session) {
    redirect('/')
  }

  // Récupérer les modèles et les vendeurs
  const [models, sellers] = await Promise.all([
    prisma.model.findMany({
      orderBy: [
        { brand: 'asc' },
        { name: 'asc' }
      ]
    }),
    prisma.seller.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-2xl rounded-lg bg-white p-8 shadow">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Créer un véhicule</h1>
          <p className="text-sm text-slate-600 mt-1">Remplissez le formulaire pour ajouter un nouveau véhicule</p>
        </div>
        <CreateVehicleForm models={models} sellers={sellers} />
      </section>
    </main>
  )
}

