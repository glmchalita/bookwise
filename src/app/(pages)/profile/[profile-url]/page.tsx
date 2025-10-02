import {
  BookmarkSimpleIcon,
  BookOpenIcon,
  BooksIcon,
  CaretLeftIcon,
  UserIcon,
  UserListIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Avatar, Input, Stats } from '@/components'
import { Card } from '@/components/card'
import { auth } from '@/lib/auth'
import dayjs from '@/lib/dayjs'
import {
  getReviewedBooksByUser,
  getUserByProfileUrl,
  getUserProfileStats,
} from '@/lib/prisma/queries'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ 'profile-url': string }>
}) {
  const loggedUser = (await auth())?.user

  const { 'profile-url': profileUrl } = await params

  const isProfileOwner = loggedUser ? loggedUser.profile_url === profileUrl : false

  const user = await getUserByProfileUrl(profileUrl)

  if (!user) return notFound()

  const booksReviewed = await getReviewedBooksByUser(user.id)

  const stats = await getUserProfileStats(user.id)

  return (
    <>
      {isProfileOwner ? (
        <header className="mb-10">
          <h1 className="flex items-center gap-3 text-gray-100 text-title-lg">
            <UserIcon size={32} className="text-green-100" />
            Perfil
          </h1>
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
            <Input placeholder="Buscar livro avaliado" />

            <div className="flex flex-col gap-6">
              {booksReviewed.map((review) => {
                return (
                  <div key={review.id}>
                    <Card.Timestamp date={review.created_at} variant="secondary" />
                    <Link href={`/explorer/book/${review.book.id}`} key={review.id}>
                      <Card.Root className="mt-2 p-6">
                        <div className="mb-6 flex gap-6">
                          <Card.Cover
                            src={review.book.cover_url}
                            alt={review.book.name}
                            heigth={134}
                            width={98}
                          />

                          <div className="flex flex-col justify-between">
                            <Card.BookInfo title={review.book.name} author={review.book.author} />{' '}
                            <Card.Rating rate={review.rate} />
                          </div>
                        </div>
                        <Card.Description>{review.description}</Card.Description>
                      </Card.Root>
                    </Link>
                  </div>
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
            <Avatar src={user.avatar_url} name={user.name} size={72} />
            <h3 className="mt-5 text-gray-100 text-title-md">{user.name}</h3>
            <span className="text-body-sm text-gray-400">
              membro desde {dayjs(user.created_at).format('YYYY')}
            </span>
          </header>

          <div className="my-8 h-1 w-8 rounded-full bg-gradient-horizontal" />

          <section className="flex flex-col gap-10 px-14 py-5">
            <Stats
              icon={BookOpenIcon}
              value={String(stats.totalPages)}
              label="Páginas lidas"
              variant="profile"
            />
            <Stats
              icon={BooksIcon}
              value={String(stats.totalBooksRated)}
              label="Livros avaliados"
              variant="profile"
            />
            <Stats
              icon={UserListIcon}
              value={String(stats.totalAuthorsRead)}
              label="Autores lidos"
              variant="profile"
            />
            <Stats
              icon={BookmarkSimpleIcon}
              value={stats.mostReadCategory}
              label="Categoria mais lida"
              variant="profile"
            />
          </section>
        </aside>
      </main>
    </>
  )
}
