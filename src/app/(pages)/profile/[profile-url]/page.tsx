import {
  BookmarkSimpleIcon,
  BookOpenIcon,
  BooksIcon,
  CaretLeftIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UserListIcon,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Avatar } from '@/app/(components)/avatar'
import { BookInfo } from '@/app/(components)/book-info'
import { Rating } from '@/app/(components)/rating'
import { Timestamp } from '@/app/(components)/timestamp'
import { auth } from '@/lib/auth'
import dayjs from '@/lib/dayjs'
import { getBooksReviewedByUser, getUserByProfileUrl, getUserProfileStats } from './@ssr-queries'
import { Stats } from './(components)/stats'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ 'profile-url': string }>
}) {
  const loggedUser = (await auth())?.user

  const { 'profile-url': profileUrl } = await params

  const isOwner = loggedUser ? loggedUser.profile_url === profileUrl : false

  const user = await getUserByProfileUrl(profileUrl)

  if (!user) return notFound()

  const booksReviewed = await getBooksReviewedByUser(user.id)

  const stats = await getUserProfileStats(user.id)

  return (
    <>
      {isOwner ? (
        <header className="mb-10 flex items-center gap-3">
          <UserIcon size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-title-lg">Perfil</h1>
        </header>
      ) : (
        <div className="mb-10 flex cursor-pointer items-center gap-3 px-2 py-1 text-button-md text-gray-200">
          <CaretLeftIcon size={20} />
          <span>Voltar</span>
        </div>
      )}

      <main className="grid grid-cols-[1fr_auto] gap-16">
        {booksReviewed.length !== 0 ? (
          <section className="mb-5">
            <div className="mb-8 flex w-full items-center gap-2 rounded-sm border border-gray-500 px-5 py-3.5 text-gray-500 focus-within:border-green-200 focus-within:text-green-200">
              <input
                type="text"
                placeholder="Buscar livro avaliado"
                className="flex-1 border-0 bg-transparent p-0 text-body-sm text-gray-200 leading-0 outline-none placeholder:text-gray-400"
              />
              <MagnifyingGlassIcon size={20} className="text-inherit" />
            </div>

            <div className="flex flex-col gap-6">
              {booksReviewed.map((review) => {
                return (
                  <article key={review.book_id}>
                    <Timestamp date={review.created_at} className="text-gray-300" />

                    <div className="mt-2 rounded-lg bg-gray-700 p-6">
                      <div className="mb-6 flex gap-6">
                        <Image
                          src={review.book.cover_url}
                          alt={review.book.name}
                          height={134}
                          width={98}
                          quality={100}
                          priority
                          className="h-[134px] w-[98px]"
                        />

                        <div className="flex flex-col justify-between">
                          <BookInfo title={review.book.name} subtitle={review.book.author} />
                          <Rating rate={review.rate} />
                        </div>
                      </div>

                      <p className="text-body-sm text-gray-300">{review.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
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
        )}

        <aside className="flex h-fit flex-col items-center border-gray-700 border-l-2">
          <header className="text-center">
            <Avatar avatarUrl={user.avatar_url} name={user.name} size={72} />
            <h3 className="mt-5 text-gray-100 text-title-md">{user.name}</h3>
            <span className="text-body-sm text-gray-400">
              membro desde {dayjs(user.created_at).format('YYYY')}
            </span>
          </header>

          <div className="my-8 h-1 w-8 rounded-full bg-gradient-horizontal" />

          <section className="flex flex-col gap-10 px-14 py-5">
            <Stats icon={BookOpenIcon} value={String(stats.totalPages)} label="Páginas lidas" />
            <Stats
              icon={BooksIcon}
              value={String(stats.totalBooksRated)}
              label="Livros avaliados"
            />
            <Stats
              icon={UserListIcon}
              value={String(stats.totalAuthorsRead)}
              label="Autores lidos"
            />
            <Stats
              icon={BookmarkSimpleIcon}
              value={stats.mostReadCategory}
              label="Categoria mais lida"
            />
          </section>
        </aside>
      </main>
    </>
  )
}
