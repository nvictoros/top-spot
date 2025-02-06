import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { App } from './ui/app/App';
import { Metadata } from 'next';
import { ErrorBoundary } from './ui/components/ErrorBoundary';
import { GenericError } from './ui/components/GenericError';

export const metadata: Metadata = {
  title: 'TopSpot',
  description: 'View your top spotify data',
};

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  session.user = {
    name: session.user.name,
    image: session.user.image,
    email: session.user.email,
  };

  return (
    <SessionProvider basePath={'/api/auth'} session={session}>
      <ErrorBoundary fallback={<GenericError />}>
        <App />
      </ErrorBoundary>
    </SessionProvider>
  );
}
