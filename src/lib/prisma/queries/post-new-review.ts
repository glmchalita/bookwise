import { prisma } from '@/lib/prisma'

export async function postNewReview(
  userId: string,
  bookId: string,
  reviewDescription: string,
  reviewRate: number,
) {
  await prisma.rating.create({
    data: {
      user_id: userId,
      book_id: bookId,
      description: reviewDescription,
      rate: reviewRate,
    },
  })
}
