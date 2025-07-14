import { ChartLineUpIcon } from '@phosphor-icons/react/dist/ssr'
import { auth } from '@/lib/auth'
import { getPopularBooks, getRecentReviews, getUserLastRead } from './@ssr-queries'
import { PopularBooks } from './(components)/popular-books'
import { RecentReviews } from './(components)/recent-reviews'
import { SectionTitle } from './(components)/section-title'
import { UserLastRead } from './(components)/user-last-read'

export default async function Home() {
  const loggedUser = (await auth())?.user

  const userLastRead = loggedUser ? await getUserLastRead(loggedUser.id) : null

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
        <div>
          {loggedUser && (
            <div className="pb-10">
              <SectionTitle title="Sua última leitura" viewAllButton />
              <UserLastRead userLastRead={userLastRead} />
            </div>
          )}

          <div>
            <SectionTitle title="Avaliações mais recentes" />
            <RecentReviews recentReviews={recentReviews} />
          </div>
        </div>

        <aside>
          <SectionTitle title="Livros populares" viewAllButton />
          <PopularBooks popularBooks={popularBooks} />
        </aside>
      </main>
    </>
  )
}
