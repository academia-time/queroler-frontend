'use client';

import { StoreInitializer } from '@/presentation/shared/components/storeInitializer/StoreInitializer';
import { AuthProvider } from '@/presentation/shared/lib/auth-context';
import { QueryProvider } from '@/presentation/shared/lib/query-provider';
import { UserData } from '@/presentation/shared/lib/user-store';

type ProvidersProps = {
  children: React.ReactNode;
  initialIsAuthenticated: boolean;
  userData: UserData | null | undefined;
};

export function Providers({
  children,
  initialIsAuthenticated,
  userData,
}: ProvidersProps) {
  return (
    <>
      {userData && <StoreInitializer userData={userData} />}
      <AuthProvider initialIsAuthenticated={initialIsAuthenticated}>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </>
  );
}
