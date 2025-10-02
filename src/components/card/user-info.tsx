import clsx from 'clsx'
import { Timestamp } from './timestamp'

interface UserInfoProps {
  name: string
  timestamp: Date
  variant?: 'primary' | 'secondary'
}

export function UserInfo({ name, timestamp, variant = 'primary' }: UserInfoProps) {
  return (
    <div className="flex flex-col">
      <span
        className={clsx('text-gray-100', {
          'text-body-md': variant === 'primary',
          'text-title-xs': variant === 'secondary',
        })}
      >
        {name}
      </span>
      <span>
        <Timestamp date={timestamp} />
      </span>
    </div>
  )
}
