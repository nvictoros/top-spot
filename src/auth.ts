import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';
import "next-auth/jwt"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Spotify],
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) { session.accessToken = token.accessToken }

      return session
    }
  }
});

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}