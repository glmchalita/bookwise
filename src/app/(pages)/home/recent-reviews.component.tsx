'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { BookInfo } from '@/app/(components)/book-title'
import { Rating } from '@/app/(components)/rating'
import type { RecentReviewResponse } from '@/app/api/recent-reviews/route'
import { api } from '@/lib/axios'

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

interface CardProps {
  recentReview: RecentReviewResponse
}

function Card({ recentReview }: CardProps) {
  return (
    <div className="rounded-lg bg-gray-700 p-6">
      <header className="mb-8 flex gap-4">
        <div className="h-fit w-fit rounded-full bg-gradient-vertical p-0.5">
          <Link href="">
            <Image
              src={recentReview.user.avatar_url || 'https://github.com/glmchalita.png'}
              height={36}
              width={36}
              quality={100}
              alt="Profile image"
              className="h-9 w-9 rounded-full object-cover"
            />
          </Link>
        </div>

        <div className="flex flex-col text-body-md text-gray-100">
          {recentReview.user.name}
          <span className="text-body-sm text-gray-400">Hoje</span>
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
        />

        <div className="flex flex-col gap-5">
          <BookInfo title={recentReview.book.name} subtitle={recentReview.book.author} />

          <p className="text-body-sm text-gray-300">{recentReview.book.summary}</p>
        </div>
      </main>
    </div>
  )
}
