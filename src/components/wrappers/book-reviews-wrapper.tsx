'use client'

import { Field, Textarea } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import type { Session } from 'next-auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import type { BookByIdResponse } from '@/lib/prisma/queries/get-book-by-id'
import { Card } from '../card'
import { LoginForm } from '../form/login-form'
import { RatingInput } from '../form/rating-input'

const createNewReviewFormSchema = z.object({
  reviewDescription: z.string().min(1, 'Required').max(450, 'Max 450 chars'),
})

type CreateNewReviewFormSchema = z.infer<typeof createNewReviewFormSchema>

interface BookReviewsWrapperProps {
  book: BookByIdResponse
  session: Session | null
}

export function BookReviewsWrapper({ book, session }: BookReviewsWrapperProps) {
  const loggedUser = session?.user

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [rateNumber, setRateNumber] = useState(0)
  const [isRateInvalid, setIsRateInvalid] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateNewReviewFormSchema>({
    resolver: zodResolver(createNewReviewFormSchema),
  })

  const reviewCharacterCounting = watch('reviewDescription')?.length || 0

  const userReview = book.ratings.find((review) => review.user.id === loggedUser?.id)
  const otherReviews = book.ratings.filter((review) => review.user.id !== loggedUser?.id)
  const userHasReviewed = !!userReview

  function toggleReviewForm() {
    if (!loggedUser) {
      setIsLoginModalOpen(true)
      return
    }

    setIsReviewFormOpen(!isReviewFormOpen)
  }

  function handleLoginSuccess() {
    setIsLoginModalOpen(false)

    setIsReviewFormOpen(true)
  }

  function handleRateChange(rate: number) {
    setRateNumber(rate)
  }

  async function handleCreateNewReview(data: CreateNewReviewFormSchema) {
    if (rateNumber < 1) {
      setIsRateInvalid(true)
      setTimeout(() => setIsRateInvalid(false), 400) // reset after animation
      return
    }

    try {
      const res = await fetch(`/api/book/${book.id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: book.id,
          reviewDescription: data.reviewDescription,
          reviewRate: rateNumber,
        }),
      })

      if (!res.ok) {
        console.error('Failed to create review', await res.text())
      }

      setIsReviewFormOpen(false)
      setRateNumber(0)
      reset()
    } catch (error) {
      console.log(error)
    }

    setIsReviewFormOpen(false)
  }

  return (
    <>
      <div className="pt-10">
        <header className="flex items-center justify-between pb-4">
          <h3 className="text-body-sm text-gray-100">Avaliações</h3>
          {!userHasReviewed && (
            <button
              type="button"
              className="top-0 left-0 ml-auto cursor-pointer rounded-sm px-2 py-1 text-button-md text-purple-100 transition hover:bg-purple-100/8"
              onClick={toggleReviewForm}
            >
              Avaliar
            </button>
          )}
        </header>

        {isReviewFormOpen && loggedUser && (
          <Card.Root className="mb-3 p-6">
            <header className="mb-6 flex items-center gap-4">
              <Card.Avatar
                src={loggedUser.avatar_url}
                name={loggedUser.name}
                size={40}
                variant="display"
              />
              <div className="flex flex-1 items-center justify-between">
                <h3>{loggedUser.name}</h3>
                <RatingInput
                  onRateChange={handleRateChange}
                  size={28}
                  className={isRateInvalid ? 'shake' : ''}
                />
              </div>
            </header>

            <div>
              <form onSubmit={handleSubmit(handleCreateNewReview)}>
                <Field className="relative mb-3">
                  <Textarea
                    autoFocus
                    placeholder="Escreva sua avaliação"
                    className="block w-full resize-none rounded-lg border-none bg-gray-800 px-5 py-3.5 text-body-sm outline-none focus:ring-0"
                    rows={7}
                    maxLength={450}
                    {...register('reviewDescription')}
                  />
                  <span className="absolute right-2 bottom-1 text-body-xs text-gray-400">{`${reviewCharacterCounting}/450`}</span>
                </Field>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-sm bg-gray-600 p-2 text-purple-100 hover:bg-gray-500"
                    onClick={toggleReviewForm}
                    aria-label="Cancelar avaliação"
                  >
                    <XIcon size={24} />
                  </button>
                  <button
                    type="submit"
                    className="rounded-sm bg-gray-600 p-2 text-green-100 hover:bg-gray-500"
                    disabled={isSubmitting}
                    aria-label="Enviar avaliação"
                  >
                    <CheckIcon size={24} />
                  </button>
                </div>
              </form>
            </div>
          </Card.Root>
        )}

        <div className="space-y-3">
          {userReview && (
            <Card.Root className="p-6" key={userReview.id} variant="secondary">
              <header className="mb-5 flex gap-4">
                <Card.Avatar
                  src={userReview.user.avatar_url}
                  name={userReview.user.name}
                  size={40}
                  profileUrl={userReview.user.profile_url}
                />

                <div className="flex flex-1 items-center justify-between">
                  <Card.UserInfo
                    name={userReview.user.name}
                    timestamp={userReview.created_at}
                    variant="secondary"
                  />
                  <Card.Rating rate={userReview.rate} />
                </div>
              </header>

              <Card.Description>{userReview.description}</Card.Description>
            </Card.Root>
          )}

          {otherReviews.map((review) => {
            return (
              <Card.Root className="p-6" key={review.id}>
                <header className="mb-5 flex gap-4">
                  <Card.Avatar
                    src={review.user.avatar_url}
                    name={review.user.name}
                    size={40}
                    profileUrl={review.user.profile_url}
                  />

                  <div className="flex flex-1 items-center justify-between">
                    <Card.UserInfo
                      name={review.user.name}
                      timestamp={review.created_at}
                      variant="secondary"
                    />
                    <Card.Rating rate={review.rate} />
                  </div>
                </header>

                <Card.Description>{review.description}</Card.Description>
              </Card.Root>
            )
          })}
        </div>
      </div>

      <Dialog.Root open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-800/75" />
          <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 rounded-xl bg-gray-700 px-[72px] py-14">
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute top-4 right-4 rounded-sm text-gray-400 hover:bg-gray-500 hover:text-purple-100"
                aria-label="Close"
              >
                <XIcon size={24} />
              </button>
            </Dialog.Close>

            <Dialog.Title className="mb-10 text-gray-200 text-title-xs">
              Faça login para deixar sua avaliação
            </Dialog.Title>

            <LoginForm withGuestOption={false} onSuccess={handleLoginSuccess} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
