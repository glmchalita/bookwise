import { prisma } from '@/lib/prisma'

export async function getBookById(id: string) {
  const book = await prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      total_pages: true,
      ratings: {
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          user: true,
          description: true,
          rate: true,
          created_at: true,
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

  if (!book) throw new Error(`Book not found`)

  const ratings = book.ratings

  const totalRatings = book.ratings.length

  const averageRating = ratings.reduce((sum, r) => sum + r.rate, 0) / (totalRatings || 1)

  const categoryNames = book.categories.map((c) => c.category.name)

  const categories = categoryNames.join(', ')

  return {
    id: book.id,
    name: book.name,
    author: book.author,
    cover_url: book.cover_url,
    total_pages: book.total_pages,
    average_rating: averageRating,
    total_rating: totalRatings,
    categories,
    ratings,
  }
}

export type BookByIdResponse = Awaited<ReturnType<typeof getBookById>>
