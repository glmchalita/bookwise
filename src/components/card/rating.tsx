/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */

import { StarIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

interface RatingProps {
  rate: number
  size?: number
  containerClassName?: string
}

export function Rating({ rate, size, containerClassName }: RatingProps) {
  return (
    <div className={clsx('flex', containerClassName)}>
      {Array.from({ length: 5 }, (_, i) => (
        <div className="px-0.5" key={`star-${i}`}>
          <StarIcon
            className="text-purple-100"
            weight={i < rate ? 'fill' : 'regular'}
            size={size}
          />
        </div>
      ))}
    </div>
  )
}
