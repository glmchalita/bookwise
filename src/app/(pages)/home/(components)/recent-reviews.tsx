import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '@/app/(components)/avatar'
import { BookInfo } from '@/app/(components)/book-info'
import { Rating } from '@/app/(components)/rating'
import { Timestamp } from '@/app/(components)/timestamp'
import type { RecentReviewResponse } from '../@ssr-queries'

interface RecentReviewsProps {
  recentReviews: RecentReviewResponse[]
}

export function RecentReviews({ recentReviews }: RecentReviewsProps) {
  return (
    <div className="flex flex-col gap-3">
      {recentReviews?.map((recentReview) => {
        return (
          <div className="rounded-lg bg-gray-700 p-6" key={recentReview.id}>
            <header className="mb-8 flex gap-4">
              <Link href={`/profile/${recentReview.user.profile_url}`}>
                <Avatar
                  avatarUrl={recentReview.user.avatar_url}
                  name={recentReview.user.name}
                  size={40}
                />
              </Link>
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
                <p className="line-clamp-4 text-body-sm text-gray-300">
                  {recentReview.description}
                </p>
              </div>
            </main>
          </div>
        )
      })}
    </div>
  )
}
