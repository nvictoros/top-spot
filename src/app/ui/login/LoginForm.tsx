'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <main className={styles.loginForm}>
      <h1>Top Spot</h1>
      <p>View your top tracks and artists from Spotify</p>
      <form action={formAction}>
        <button className={styles.loginButton} disabled={isPending}>
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </main>
  );
};
