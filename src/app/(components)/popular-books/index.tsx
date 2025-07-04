'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import type { PopularBookResponse } from '@/app/api/popular-books/route'
import { api } from '@/lib/axios'
import { BookInfo } from '../book-title'
import { Rating } from '../rating'

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
