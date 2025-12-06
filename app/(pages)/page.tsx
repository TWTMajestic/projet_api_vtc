import { getServerSession } from '@/app/lib/serverAuth'
import Navbar from './home/Navbar'
import CRUDActions from './home/CRUDActions'
import ProfileMenu from './home/ProfileMenu'
import Link from 'next/link'

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string }> | { mode?: string }
}) {
  const session = await getServerSession()
  const isAuthenticated = !!session
  const isAdmin = session?.role === 'ADMIN'

  const params = await Promise.resolve(searchParams)
  const currentMode = (params.mode || 'vehicles') as 'vehicles' | 'models' | 'sellers' | 'users'

  console.log('[DEBUG] session.role:', session?.role, '| isAdmin:', isAdmin)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-slate-800">Tableau de bord</h1>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/swagger"
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  API Docs
                </Link>
                <ProfileMenu name={session.name ?? null} email={session.email} />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/swagger"
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  API Docs
                </Link>
                <Link
                  href="/login"
                  className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Se connecter
                </Link>
              </div>
            )}
          </div>
          <p className="text-slate-600">Gérez vos données avec les opérations CRUD</p>
        </div>

        <Navbar isAdmin={isAdmin} />

        <CRUDActions mode={currentMode} isAdmin={isAdmin} />
      </div>
    </main>
  )
}
