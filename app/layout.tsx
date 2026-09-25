import type { Metadata } from 'next';
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { cookies } from 'next/headers';

import '@/styles/globals.css';
import { Providers } from '@/app/providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUserProfilePageAction } from '@/app/actions/loadUserProfilePage.actions';
import { UserData } from '@/presentation/shared/lib/user-store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-layout-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'QueroLer',
  description: 'Criando hábitos de leitura',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialIsAuthenticated = Boolean(cookieStore.get('jwt')?.value);

  let userData = null;

  if (initialIsAuthenticated) {
    const result = await loadUserProfilePageAction();

    const foto =
      result.response?.fotoUrl &&
      result.response.fotoUrl !== 'Foto não encontrada.'
        ? `${process.env.NEXT_PUBLIC_API_URL}${result.response.fotoUrl}`
        : 'Foto não encontrada.';

    if (result.success) {
      userData = {
        nome: result.response?.nome ?? '',
        email: result.response?.email ?? '',
        fotoUrl: foto,
        profile: result.response?.profile,
      } as UserData;
    }
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">
        <Providers
          initialIsAuthenticated={initialIsAuthenticated}
          userData={userData}
        >
          {children}
        </Providers>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
