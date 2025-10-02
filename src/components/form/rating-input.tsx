/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
'use client'

import { StarIcon } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useState } from 'react'

interface RatingInputProps {
  size?: number
  className?: string
  onRateChange: (rate: number) => void
}

export function RatingInput({ size, className = '', onRateChange }: RatingInputProps) {
  const [selectedRate, setSelectedRate] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  function handleClick(newRate: number) {
    setSelectedRate(newRate)
    onRateChange?.(newRate)
  }

  return (
    <div className={clsx('flex', className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = hoveredIndex !== null ? i <= hoveredIndex : i < selectedRate

        return (
          <button
            key={`star-${i}`}
            type="button"
            onClick={() => handleClick(i + 1)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="border-none bg-transparent p-0 px-0.5 focus:outline-none"
          >
            <StarIcon
              className="text-purple-100 transition-all duration-150"
              weight={isFilled ? 'fill' : 'regular'}
              size={size}
            />
          </button>
        )
      })}
    </div>
  )
}
