'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return <form action={formAction} ><button disabled={isPending}>Login</button>{errorMessage && <p>{errorMessage}</p>}</form>
}

