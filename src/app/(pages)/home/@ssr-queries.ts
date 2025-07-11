import { prisma } from '@/lib/prisma'

export async function getRecentReviews() {
  return prisma.rating.findMany({
    orderBy: { created_at: 'desc' },
    include: { book: true, user: true },
  })
}

export type RecentReviewResponse = Awaited<ReturnType<typeof getRecentReviews>>[number]

export async function getUserLastRead(id: string) {
  return prisma.rating.findFirst({
    where: { user_id: id },
    take: 1,
    orderBy: { created_at: 'desc' },
    include: { book: true },
  })
}

export type UserLastReadResponse = Awaited<ReturnType<typeof getUserLastRead>>

export async function getPopularBooks() {
  return prisma.rating.findMany({
    take: 4,
    orderBy: { rate: 'desc' },
    include: { book: true },
  })
}

export type PopularBookResponse = Awaited<ReturnType<typeof getPopularBooks>>[number]
