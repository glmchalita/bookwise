'use client'

import { BsGraphUpArrow } from 'react-icons/bs'
import { PiBinoculars } from 'react-icons/pi'
import { NavLink } from './nav-link'

export function Nav() {
  return (
    <nav className="mt-16 flex flex-col gap-4">
      <NavLink title="Início" icon={BsGraphUpArrow} href="/home" />
      <NavLink title="Explorar" icon={PiBinoculars} href="/explorer" />
    </nav>
  )
}
