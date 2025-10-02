'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, ...props }, ref) => {
  return (
    <div className="mb-8 flex w-full items-center gap-2 rounded-sm border border-gray-500 px-5 py-3.5 text-gray-500 focus-within:border-green-200 focus-within:text-green-200">
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="flex-1 border-0 bg-transparent p-0 text-body-sm text-gray-200 leading-0 outline-none placeholder:text-gray-400"
        {...props}
      />
      <button type="submit" className="cursor-pointer">
        <MagnifyingGlassIcon size={20} className="text-inherit" />
      </button>
    </div>
  )
})

Input.displayName = 'Input'
