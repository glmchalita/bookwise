import { prisma } from '@/lib/prisma'

export async function getPopularBooks() {
  const popularBooksRaw = await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })

  const booksWithAverage = popularBooksRaw.map((book) => {
    const ratings = book.ratings

    const totalRatings = book.ratings.length

    const averageRating = ratings.reduce((sum, r) => sum + r.rate, 0) / (totalRatings || 1)

    return {
      id: book.id,
      name: book.name,
      author: book.author,
      cover_url: book.cover_url,
      average_rating: averageRating,
    }
  })

  booksWithAverage.sort((a, b) => b.average_rating - a.average_rating)

  return booksWithAverage.slice(0, 4)
}

export type PopularBookResponse = Awaited<ReturnType<typeof getPopularBooks>>[number]
