import { auth, signOut } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import { fetchTopData, TopDataTimeRange, TopDataType } from '@/app/lib/data';

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  session.user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  const topTracks = await fetchTopData(TopDataType.Tracks, TopDataTimeRange.Medium);

  return (
    <SessionProvider basePath={'/auth'} session={session}>
      <div>{session?.user?.name}</div>
      <Image alt="" width={100} height={100} src={session?.user?.image || ''} />
      {topTracks && (
        <ul>
          {topTracks.items.map(
            ({ name, artists, id }: { name: string; artists: { name: string }[]; id: string }, index: number) => (
              <li key={id}>
                {index + 1}. {name} |{' '}
                {artists.reduce((artists: string, artist, i: number) => (artists += (i ? ', ' : '') + artist.name), '')}
              </li>
            ),
          )}
        </ul>
      )}
      <button
        onClick={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        Sign Out
      </button>
    </SessionProvider>
  );
}
