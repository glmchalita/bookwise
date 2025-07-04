import Link from 'next/link'
import { CaretRightIcon, ChartLineUpIcon } from '@/app/(components)/icons'
import { PopularBooks } from '@/app/(components)/popular-books'
import { RecentReviews } from '@/app/(components)/recent-reviews'

export default function Home() {
  return (
    <>
      <div className="mb-10 flex items-center gap-3">
        <ChartLineUpIcon size={32} className="text-green-100" />
        <h1 className="text-gray-100 text-title-lg">Início</h1>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-16">
        <div>
          <span className="text-body-sm text-gray-100">Avaliações mais recentes</span>

          <RecentReviews />
        </div>

        <div className="mr-24">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-body-sm text-gray-100">Livros populares</span>
            <Link
              href="/explorer"
              className="flex items-center gap-2 rounded-sm px-2 py-1 text-button-sm text-purple-100 hover:bg-purple-100/8"
            >
              Ver todos <CaretRightIcon />
            </Link>
          </div>

          <PopularBooks />
        </div>
      </div>
    </>
  )
}
