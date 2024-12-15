'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate() {
  try {
    await signIn("spotify", { redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Something went wrong.';
    }
    throw error;
  }
}