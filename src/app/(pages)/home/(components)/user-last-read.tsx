import { BookOpenIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { BookInfo } from '@/app/(components)/book-info'
import { Rating } from '@/app/(components)/rating'
import { Timestamp } from '@/app/(components)/timestamp'
import type { UserLastReadResponse } from '../@ssr-queries'

interface UserLastReadProps {
  userLastRead: UserLastReadResponse
}

export function UserLastRead({ userLastRead }: UserLastReadProps) {
  return userLastRead ? (
    <div className="flex cursor-pointer items-start gap-6 rounded-lg border-2 border-transparent bg-gray-600 px-6 py-5 transition hover:border-gray-500">
      <Image
        src={userLastRead.book.cover_url}
        alt={userLastRead.book.name}
        height={152}
        width={108}
        quality={100}
        priority
        className="h-[152px] w-[108px]"
      />

      <div className="w-full">
        <div className="flex items-center justify-between pb-3">
          <Timestamp date={userLastRead.created_at} className="text-gray-300" />
          <Rating rate={userLastRead.rate} />
        </div>

        <BookInfo title={userLastRead.book.name} subtitle={userLastRead.book.author} />

        <p className="line-clamp-2 text-ellipsis pt-6 text-body-sm text-gray-300">
          {userLastRead.description}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-between rounded-lg bg-gray-600 px-6 py-5 text-body-sm">
      <div>
        <p>Você ainda não avaliou nenhum livro.</p>
        <p>Que tal começar agora?</p>
        <p>Explore livros e escreva sua primeira avaliação!</p>
      </div>
      <Link href="/explorer" className="transition hover:text-gray-400">
        <BookOpenIcon size={64} />
      </Link>
    </div>
  )
}
