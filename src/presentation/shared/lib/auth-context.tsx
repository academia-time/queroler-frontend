'use client';

import {
  createContext,
  useContext,
  useState,
  useTransition,
  type PropsWithChildren,
} from 'react';
import { deleteAuthCookieAction } from '@/app/actions/auth/deleteAuthCookie.actions';
import { toast } from 'react-toastify';

type AuthContextValue = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialIsAuthenticated = false,
}: PropsWithChildren<{ initialIsAuthenticated?: boolean }>) {
  const [isAuthenticated, setAuthenticated] = useState(initialIsAuthenticated);
  const [_isPending, startTransition] = useTransition();

  const logout = () => {
    toast.success('Realizando logout...', { autoClose: 2000 });
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await deleteAuthCookieAction();
      setAuthenticated(false);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
