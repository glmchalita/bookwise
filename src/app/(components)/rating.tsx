import { StarIcon } from '@phosphor-icons/react/dist/ssr'

interface RatingProps {
  rate: number
  className?: string
}

export function Rating({ rate, className }: RatingProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < rate
        return (
          <StarIcon
            key={`star-${i}-${isFilled ? 'fill' : 'bold'}`}
            className="text-purple-100"
            weight={isFilled ? 'fill' : 'bold'}
          />
        )
      })}
    </div>
  )
}
