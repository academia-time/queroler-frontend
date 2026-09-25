'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteAuthCookieAction() {
  const cookieStore = await cookies();

  cookieStore.delete('jwt');

  redirect('/');
}
