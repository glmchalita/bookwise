import { prisma } from '@/lib/prisma'

export async function getAllBooks(user_id?: string) {
  const allBooks = await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      ratings: {
        select: {
          rate: true,
          user_id: true,
        },
      },
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
  })

  return allBooks.map((book) => {
    const ratings = book.ratings

    const totalRatings = book.ratings.length

    const averageRating = ratings.reduce((sum, r) => sum + r.rate, 0) / (totalRatings || 1)

    const userRating = user_id ? (ratings.find((r) => r.user_id === user_id)?.rate ?? null) : null

    const categoryNames = book.categories.map((c) => c.category.name)

    return {
      id: book.id,
      name: book.name,
      author: book.author,
      cover_url: book.cover_url,
      averageRating,
      userRating,
      categories: categoryNames,
    }
  })
}

export type AllBooksResponse = Awaited<ReturnType<typeof getAllBooks>>[number]
