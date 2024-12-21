import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { App } from './ui/app/App';

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  session.user = {
    name: session.user.name,
    image: session.user.image,
  };

  return (
    <SessionProvider basePath={'/api/auth'} session={session}>
      <App />
    </SessionProvider>
  );
}
