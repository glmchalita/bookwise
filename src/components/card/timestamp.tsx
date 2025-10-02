import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card'
import clsx from 'clsx'
import dayjs from '@/lib/dayjs'

interface TimestampProps {
  date: Date
  variant?: 'primary' | 'secondary'
}

export function Timestamp({ date, variant = 'primary' }: TimestampProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="w-fit" asChild>
        <span
          className={clsx('cursor-default text-body-sm capitalize', {
            'text-gray-400': variant === 'primary',
            'text-gray-300': variant === 'secondary',
          })}
        >
          {dayjs(date).fromNow()}
        </span>
      </HoverCardTrigger>

      <HoverCardContent
        className="rounded-md bg-gray-600/60 px-1 py-0.5 text-body-xs text-gray-300"
        align="center"
        side="bottom"
      >
        {dayjs(date).format('D [de] MMMM [de] YYYY [às] HH[:]mm')}
        <HoverCardArrow className="fill-gray-600/60" />
      </HoverCardContent>
    </HoverCard>
  )
}
