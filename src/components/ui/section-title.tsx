import clsx from 'clsx'
import Link from 'next/link'
import type { ElementType } from 'react'

interface SectionTitleProps {
  title: string
  actionTitle?: string
  actionIcon?: ElementType
  actionSize?: 'sm' | 'md'
  actionLink?: string
}

export function SectionTitle({
  title,
  actionTitle = '',
  actionIcon: Icon,
  actionSize = 'sm',
  actionLink,
}: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between pb-4">
      <h3 className="text-body-sm text-gray-100">{title}</h3>
      {actionTitle && (
        <Link
          href={`/${actionLink}`}
          className="flex items-center gap-2 rounded-sm px-2 py-1 text-button-sm text-purple-100 transition hover:bg-purple-100/8"
        >
          <span
            className={clsx({
              'text-button-sm': actionSize === 'sm',
              'text-button-md': actionSize === 'md',
            })}
          >
            {actionTitle}
          </span>
          {Icon && <Icon size={16} weight="bold" />}
        </Link>
      )}
    </div>
  )
}
