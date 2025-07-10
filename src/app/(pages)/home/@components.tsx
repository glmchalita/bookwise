'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Avatar } from '@/app/(components)/avatar'
import { BookInfo } from '@/app/(components)/book-title'
import { Rating } from '@/app/(components)/rating'
import type { PopularBookResponse } from '@/app/api/popular-books/route'
import type { RecentReviewResponse } from '@/app/api/recent-reviews/route'
import { api } from '@/lib/axios'
import dayjs from '@/lib/dayjs'

function Card({ recentReview }: { recentReview: RecentReviewResponse }) {
  return (
    <div className="rounded-lg bg-gray-700 p-6">
      <header className="mb-8 flex gap-4">
        <Avatar avatarUrl={recentReview.user.avatar_url} name={recentReview.user.name} size={40} />

        <div className="flex flex-col ">
          <span className="text-body-md text-gray-100">{recentReview.user.name}</span>
          <span className="cap text-body-sm text-gray-400 capitalize">
            {dayjs(recentReview.created_at).fromNow()}
          </span>
        </div>

        <Rating rate={recentReview.rate} className="ml-auto" />
      </header>

      <main className="flex gap-5">
        <Image
          src={recentReview.book.cover_url}
          alt={recentReview.book.name}
          height={152}
          width={108}
          quality={100}
          priority
          className="h-auto w-auto"
        />

        <div className="flex flex-col gap-5">
          <BookInfo title={recentReview.book.name} subtitle={recentReview.book.author} />

          <p className="text-body-sm text-gray-300">{recentReview.book.summary}</p>
        </div>
      </main>
    </div>
  )
}

export function RecentReviews() {
  const { data: recentReviews } = useQuery<RecentReviewResponse[]>({
    queryKey: ['recent-reviews'],
    queryFn: async () => {
      const res = await api.get(`/recent-reviews`)

      return res.data
    },
  })

  return (
    <div className="flex flex-col gap-3 pt-4 pb-5">
      {recentReviews?.map((recentReview) => {
        return <Card key={recentReview.id} recentReview={recentReview} />
      })}
    </div>
  )
}

export function PopularBooks() {
  const { data: popularBooks } = useQuery<PopularBookResponse[]>({
    queryKey: ['popular-books'],
    queryFn: async () => {
      const res = await api.get(`/popular-books`)

      return res.data
    },
  })

  return (
    <div className="flex flex-col gap-4">
      {popularBooks?.map((popularBook) => {
        return (
          <div key={popularBook.id} className="flex gap-5 rounded-lg bg-gray-700 px-5 py-4">
            <Image
              src={popularBook.book.cover_url}
              alt={popularBook.book.name}
              width={64}
              height={94}
              className="h-auto w-auto"
            />

            <div className="flex flex-col justify-between">
              <BookInfo title={popularBook.book.name} subtitle={popularBook.book.author} />

              <Rating rate={popularBook.rate} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
