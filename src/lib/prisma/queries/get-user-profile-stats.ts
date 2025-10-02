import { prisma } from '@/lib/prisma'

export async function getUserProfileStats(user_id: string) {
  const stats = await prisma.rating.findMany({
    where: { user_id },
    select: {
      book: {
        select: {
          total_pages: true,
          author: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const totalPages = stats.reduce((sum, stat) => sum + stat.book.total_pages, 0)

  const totalAuthorsRead = new Set(stats.map((s) => s.book.author).filter(Boolean)).size

  const totalBooksRated = stats.length

  const allCategoryNames = stats.flatMap((stat) =>
    stat.book.categories.map((rel) => rel.category.name),
  )

  const categoryCount = allCategoryNames.reduce<Record<string, number>>((acc, name) => {
    acc[name] = (acc[name] ?? 0) + 1
    return acc
  }, {})

  const mostReadCategory =
    Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'Outro'

  return {
    totalPages,
    totalAuthorsRead,
    totalBooksRated,
    mostReadCategory,
  }
}

export type UserProfileStatsResponse = Awaited<ReturnType<typeof getUserProfileStats>>
