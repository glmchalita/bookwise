import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card'
import dayjs from '@/lib/dayjs'

interface TimestampProps {
  date: Date
  className?: string
}

export function Timestamp({ date, className }: TimestampProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="w-fit">
        <span className={`text-body-sm capitalize ${className} cursor-default`}>
          {dayjs(date).fromNow()}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        className="rounded-md bg-gray-600/60 px-1 py-0.5 text-body-xs text-gray-300"
        align="center"
        side="bottom"
      >
        {dayjs(date).format('D [de] MMMM [de] YYYY [às] H[:]MM')}
        <HoverCardArrow className="fill-gray-600/60" />
      </HoverCardContent>
    </HoverCard>
  )
}
