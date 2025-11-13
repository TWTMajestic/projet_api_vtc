import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'edge'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const seller = await prisma.seller.findUnique({
      where: { id },
      include: {
        vehicles: {
          select: {
            id: true,
            modelId: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    })

    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 })
    }

    return NextResponse.json({ data: seller })
  } catch (error) {
    console.error('[seller.GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch seller' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const payload = await request.json()
    const { name, email, phone, website } = payload ?? {}

    const seller = await prisma.seller.update({
      where: { id },
      data: {
        name,
        email: email ?? null,
        phone: phone ?? null,
        website: website ?? null
      }
    })

    return NextResponse.json({ data: seller })
  } catch (error) {
    console.error('[seller.PUT]', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to update seller' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await prisma.seller.delete({
      where: { id }
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('[seller.DELETE]', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to delete seller' },
      { status: 500 }
    )
  }
}

