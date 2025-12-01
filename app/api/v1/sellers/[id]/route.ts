import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { Prisma } from '@/app/generated/prisma/client'

export const runtime = 'nodejs'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_: Request, props: Props) {
  try {
    const params = await props.params
    const seller = await prisma.seller.findUnique({
      where: { id: params.id },
      include: {
        vehicles: {
          select: { id: true, model: { select: { name: true, brand: true } } }
        }
      }
    })

    if (!seller) {
      return NextResponse.json({ error: 'Vendeur introuvable' }, { status: 404 })
    }

    return NextResponse.json({ data: seller })
  } catch (error) {
    console.error('[sellers/:id.GET]', error)
    return NextResponse.json(
      { error: 'Impossible de récupérer le vendeur' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, props: Props) {
  try {
    const params = await props.params
    const body = await request.json()
    const data: Prisma.SellerUpdateInput = {}

    if (body.name !== undefined) {
      const name = body.name?.toString().trim()
      if (!name) {
        return NextResponse.json(
          { error: 'Le nom ne peut pas être vide' },
          { status: 400 }
        )
      }
      data.name = name
    }

    if (body.email !== undefined) {
      const email = body.email?.toString().trim() || null
      // Check uniqueness if email is being updated to a non-null value
      if (email) {
        const existing = await prisma.seller.findUnique({
          where: { email }
        })
        if (existing && existing.id !== params.id) {
          return NextResponse.json(
            { error: 'Un autre vendeur utilise déjà cet email' },
            { status: 409 }
          )
        }
      }
      data.email = email
    }

    if (body.phone !== undefined) {
      data.phone = body.phone?.toString().trim() || null
    }

    if (body.website !== undefined) {
      data.website = body.website?.toString().trim() || null
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'Aucun champ à mettre à jour' },
        { status: 400 }
      )
    }

    const seller = await prisma.seller.update({
      where: { id: params.id },
      data
    })

    return NextResponse.json({ data: seller })
  } catch (error) {
    console.error('[sellers/:id.PATCH]', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Vendeur introuvable' }, { status: 404 })
      }
    }
    return NextResponse.json(
      { error: 'Impossible de mettre à jour le vendeur' },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, props: Props) {
  try {
    const params = await props.params
    await prisma.seller.delete({
      where: { id: params.id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[sellers/:id.DELETE]', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Vendeur introuvable' }, { status: 404 })
      }
      if (error.code === 'P2003') {
        return NextResponse.json(
          {
            error:
              'Impossible de supprimer le vendeur car il est lié à des véhicules'
          },
          { status: 400 }
        )
      }
    }
    return NextResponse.json(
      { error: 'Impossible de supprimer le vendeur' },
      { status: 500 }
    )
  }
}
