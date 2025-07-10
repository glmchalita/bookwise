import { ChartLineUpIcon } from '@/app/(components)/icons'
import { auth } from '@/lib/auth'
import { PopularBooks, RecentReviews, SectionTitle, UserLastRead } from './@components'

export default async function Home() {
  const session = await auth()
  const userLogged = session?.user

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
              <UserLastRead />
            </div>
          )}
          <div className="pb-5">
            <SectionTitle title="Avaliações mais recentes" />
            <RecentReviews />
          </div>
        </div>

        <aside className="mr-24">
          <SectionTitle title="Livros populares" viewAllButton />
          <PopularBooks />
        </aside>
      </main>
    </>
  )
}
