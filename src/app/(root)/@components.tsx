'use client'

import { signIn } from 'next-auth/react'
import { GithubIcon } from '@/assets/github'
import { GoogleIcon } from '@/assets/google'
import { Button } from '../(components)/button'
import { RocketLaunchIcon } from '../(components)/icons'

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
