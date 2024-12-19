import { auth, signOut } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import { TopData } from './ui/TopData';

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

  return (
    <SessionProvider basePath={'/auth'} session={session}>
      <div>{session?.user?.name}</div>
      <Image alt="" width={100} height={100} src={session?.user?.image || ''} />
      <TopData />
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
