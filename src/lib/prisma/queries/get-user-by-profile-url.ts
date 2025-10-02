import { prisma } from '@/lib/prisma'

export async function getUserByProfileUrl(profileUrl: string) {
  const user = await prisma.user.findUnique({
    where: { profile_url: profileUrl },
  })

  if (!user) throw new Error(`User with profile url ${profileUrl} not found.`)

  return user
}

export type UserByProfileUrlResponse = Awaited<ReturnType<typeof getUserByProfileUrl>>
