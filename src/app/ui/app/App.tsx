import { TopData } from '../top-data/TopData';
import { Header } from '../header/Header';
import { signOut } from '@/auth';
import styles from './App.module.css';

export const App = async () => {
  return (
    <div className={styles.app}>
      <Header
        onSignOutClick={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      />
      <main className={styles.main}>
        <TopData />
      </main>
    </div>
  );
};
