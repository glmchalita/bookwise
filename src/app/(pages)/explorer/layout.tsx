export default function ExplorerLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <main>{children}</main>
      {modal}
    </>
  )
}
