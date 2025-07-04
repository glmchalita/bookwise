import Link, { type LinkProps } from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps extends LinkProps {
  children: ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <Link
      href={props.href}
      className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 text-button-lg transition hover:bg-gray-500"
    >
      {children}
    </Link>
  )
}
