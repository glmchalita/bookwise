// biome-ignore lint/correctness/noUnusedImports: <>
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    avatar_url?: string | null
    image?: string | null
    email?: string | null
    emailVerified?: Date | null
  }

  interface Session {
    user: User
  }
}
