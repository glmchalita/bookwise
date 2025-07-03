'use client'

import { motion } from 'framer-motion'
import Link, { type LinkProps } from 'next/link'

import { usePathname } from 'next/navigation'
import type { ElementType } from 'react'
export interface NavLinkProps extends LinkProps {
  title: string
  icon: ElementType
}

export function NavLink({ title, icon: Icon, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link
      href={props.href}
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
