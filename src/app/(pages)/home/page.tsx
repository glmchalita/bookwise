import { ChartLineUpIcon } from '@phosphor-icons/react/dist/ssr'
import { auth } from '@/lib/auth'
import { getPopularBooks, getRecentReviews, getUserLastRead } from './@ssr-queries'
import { PopularBooks } from './(components)/popular-books'
import { RecentReviews } from './(components)/recent-reviews'
import { SectionTitle } from './(components)/section-title'
import { UserLastRead } from './(components)/user-last-read'

export default async function Home() {
  const userLogged = (await auth())?.user

  if (!userLogged) return null

  const userLastRead = await getUserLastRead(userLogged.id)

  const [recentReviews, popularBooks] = await Promise.all([getRecentReviews(), getPopularBooks()])

  return (
    <>
      <header className="mb-10 flex items-center gap-3">
        <ChartLineUpIcon size={32} className="text-green-100" />
        <h1 className="text-gray-100 text-title-lg">Início</h1>
      </header>

      <main className="grid grid-cols-[2fr_1fr] gap-16">
        <div>
          {userLogged && (
            <div className="pb-10">
              <SectionTitle title="Sua última leitura" viewAllButton />
              <UserLastRead userLastRead={userLastRead} />
            </div>
          )}

          <div className="pb-5">
            <SectionTitle title="Avaliações mais recentes" />
            <RecentReviews recentReviews={recentReviews} />
          </div>
        </div>

        <aside className="mr-24">
          <SectionTitle title="Livros populares" viewAllButton />
          <PopularBooks popularBooks={popularBooks} />
        </aside>
      </main>
    </>
  )
}
