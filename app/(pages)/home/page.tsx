import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { getAuthSecret } from '@/app/lib/auth'
import Link from 'next/link'
import Navbar from './Navbar'
import CRUDActions from './CRUDActions'

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
    console.error('[home.validateAuthorization]', error)
    return null
  }
}

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string }> | { mode?: string }
}) {
  const session = await validateAuthorization()

  if (!session) {
    redirect('/')
  }

  const params = await Promise.resolve(searchParams)
  const currentMode = (params.mode || 'vehicles') as 'vehicles' | 'models' | 'sellers'

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-slate-800">Tableau de bord</h1>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-slate-500">Connecté en tant que</p>
                <p className="text-lg font-semibold text-slate-700">{session.name || session.email}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {(session.name || session.email || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <p className="text-slate-600">Gérez vos données avec les opérations CRUD</p>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* CRUD Actions */}
        <CRUDActions mode={currentMode} />
      </div>
    </main>
  )
}

