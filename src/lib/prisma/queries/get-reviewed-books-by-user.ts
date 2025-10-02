import { prisma } from '@/lib/prisma'

export async function getReviewedBooksByUser(user_id: string) {
  return prisma.rating.findMany({
    where: { user_id },
    orderBy: { created_at: 'desc' },
    include: { book: true },
  })
}

export type ReviewedBooksByUser = Awaited<ReturnType<typeof getReviewedBooksByUser>>[number]
