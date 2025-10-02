'use client'

import { SignOutIcon } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'

export function FooterLogoutButton() {
  function handleLogout() {
    signOut({ redirectTo: '/' })
  }

  return (
    <button type="button" className="cursor-pointer" onClick={handleLogout}>
      <SignOutIcon size={20} className="text-red-400" />
    </button>
  )
}
