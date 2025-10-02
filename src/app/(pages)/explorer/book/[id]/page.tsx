import { BookmarkSimpleIcon, BookOpenIcon } from '@phosphor-icons/react/dist/ssr'
import { Stats } from '@/components'
import { Card } from '@/components/card'
import { BookReviewsWrapper } from '@/components/wrappers/book-reviews-wrapper'
import { auth } from '@/lib/auth'
import { getBookById } from '@/lib/prisma/queries'

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()

  const { id } = await params

  const book = await getBookById(id)

  return (
    <>
      <Card.Root className="px-8 pt-6 pb-4">
        <div className="flex gap-8 pb-10">
          <Card.Cover src={book.cover_url} alt={book.name} heigth={242} width={172} />

          <div className="flex flex-col justify-between">
            <Card.BookInfo title={book.name} author={book.author} />

            <div>
              <Card.Rating rate={book.average_rating} />
              <span className="text-body-sm text-gray-400">{book.total_rating} avaliações</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-14 border-gray-600 border-t py-6">
          <Stats
            icon={BookmarkSimpleIcon}
            label="Categoria"
            value={book.categories}
            variant="modal"
          />
          <Stats
            icon={BookOpenIcon}
            label="Páginas"
            value={String(book.total_pages)}
            variant="modal"
          />
        </div>
      </Card.Root>

      <BookReviewsWrapper book={book} session={session} />
    </>
  )
}
