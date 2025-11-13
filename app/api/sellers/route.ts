import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'edge'

export async function GET() {
  try {
    const sellers = await prisma.seller.findMany({
      orderBy: { name: 'asc' },
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

    return NextResponse.json({ data: sellers })
  } catch (error) {
    console.error('[sellers.GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch sellers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const { name, email, phone, website } = payload ?? {}

    if (!name) {
      return NextResponse.json(
        { error: '`name` is required' },
        { status: 400 }
      )
    }

    const seller = await prisma.seller.create({
      data: {
        name,
        email: email ?? null,
        phone: phone ?? null,
        website: website ?? null
      }
    })

    return NextResponse.json({ data: seller }, { status: 201 })
  } catch (error) {
    console.error('[sellers.POST]', error)
    return NextResponse.json(
      { error: 'Failed to create seller' },
      { status: 500 }
    )
  }
}

