import { Profile } from '@/core/domain/user/profile.enum';

export interface UserEntity {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  profile: Profile;
  dataDeNascimento: string | null;
  aceitarTermos: boolean;
  cidade?: string | null;
  estado?: string | null;
  pais?: string | null;
  foto?: Uint8Array | null;
  user?: unknown;
  notificacoes?: unknown[];
  livros?: unknown[];
}
