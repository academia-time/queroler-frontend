'use server';

import { cookies } from 'next/headers';

export async function deleteFirstLoginCookieAction() {
  const cookieStore = await cookies();

  cookieStore.delete('primeiroLoginPendente');
}
