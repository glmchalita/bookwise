import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

async function getPopularBooks() {
  return prisma.rating.findMany({
    take: 4,
    orderBy: { rate: 'desc' },
    include: { book: true },
  })
}

export type PopularBookResponse = Awaited<ReturnType<typeof getPopularBooks>>[number]

export async function GET(_req: NextRequest) {
  const popularBooks = await getPopularBooks()

  return Response.json(popularBooks, {
    status: 200,
  })
}
