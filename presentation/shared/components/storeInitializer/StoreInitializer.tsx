'use client';

import { useEffect, useRef } from 'react';
import { UserData, useUserStore } from '@/presentation/shared/lib/user-store';

interface StoreInitializerProps {
  userData: UserData;
}

export function StoreInitializer({ userData }: StoreInitializerProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && userData) {
      useUserStore.setState({ user: userData });
      initialized.current = true;
    }
  }, [userData]);

  return null;
}
