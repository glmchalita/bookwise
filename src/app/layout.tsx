import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'Avaliação e gerenciamento de leituras',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${nunitoSans.className} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
