import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'edge'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        model: {
          select: {
            id: true,
            name: true,
            brand: true
          }
        },
        seller: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    return NextResponse.json({ data: vehicle })
  } catch (error) {
    console.error('[vehicle.GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle' },
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
    const {
      modelId,
      sellerId,
      vin,
      registration,
      mileageKm,
      priceEUR,
      color,
      notes
    } = payload ?? {}

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        modelId,
        sellerId: sellerId ?? null,
        vin: vin ?? null,
        registration: registration ?? null,
        mileageKm: mileageKm ?? null,
        priceEUR: priceEUR ?? null,
        color: color ?? null,
        notes: notes ?? null
      },
      include: {
        model: {
          select: {
            id: true,
            name: true,
            brand: true
          }
        },
        seller: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({ data: vehicle })
  } catch (error) {
    console.error('[vehicle.PUT]', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to update vehicle' },
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
    await prisma.vehicle.delete({
      where: { id }
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('[vehicle.DELETE]', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    )
  }
}

