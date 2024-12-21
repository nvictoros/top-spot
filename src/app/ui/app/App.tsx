import { TopData } from '../top-data/TopData';
import { Header } from '../header/Header';
import { signOut } from '@/auth';

export const App = async () => {
  return (
    <>
      <Header
        onSignOutClick={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      />
      <main>
        <TopData />
      </main>
    </>
  );
};
