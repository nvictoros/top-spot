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
    async jwt({ token, account }) {
      if (account?.provider === 'spotify') {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      } else if (token.expires_at && Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        if (!token.refresh_token) throw new TypeError('Missing refresh_token');

        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization:
                'Basic ' +
                Buffer.from(process.env.AUTH_SPOTIFY_ID! + ':' + process.env.AUTH_SPOTIFY_SECRET!).toString('base64'),
            },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token!,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          token.access_token = newTokens.access_token;
          token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);

          if (newTokens.refresh_token) {
            token.refresh_token = newTokens.refresh_token;
          }
          return token;
        } catch (error) {
          console.error('Error refreshing access_token', error);
          token.error = 'RefreshTokenError';
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.access_token = token?.access_token;
      session.error = token?.error;

      return session;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    error?: 'RefreshTokenError';
  }
}
