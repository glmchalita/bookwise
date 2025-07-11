'use client'

import { RocketLaunchIcon } from '@phosphor-icons/react'
import { signIn } from 'next-auth/react'
import { Button } from '@/app/(components)/button'
import { GithubIcon } from '@/assets/github'
import { GoogleIcon } from '@/assets/google'

export function LoginActions() {
  async function handleGoogleLogin() {
    await signIn('google', { redirectTo: '/home' })
  }

  async function handleGithubLogin() {
    await signIn('github', { redirectTo: '/home' })
  }

  return (
    <section className="mt-10 flex flex-col gap-4">
      <Button onClick={handleGoogleLogin}>
        <GoogleIcon />
        Entrar com Google
      </Button>

      <Button onClick={handleGithubLogin}>
        <GithubIcon />
        Entrar com Github
      </Button>

      <Button asLink href={'/home'}>
        <RocketLaunchIcon size={32} className="text-purple-100" />
        Acessar como visitante
      </Button>
    </section>
  )
}
