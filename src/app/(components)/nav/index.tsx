'use client'

import { BinocularsIcon, ChartLineUpIcon } from '../icons'
import { NavLink } from './nav-link'

export function Nav() {
  return (
    <nav className="mt-16 flex flex-col gap-4">
      <NavLink title="Início" icon={ChartLineUpIcon} href="/home" />
      <NavLink title="Explorar" icon={BinocularsIcon} href="/explorer" />
    </nav>
  )
}
