import NextAuth from 'next-auth'
import GithubProvider, { type GitHubProfile } from 'next-auth/providers/github'
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from './prisma/adapter'
import generateProfileUrl from './slugify'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          profile_url: generateProfileUrl(profile.name),
          avatar_url: null,
        }
      },
    }),
    GithubProvider({
      allowDangerousEmailAccountLinking: true,
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          profile_url: generateProfileUrl(profile.name ?? profile.login),
          avatar_url: null,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
})
