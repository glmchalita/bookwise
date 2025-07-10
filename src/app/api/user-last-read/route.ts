import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function getUserLastRead(id: string) {
  return prisma.rating.findFirst({
    where: { user_id: id },
    take: 1,
    orderBy: { created_at: 'desc' },
    include: { book: true },
  })
}

export type UserLastReadResponse = Awaited<ReturnType<typeof getUserLastRead>>

export async function GET(_req: NextRequest) {
  const session = await auth()

  if (!session) return

  const userLastRead = await getUserLastRead(session.user.id)

  return Response.json(userLastRead, {
    status: 200,
  })
}
