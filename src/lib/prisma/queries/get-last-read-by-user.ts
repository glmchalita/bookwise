import { prisma } from '@/lib/prisma'

export async function getLastReadByUser(user_id: string) {
  return prisma.rating.findFirst({
    where: { user_id },
    take: 1,
    orderBy: { created_at: 'desc' },
    include: { book: true },
  })
}

export type LastReadByUserResponse = Awaited<ReturnType<typeof getLastReadByUser>>
