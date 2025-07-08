import NextAuth from 'next-auth'
import GithubProvider, { type GitHubProfile } from 'next-auth/providers/github'
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from './prisma-adapter'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
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
          avatar_url: profile.picture,
        }
      },
    }),
    GithubProvider({
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          avatar_url: profile.avatar_url,
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
