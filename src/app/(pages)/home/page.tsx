import { CaretRightIcon, ChartLineUpIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { SectionTitle } from '@/components'
import { Card } from '@/components/card'
import { auth } from '@/lib/auth'
import { getLastReadByUser, getPopularBooks, getRecentReviews } from '@/lib/prisma/queries'

export default async function Home() {
  const loggedUser = (await auth())?.user

  const userLastRead = loggedUser ? await getLastReadByUser(loggedUser.id) : null

  const [recentReviews, popularBooks] = await Promise.all([getRecentReviews(), getPopularBooks()])

  return (
    <>
      <header className="mb-10">
        <h1 className="flex items-center gap-3 text-gray-100 text-title-lg">
          <ChartLineUpIcon size={32} className="text-green-100" />
          Início
        </h1>
      </header>

      <main className="flex gap-16">
        <div className="flex-1">
          {userLastRead && (
            <div className="pb-10">
              <SectionTitle
                title="Sua última leitura"
                actionTitle="Ver todos"
                actionIcon={CaretRightIcon}
                actionLink={`profile/${loggedUser?.profile_url}`}
              />

              <Link href={`/explorer/book/${userLastRead.book.id}`}>
                <Card.Root
                  className="flex cursor-pointer items-start gap-6 border-2 border-transparent px-6 py-5 transition hover:border-gray-500"
                  variant="secondary"
                >
                  <Card.Cover
                    src={userLastRead.book.cover_url}
                    alt={userLastRead.book.name}
                    heigth={152}
                    width={108}
                  />

                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <Card.Timestamp date={userLastRead.created_at} variant="secondary" />
                      <Card.Rating rate={userLastRead.rate} />
                    </div>

                    <Card.BookInfo
                      title={userLastRead.book.name}
                      author={userLastRead.book.author}
                      className="mb-6"
                    />

                    <Card.Description>{userLastRead.description}</Card.Description>
                  </div>
                </Card.Root>
              </Link>
            </div>
          )}

          <div>
            <SectionTitle title="Avaliações mais recentes" actionLink="explorer" />
            <div className="space-y-3">
              {recentReviews?.map((recentReview) => {
                return (
                  <Card.Root className="p-6" key={recentReview.id}>
                    <header className="mb-8 flex gap-4">
                      <Card.Avatar
                        src={recentReview.user.avatar_url}
                        name={recentReview.user.name}
                        size={40}
                        profileUrl={recentReview.user.profile_url}
                      />

                      <Card.UserInfo
                        name={recentReview.user.name}
                        timestamp={recentReview.created_at}
                      />

                      <Card.Rating rate={recentReview.rate} containerClassName="ml-auto" />
                    </header>
                    <Link href={`/explorer/book/${recentReview.book.id}`}>
                      <div className="flex gap-5">
                        <Card.Cover
                          src={recentReview.book.cover_url}
                          alt={recentReview.book.name}
                          heigth={152}
                          width={108}
                        />

                        <div className="space-y-5">
                          <Card.BookInfo
                            title={recentReview.book.name}
                            author={recentReview.book.author}
                          />

                          <Card.Description className="line-clamp-4">
                            {recentReview.description}
                          </Card.Description>
                        </div>
                      </div>
                    </Link>
                  </Card.Root>
                )
              })}
            </div>
          </div>
        </div>

        <aside>
          <SectionTitle
            title="Livros populares"
            actionTitle="Ver todos"
            actionIcon={CaretRightIcon}
            actionLink="explorer"
          />
          <div className="flex flex-col gap-4">
            {popularBooks?.map((book) => {
              return (
                <Link href={`/explorer/book/${book.id}`} key={book.id}>
                  <Card.Root className="flex w-[324px] gap-5 border-2 border-transparent px-5 py-4 transition hover:border-gray-600">
                    <Card.Cover src={book.cover_url} alt={book.name} heigth={94} width={64} />

                    <div className="flex flex-col justify-between">
                      <Card.BookInfo title={book.name} author={book.author} />
                      <Card.Rating rate={book.average_rating} />
                    </div>
                  </Card.Root>
                </Link>
              )
            })}
          </div>
        </aside>
      </main>
    </>
  )
}
