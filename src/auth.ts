import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';
import 'next-auth/jwt';

const scope = 'user-top-read user-read-email';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(scope)}`,
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === 'spotify') {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
