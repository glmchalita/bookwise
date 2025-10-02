import clsx from 'clsx'
import type { ReactNode } from 'react'

interface DescriptionProps {
  children: ReactNode
  className?: string
}
export function Description({ children, className }: DescriptionProps) {
  return <p className={clsx('text-body-sm text-gray-300', className)}>{children}</p>
}
