import Image from 'next/image'
import { BookInfo } from '@/app/(components)/book-info'
import { Rating } from '@/app/(components)/rating'
import type { PopularBookResponse } from '../@ssr-queries'

interface PopularBooksProps {
  popularBooks: PopularBookResponse[]
}

export function PopularBooks({ popularBooks }: PopularBooksProps) {
  return (
    <div className="flex flex-col gap-4">
      {popularBooks?.map((popularBook) => {
        return (
          <div
            key={popularBook.id}
            className="flex w-[324px] gap-5 rounded-lg bg-gray-700 px-5 py-4"
          >
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
