import Link from 'next/link'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { Logo } from '@/assets/logo'
import { Nav } from '../(components)/nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-screen grid-cols-[minmax(12rem,15rem)_1fr] gap-24">
      <aside className="fixed mt-5 ml-5 flex h-[calc(100dvh-2.5rem)] flex-col items-center justify-between rounded-xl bg-gray-950 px-14 pt-10">
        <header>
          <Logo />
          <Nav />
        </header>

        <footer>
          <Link
            href="/"
            className="mb-7 flex cursor-pointer items-center justify-center gap-3 rounded-sm px-2 py-1 text-button-md text-gray-200 hover:bg-gray-200/4"
          >
            Fazer login <FaArrowRightToBracket size={20} className="text-green-100" />
          </Link>
        </footer>
      </aside>

      <main className="col-start-2 max-w-screen bg-gray-950">{children}</main>
    </div>
  )
}
