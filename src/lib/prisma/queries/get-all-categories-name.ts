import { prisma } from '@/lib/prisma'

export async function getAllCategoriesName() {
  return await prisma.category.findMany({
    select: {
      name: true,
    },
  })
}

export type AllCategoriesNameResponse = Awaited<ReturnType<typeof getAllCategoriesName>>[number]
