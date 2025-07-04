interface BookInfoProps {
  title: string
  subtitle: string
}

export function BookInfo({ title, subtitle }: BookInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-100 text-title-xs">{title}</span>
      <span className="text-body-sm text-gray-400 ">{subtitle}</span>
    </div>
  )
}
