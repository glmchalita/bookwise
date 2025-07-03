import { Logo } from '@/assets/logo'
import { Nav } from '../(components)/nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-screen grid-cols-[minmax(12rem,15rem)_1fr] gap-24">
      <aside className="fixed mt-5 ml-5 flex h-[calc(100dvh-2.5rem)] flex-col items-center rounded-xl bg-gray-950 px-14 pt-10">
        <Logo />
        <Nav />
      </aside>

      <main className="col-start-2 max-w-screen bg-gray-950">{children}</main>
    </div>
  )
}
