'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '@/app/(components)/avatar'
import { BookInfo } from '@/app/(components)/book-info'
import { CaretRightIcon } from '@/app/(components)/icons'
import { Rating } from '@/app/(components)/rating'
import { Timestamp } from '@/app/(components)/timestamp'
import type { PopularBookResponse } from '@/app/api/popular-books/route'
import type { RecentReviewResponse } from '@/app/api/recent-reviews/route'
import type { UserLastReadResponse } from '@/app/api/user-last-read/route'
import { api } from '@/lib/axios'

function RecentReviewCard({ recentReview }: { recentReview: RecentReviewResponse }) {
  return (
    <div className="rounded-lg bg-gray-700 p-6">
      <header className="mb-8 flex gap-4">
        <Avatar avatarUrl={recentReview.user.avatar_url} name={recentReview.user.name} size={40} />

        <div className="flex flex-col ">
          <span className="text-body-md text-gray-100">{recentReview.user.name}</span>
          <Timestamp date={recentReview.created_at} className="text-gray-400" />
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
          className="h-[152px] w-[108px]"
        />

        <div className="flex flex-col gap-5">
          <BookInfo title={recentReview.book.name} subtitle={recentReview.book.author} />
          <p className="line-clamp-4 text-body-sm text-gray-300">{recentReview.description}</p>
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
    <div className="flex flex-col gap-3">
      {recentReviews?.map((recentReview) => {
        return <RecentReviewCard key={recentReview.id} recentReview={recentReview} />
      })}
    </div>
  )
}

export function UserLastRead() {
  const { data: lastRead } = useQuery<UserLastReadResponse>({
    queryKey: [''],
    queryFn: async () => {
      const res = await api.get(`/user-last-read`)
      return res.data
    },
  })

  return lastRead ? (
    <div className="flex cursor-pointer items-start gap-6 rounded-lg border-2 border-transparent bg-gray-600 px-6 py-5 transition hover:border-gray-500">
      <Image
        src={lastRead.book.cover_url}
        alt={lastRead.book.name}
        height={152}
        width={108}
        quality={100}
        priority
        className="h-[152px] w-[108px]"
      />

      <div className="w-full">
        <div className="flex items-center justify-between pb-3">
          <Timestamp date={lastRead.created_at} className="text-gray-300" />
          <Rating rate={lastRead.rate} />
        </div>

        <BookInfo title={lastRead.book.name} subtitle={lastRead.book.author} />

        <p className="line-clamp-2 text-ellipsis pt-6 text-body-sm text-gray-300">
          {lastRead.description}
        </p>
      </div>
    </div>
  ) : (
    <div>Ainda não avaliou nenhum livro</div>
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
              height={94}
              width={64}
              className="h-[94px] w-[64px]"
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

export function SectionTitle({
  title,
  viewAllButton = false,
}: {
  title: string
  viewAllButton?: boolean
}) {
  return (
    <div className="flex items-center justify-between pb-4">
      <h3 className="text-body-sm text-gray-100">{title}</h3>
      {viewAllButton && (
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-sm px-2 py-1 text-button-sm text-purple-100 transition hover:bg-purple-100/8"
        >
          Ver todos <CaretRightIcon />
        </Link>
      )}
    </div>
  )
}
