import { Profile } from '@/core/domain/user/profile.enum';
import { create } from 'zustand';

export interface UserData {
  nome: string;
  email: string;
  fotoUrl: string;
  profile: Profile;
}

interface UserState {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
