import { Profile } from '@/core/domain/user/profile.enum';

export interface LoadUserProfileResponseDTO {
  nome: string;
  email: string;
  cpf: string;
  dataDeNascimento: string;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  fotoUrl: string | null;
  profile: Profile;
}
