import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    // Fetch all distinct brands from the Model table
    const models = await prisma.model.findMany({
      select: {
        brand: true
      },
      distinct: ['brand'],
      orderBy: {
        brand: 'asc'
      }
    })

    const brands = models.map((model) => ({
      id: model.brand, // Using brand name as ID since we don't have a Brand entity
      name: model.brand
    }))

    return NextResponse.json({
      data: brands
    })
  } catch (error) {
    console.error('[brands.GET]', error)
    return NextResponse.json(
      { error: 'Impossible de récupérer les marques' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    {
      error: 'Not Implemented. To create a brand, create a vehicle with a new model.'
    },
    { status: 501 }
  )
}
