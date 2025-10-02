import { unauthorized } from 'next/navigation'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { postNewReview } from '@/lib/prisma/queries/post-new-review'

const createReviewSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  reviewDescription: z
    .string()
    .min(1, 'Review must be at least 1 character')
    .max(450, 'Review must be less than 450 characters'),
  reviewRate: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
})

export async function POST(request: Request) {
  const loggedUser = (await auth())?.user

  if (!loggedUser) {
    return unauthorized()
  }

  const body = await request.json()

  const validationResult = createReviewSchema.safeParse(body)

  if (!validationResult.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: validationResult.error.errors,
      },
      { status: 400 },
    )
  }

  const { bookId, reviewDescription, reviewRate } = validationResult.data

  await postNewReview(loggedUser.id, bookId, reviewDescription, reviewRate)

  return NextResponse.json(
    {
      message: 'Review created successfully',
    },
    { status: 201 },
  )
}
