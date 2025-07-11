import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

interface SectionTitleProps {
  title: string
  viewAllButton?: boolean
}

export function SectionTitle({ title, viewAllButton = false }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between pb-4">
      <h3 className="text-body-sm text-gray-100">{title}</h3>
      {viewAllButton && (
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-sm px-2 py-1 text-button-sm text-purple-100 transition hover:bg-purple-100/8"
        >
          Ver todos <CaretRightIcon />
        </Link>
      )}
    </div>
  )
}
