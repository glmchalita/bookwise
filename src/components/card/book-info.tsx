import clsx from 'clsx'

interface BookInfoProps {
  title: string
  author: string
  className?: string
}

export function BookInfo({ title, author, className }: BookInfoProps) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-gray-100 text-title-xs">{title}</span>
      <span className="text-body-sm text-gray-400">{author}</span>
    </div>
  )
}
