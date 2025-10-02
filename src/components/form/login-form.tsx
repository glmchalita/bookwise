'use client'

import { RocketLaunchIcon } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { GithubIcon } from '../icon/github'
import { GoogleIcon } from '../icon/google'
import { Button } from '../ui/button'

interface LoginFormProps {
    containerClassName?: string
    withGuestOption?: boolean
    onSuccess?: () => void
}

export function LoginForm({
    containerClassName,
    withGuestOption = false,
    onSuccess,
}: LoginFormProps) {
    const router = useRouter()
    const { data: session, update } = useSession()

    async function handleGoogleLogin() {
        if (onSuccess) {
            const result = await signIn('google', { redirect: false })

            if (result.ok) {
                await update()
                onSuccess()
            }

            return
        }

        await signIn('google', { redirectTo: '/home' })
    }

    function centerPopup(width: number, height: number) {
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

        const currentWindowWidth = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
              ? document.documentElement.clientWidth
              : screen.width
        const currentWindowHeight = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
              ? document.documentElement.clientHeight
              : screen.height

        // Calculate center position relative to the current browser window
        const left = currentWindowWidth / 2 - width / 2 + dualScreenLeft
        const top = currentWindowHeight / 2 - height / 2 + dualScreenTop

        return { left: Math.round(left), top: Math.round(top) }
    }

    async function handleGithubLogin() {
        if (onSuccess) {
            const wasAuthenticated = !!session
            const result = await signIn('github', { redirect: false })

            if (result?.url) {
                const width = 400
                const height = 500
                const { left, top } = centerPopup(width, height)

                const popup = window.open(
                    result.url,
                    'auth-popup',
                    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=no,toolbar=no,menubar=no,location=no,status=no`,
                )

                if (!popup) return

                const pollSession = setInterval(async () => {
                    try {
                        await update()
                        const response = await fetch('/api/auth/session')
                        const currentSession = await response.json()

                        if (!wasAuthenticated && currentSession?.user) {
                            clearInterval(pollSession)
                            popup.close()
                            onSuccess()
                        }
                    } catch (error) {
                        console.error('Error checking session:', error)
                    }
                }, 1500)

                const checkClosed = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(checkClosed)
                        clearInterval(pollSession)
                        if (!wasAuthenticated) {
                            setTimeout(async () => {
                                await update()
                                onSuccess()
                            }, 500)
                        }
                    }
                }, 1000)

                setTimeout(() => {
                    clearInterval(pollSession)
                    clearInterval(checkClosed)
                    if (!popup.closed) {
                        popup.close()
                    }
                }, 300000)
            }
            return
        }

        await signIn('github', { redirectTo: '/home' })
    }

    function handleGuestAccess() {
        router.push('/home')
    }

    return (
        <div className={clsx('flex flex-col gap-4', containerClassName)}>
            <Button onClick={handleGoogleLogin}>
                <GoogleIcon />
                Entrar com Google
            </Button>

            <Button onClick={handleGithubLogin}>
                <GithubIcon />
                Entrar com Github
            </Button>

            {withGuestOption && (
                <Button onClick={handleGuestAccess}>
                    <RocketLaunchIcon size={32} className="text-purple-100" />
                    Acessar como visitante
                </Button>
            )}
        </div>
    )
}
