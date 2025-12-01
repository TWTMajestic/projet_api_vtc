import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'ok',
      message: 'API is running and database is connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[status.GET]', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'API is running but database connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}


