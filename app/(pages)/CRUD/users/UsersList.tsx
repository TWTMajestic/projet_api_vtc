'use client'

import { useState } from 'react'
import { fetchWithAuth } from '@/app/lib/fetchWithAuth'

type User = {
  id: string
  email: string
  name: string | null
  role: 'USER' | 'ADMIN'
  createdAt: string
}

type UsersListProps = {
  initialUsers: User[]
  currentUserId: string
}

export default function UsersList({ initialUsers, currentUserId }: UsersListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'ADMIN') => {
    if (userId === currentUserId) {
      setError('Vous ne pouvez pas modifier votre propre rôle')
      return
    }

    setLoading(userId)
    setError(null)

    try {
      const response = await fetchWithAuth(`/api/v2/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la modification')
      }

      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (userId: string) => {
    if (userId === currentUserId) {
      setError('Vous ne pouvez pas supprimer votre propre compte')
      return
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return
    }

    setLoading(userId)
    setError(null)

    try {
      const response = await fetchWithAuth(`/api/v2/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la suppression')
      }

      setUsers(users.filter(u => u.id !== userId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rôle</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Inscrit le</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">
                        {user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-slate-800">{user.email}</span>
                    {user.id === currentUserId && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        Vous
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {user.name || '-'}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                    disabled={loading === user.id || user.id === currentUserId}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-50 border-purple-200 text-purple-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    } ${user.id === currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-slate-300'}`}
                  >
                    <option value="USER">Utilisateur</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={loading === user.id || user.id === currentUserId}
                    className={`p-2 rounded-lg transition-colors ${
                      user.id === currentUserId
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-red-500 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    {loading === user.id ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            Aucun utilisateur trouvé
          </div>
        )}
      </div>
    </div>
  )
}

