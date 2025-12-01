import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'nodejs'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_: Request, props: Props) {
  try {
    const params = await props.params
    // Decode the brand name from the URL (e.g. "Mercedes-Benz" -> "Mercedes-Benz")
    const brandName = decodeURIComponent(params.id)

    // Check if any model exists with this brand
    const model = await prisma.model.findFirst({
      where: {
        brand: {
          equals: brandName,
          mode: 'insensitive' // Case-insensitive search
        }
      },
      select: {
        brand: true
      }
    })

    if (!model) {
      return NextResponse.json({ error: 'Marque introuvable' }, { status: 404 })
    }

    return NextResponse.json({
      data: {
        id: model.brand,
        name: model.brand
      }
    })
  } catch (error) {
    console.error('[brands/:id.GET]', error)
    return NextResponse.json(
      { error: 'Impossible de récupérer la marque' },
      { status: 500 }
    )
  }
}

export async function PATCH(_: Request, props: Props) {
  const params = await props.params
  return NextResponse.json(
    {
      error: `Not Implemented. Cannot update brand '${params.id}' directly.`
    },
    { status: 501 }
  )
}

export async function DELETE(_: Request, props: Props) {
  const params = await props.params
  return NextResponse.json(
    {
      error: `Not Implemented. Cannot delete brand '${params.id}' directly.`
    },
    { status: 501 }
  )
}
