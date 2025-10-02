import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className="flex w-[372px] cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 text-button-lg transition hover:bg-gray-500"
      {...rest}
    >
      {children}
    </button>
  )
}
