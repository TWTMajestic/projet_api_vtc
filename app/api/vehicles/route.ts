import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'edge'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json({ data: vehicles })
  } catch (error) {
    console.error('[vehicles.GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    if (!modelId) {
      return NextResponse.json(
        { error: '`modelId` is required' },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.create({
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

    return NextResponse.json({ data: vehicle }, { status: 201 })
  } catch (error) {
    console.error('[vehicles.POST]', error)
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
}

