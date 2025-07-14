'use client'

import { SignOutIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Avatar } from '@/app/(components)/avatar'

interface SignedUserProps {
  profileUrl: string
  avatarUrl: string | null
  name: string
}

export function SignedUser({ profileUrl, avatarUrl, name }: SignedUserProps) {
  function handleSignOut() {
    signOut({ redirectTo: '/' })
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/profile/${profileUrl}`}
        className="flex cursor-pointer items-center justify-center gap-3"
      >
        <Avatar avatarUrl={avatarUrl} name={name} size={32} />
        <span>{name.split(' ')[0]}</span>
      </Link>

      <button type="button" className="cursor-pointer" onClick={handleSignOut}>
        <SignOutIcon size={20} className="text-red-400" />
      </button>
    </div>
  )
}
