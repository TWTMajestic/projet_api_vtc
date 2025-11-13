import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { hashPassword } from '@/app/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body?.email?.toString().toLowerCase().trim()
    const password = body?.password?.toString()
    const name = body?.name?.toString().trim() || null

    if (!email || !password) {
      return NextResponse.json(
        { error: 'email et password sont obligatoires' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Un utilisateur existe déjà avec cet email' },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: { email, passwordHash, name }
    })

    return NextResponse.json(
      {
        data: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[auth/register.POST]', error)

    return NextResponse.json(
      { error: 'Erreur interne, impossible de créer l’utilisateur' },
      { status: 500 }
    )
  }
}

