import type { ElementType } from 'react'

interface StatsProps {
  icon: ElementType
  value: string
  label: string
}

export function Stats({ icon: Icon, value, label }: StatsProps) {
  return (
    <div className="flex items-center gap-5">
      <Icon size={32} className="text-green-100" />
      <div>
        <span className="block text-gray-200 text-title-xs">{value}</span>
        <h4 className="text-body-sm text-gray-300">{label}</h4>
      </div>
    </div>
  )
}
