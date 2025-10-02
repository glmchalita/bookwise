import { prisma } from '@/lib/prisma'

export async function getRecentReviews() {
  return prisma.rating.findMany({
    orderBy: { created_at: 'desc' },
    include: { book: true, user: true },
  })
}

export type RecentReviewResponse = Awaited<ReturnType<typeof getRecentReviews>>[number]
