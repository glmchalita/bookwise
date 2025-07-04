import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

async function getRecentReviews() {
  return prisma.rating.findMany({
    orderBy: { created_at: 'desc' },
    include: { book: true, user: true },
  })
}

export type RecentReviewResponse = Awaited<ReturnType<typeof getRecentReviews>>[number]

export async function GET(_req: NextRequest) {
  const recentReviews = await getRecentReviews()

  return Response.json(recentReviews, {
    status: 200,
  })
}
