import clsx from 'clsx'
import type { ElementType } from 'react'

interface StatsProps {
  icon: ElementType
  value: string
  label: string
  variant: 'profile' | 'modal'
}

export function Stats({ icon: Icon, value, label, variant }: StatsProps) {
  return (
    <div
      className={clsx('flex items-center', {
        'gap-5': variant === 'profile',
        'gap-4': variant === 'modal',
      })}
    >
      {variant === 'profile' ? (
        <>
          <Icon size={32} className="text-green-100" />
          <div>
            <span className="block text-gray-200 text-title-xs">{value}</span>
            <h4 className="text-body-sm text-gray-300">{label}</h4>
          </div>
        </>
      ) : (
        <>
          <Icon size={24} className="text-green-100" />
          <div>
            <h4 className="text-body-sm text-gray-300">{label}</h4>
            <span className="block text-gray-200 text-title-xs">{value}</span>
          </div>
        </>
      )}
    </div>
  )
}
