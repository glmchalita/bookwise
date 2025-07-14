'use client'

import { BinocularsIcon, ChartLineUpIcon, UserIcon } from '@phosphor-icons/react'
import { NavLink } from './nav-link'

export function Nav({ profileUrl }: { profileUrl: string | undefined }) {
  return (
    <nav className="mt-16 flex flex-col gap-4">
      <NavLink title="Início" icon={ChartLineUpIcon} href="/home" />
      <NavLink title="Explorar" icon={BinocularsIcon} href="/explorer" />
      {profileUrl && <NavLink title="Perfil" icon={UserIcon} href={`/profile/${profileUrl}`} />}
    </nav>
  )
}
