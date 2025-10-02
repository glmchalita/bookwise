'use client'

import { BinocularsIcon, ChartLineUpIcon, UserIcon } from '@phosphor-icons/react'
import { NavbarLink } from './navbar-link'

interface NavbarProps {
  profileUrl: string | undefined
}

export function Navbar({ profileUrl }: NavbarProps) {
  return (
    <nav className="mt-16 flex flex-col gap-4">
      <NavbarLink title="Início" icon={ChartLineUpIcon} href="/home" />
      <NavbarLink title="Explorar" icon={BinocularsIcon} href="/explorer" />
      {profileUrl && <NavbarLink title="Perfil" icon={UserIcon} href={`/profile/${profileUrl}`} />}
    </nav>
  )
}
