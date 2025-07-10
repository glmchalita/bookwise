'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import type { ElementType } from 'react'
import { Avatar } from '../(components)/avatar'
import { BinocularsIcon, ChartLineUpIcon, SignOutIcon } from '../(components)/icons'

function NavLink({ title, icon: Icon, href }: { title: string; icon: ElementType; href: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className="group relative flex items-center gap-3 py-2 pl-5 text-gray-400 transition duration-200 hover:text-gray-100"
    >
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="-translate-y-1/2 absolute top-1/2 left-0 h-6 w-1 rounded-full bg-gradient-vertical"
        />
      )}

      <Icon
        size={24}
        className={`${isActive ? 'text-gray-100' : 'text-gray-400'} transition duration-200 group-hover:text-gray-100`}
      />
      <span className={`${isActive ? 'text-button-md text-gray-100' : 'text-body-md'} w-[64px]`}>
        {title}
      </span>
    </Link>
  )
}

export function Nav() {
  return (
    <nav className="mt-16 flex flex-col gap-4">
      <NavLink title="Início" icon={ChartLineUpIcon} href="/home" />
      <NavLink title="Explorar" icon={BinocularsIcon} href="/explorer" />
    </nav>
  )
}

export function SignedUser({
  avatarUrl,
  name,
}: {
  avatarUrl: string | null | undefined
  name: string
}) {
  function handleSignOut() {
    signOut({ redirectTo: '/' })
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/" className="flex cursor-pointer items-center justify-center gap-3">
        <Avatar avatarUrl={avatarUrl} name={name} size={32} />
        <span>{name.split(' ')[0]}</span>
      </Link>

      <button type="button" className="cursor-pointer" onClick={handleSignOut}>
        <SignOutIcon size={20} className="text-red-400" />
      </button>
    </div>
  )
}
