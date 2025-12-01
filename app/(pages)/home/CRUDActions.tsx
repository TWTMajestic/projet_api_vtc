'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type Mode = 'vehicles' | 'models' | 'sellers'

type CRUDActionsProps = {
  mode: Mode
}

const crudConfig: Record<Mode, {
  title: string
  actions: {
    title: string
    description: string
    href: string
    icon: ReactNode
    color: string
    textColor: string
    bgColor: string
  }[]
}> = {
  vehicles: {
    title: 'Gestion des véhicules',
    actions: [
      {
        title: 'Créer un véhicule',
        description: 'Ajouter un nouveau véhicule à la base de données',
        href: '/CRUD/vehicles/create',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
        color: 'bg-blue-500 hover:bg-blue-600',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Lister les véhicules',
        description: 'Voir tous les véhicules disponibles',
        href: '/CRUD/vehicles/list',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        ),
        color: 'bg-green-500 hover:bg-green-600',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Modifier un véhicule',
        description: 'Mettre à jour les informations d\'un véhicule',
        href: '/CRUD/vehicles/edit',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        ),
        color: 'bg-yellow-500 hover:bg-yellow-600',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        title: 'Supprimer un véhicule',
        description: 'Retirer un véhicule de la base de données',
        href: '/CRUD/vehicles/delete',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        ),
        color: 'bg-red-500 hover:bg-red-600',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50'
      }
    ]
  },
  models: {
    title: 'Gestion des modèles',
    actions: [
      {
        title: 'Créer un modèle',
        description: 'Ajouter un nouveau modèle à la base de données',
        href: '/CRUD/models/create',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
        color: 'bg-blue-500 hover:bg-blue-600',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Lister les modèles',
        description: 'Voir tous les modèles disponibles',
        href: '/CRUD/models/list',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        ),
        color: 'bg-green-500 hover:bg-green-600',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Modifier un modèle',
        description: 'Mettre à jour les informations d\'un modèle',
        href: '/CRUD/models/edit',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        ),
        color: 'bg-yellow-500 hover:bg-yellow-600',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        title: 'Supprimer un modèle',
        description: 'Retirer un modèle de la base de données',
        href: '/CRUD/models/delete',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        ),
        color: 'bg-red-500 hover:bg-red-600',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50'
      }
    ]
  },
  sellers: {
    title: 'Gestion des vendeurs',
    actions: [
      {
        title: 'Créer un vendeur',
        description: 'Ajouter un nouveau vendeur à la base de données',
        href: '/CRUD/sellers/create',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
        color: 'bg-blue-500 hover:bg-blue-600',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Lister les vendeurs',
        description: 'Voir tous les vendeurs disponibles',
        href: '/CRUD/sellers/list',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        ),
        color: 'bg-green-500 hover:bg-green-600',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Modifier un vendeur',
        description: 'Mettre à jour les informations d\'un vendeur',
        href: '/CRUD/sellers/edit',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        ),
        color: 'bg-yellow-500 hover:bg-yellow-600',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        title: 'Supprimer un vendeur',
        description: 'Retirer un vendeur de la base de données',
        href: '/CRUD/sellers/delete',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        ),
        color: 'bg-red-500 hover:bg-red-600',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50'
      }
    ]
  }
}

export default function CRUDActions({ mode }: CRUDActionsProps) {
  const config = crudConfig[mode]

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">{config.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
          >
            <div className="flex items-start gap-4">
              <div className={`${action.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className={action.textColor}>
                  {action.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                  Accéder
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${action.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
          </Link>
        ))}
      </div>
    </div>
  )
}

