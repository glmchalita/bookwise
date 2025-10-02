import clsx from 'clsx'
import type { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export function Root({ children, className, variant = 'primary' }: RootProps) {
  return (
    <div
      className={clsx('rounded-lg', className, {
        'bg-gray-700': variant === 'primary',
        'bg-gray-600': variant === 'secondary',
      })}
    >
      {children}
    </div>
  )
}
