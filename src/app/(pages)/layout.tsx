import { SignInIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Logo } from '@/assets/logo'
import { auth } from '@/lib/auth'
import { Nav } from './(components)/nav'
import { SignedUser } from './(components)/signed-user'

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedUser = (await auth())?.user

  return (
    <div className="grid min-h-screen grid-cols-[minmax(12rem,15rem)_1fr] gap-24">
      <aside className="fixed mt-5 ml-5 flex h-[calc(100dvh-2.5rem)] flex-col items-center justify-between rounded-xl bg-gray-950 px-14 pt-10">
        <header>
          <Logo />
          <Nav profileUrl={loggedUser?.profile_url} />
        </header>

        <footer className="pb-7">
          {loggedUser ? (
            <SignedUser
              profileUrl={loggedUser.profile_url}
              avatarUrl={loggedUser.avatar_url}
              name={loggedUser.name}
            />
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

      <main className="col-start-2 mt-18 max-w-screen">{children}</main>
    </div>
  )
}
