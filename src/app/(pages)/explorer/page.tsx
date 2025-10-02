import { BinocularsIcon } from '@phosphor-icons/react/dist/ssr'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Card } from '@/components/card'
import ExplorerSearch from '@/components/form/explorer-search'
import { auth } from '@/lib/auth'
import { getAllBooks, getAllCategoriesName } from '@/lib/prisma/queries'

interface ExplorarPageProps {
  searchParams: Promise<{ category?: string; modal?: string; id?: string; q?: string }>
}

export default async function Explorer({ searchParams }: ExplorarPageProps) {
  const loggedUser = (await auth())?.user

  const categories = await getAllCategoriesName()

  const selectedCategory = (await searchParams).category
  const modal = (await searchParams).modal
  const bookId = (await searchParams).id
  const q = (await searchParams).q?.toLocaleLowerCase().trim()

  if (modal === 'book' && bookId) {
    redirect(`/explorer/book/${bookId}`)
  }

  const allBooks = loggedUser ? await getAllBooks(loggedUser.id) : await getAllBooks()

  // const filteredBooks = selectedCategory
  //   ? allBooks.filter((book) =>
  //       book.categories.some((category) => category.toLowerCase() === selectedCategory),
  //     )
  //   : allBooks

  const filteredBooks = q
    ? allBooks.filter((b) => b.name.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    : allBooks

  return (
    <>
      <header className="mb-10 flex gap-96">
        <h1 className="flex items-start gap-3 text-gray-100 text-title-lg">
          <BinocularsIcon size={32} className="text-green-100" />
          Explorar
        </h1>

        <ExplorerSearch initialQuery="" />
      </header>

      <main>
        <RadioGroup.Root
          defaultValue="default"
          value={selectedCategory}
          className="mt-10 mb-12 flex items-center gap-3"
        >
          <RadioGroup.Item
            className="rounded-full border border-purple-100 px-4 py-1 transition hover:bg-purple-200 data-[state=checked]:border-purple-200 data-[state=checked]:bg-purple-200"
            value="default"
          >
            <Link href={`/explorer`}>Tudo</Link>
          </RadioGroup.Item>
          {categories.map((category) => {
            return (
              <RadioGroup.Item
                className="rounded-full border border-purple-100 px-4 py-1 transition hover:bg-purple-200 data-[state=checked]:border-purple-200 data-[state=checked]:bg-purple-200"
                value={category.name.toLowerCase()}
                key={category.name.toLowerCase()}
              >
                <Link href={`/explorer?category=${category.name.toLowerCase()}`}>
                  {category.name}
                </Link>
              </RadioGroup.Item>
            )
          })}
        </RadioGroup.Root>

        <section className="grid grid-cols-4 gap-5">
          {filteredBooks.map((book) => {
            const hasUserReviewed = !!book.userRating
            return (
              <Link href={`/explorer/book/${book.id}`} key={book.id}>
                <Card.Root className="group relative flex w-full gap-5 border-2 border-transparent p-5 transition hover:border-gray-600">
                  <Card.Cover src={book.cover_url} alt={book.name} heigth={154} width={108} />

                  <div className="flex flex-col justify-between">
                    <Card.BookInfo title={book.name} author={book.author} />
                    <Card.Rating rate={book.averageRating} />
                  </div>

                  {hasUserReviewed && (
                    <div
                      className={clsx(
                        '-top-0.5 -right-0.5 absolute rounded-tr-lg rounded-bl-lg border-2 border-transparent bg-green-300',
                        'group-hover:border-gray-600 group-hover:border-b-transparent group-hover:border-l-transparent',
                      )}
                    >
                      <span className="px-3 py-1 text-body-xs text-green-100">LIDO</span>
                    </div>
                  )}
                </Card.Root>
              </Link>
            )
          })}
        </section>
      </main>
    </>
  )
}
