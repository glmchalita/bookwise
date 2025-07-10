import dayjs from '@/lib/dayjs'

interface TimestampProps {
  date: Date
  className?: string
}

export function Timestamp({ date, className }: TimestampProps) {
  return <span className={`text-body-sm capitalize ${className}`}>{dayjs(date).fromNow()}</span>
}
