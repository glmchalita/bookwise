import { SignInIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Avatar, BookWiseIcon } from '@/components'
import { FooterLogoutButton } from '@/components/layout/footer-logout-button'
import { Navbar } from '@/components/layout/navbar'
import { auth } from '@/lib/auth'

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedUser = (await auth())?.user

  return (
    <>
      <aside className="fixed top-5 left-5 flex h-[calc(100dvh-2.5rem)] w-[15rem] flex-col items-center justify-between rounded-xl bg-[url('/images/background-sidebar.png')] bg-cover pt-10 pb-6">
        <header>
          <Link href={'/home'}>
            <BookWiseIcon />
          </Link>
          <Navbar profileUrl={loggedUser?.profile_url} />
        </header>

        <footer>
          {loggedUser ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/profile/${loggedUser.profile_url}`}
                className="flex cursor-pointer items-center justify-center gap-3"
              >
                <Avatar src={loggedUser.avatar_url} name={loggedUser.name} size={32} />
                <span>{loggedUser.name.split(' ')[0]}</span>
              </Link>

              <FooterLogoutButton />
            </div>
          ) : (
            <Link
              href="/"
              className="flex cursor-pointer items-center justify-center gap-3 rounded-sm px-2 py-1 text-button-md text-gray-200 hover:bg-gray-200/4"
            >
              Fazer login <SignInIcon size={20} className="text-green-100" />
            </Link>
          )}
        </footer>
      </aside>

      <div className="scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-700 grid max-h-screen grid-cols-[15rem_1fr] overflow-y-scroll">
        <main className="col-start-2 ml-5 max-w-screen px-24 pt-18 pb-5">{children}</main>
      </div>
    </>
  )
}
