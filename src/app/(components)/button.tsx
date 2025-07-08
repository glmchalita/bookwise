import Link, { type LinkProps } from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonLinkProps = LinkProps & {
  asLink: true
  children: ReactNode
}

type ButtonNativeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false
  children: ReactNode
}

type ButtonProps = ButtonLinkProps | ButtonNativeProps

export function Button({ asLink, children, ...rest }: ButtonProps) {
  const styleClasses =
    'flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 text-button-lg transition hover:bg-gray-500'

  return asLink ? (
    <Link className={styleClasses} {...(rest as LinkProps)}>
      {children}
    </Link>
  ) : (
    <button
      type="button"
      className={styleClasses}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
