import { LoadUserProfileResponseDTO } from '@/core/application/user/load-user-profile-page-response.dto';
import { UserEntity } from '@/core/domain/user/user.entity';
import { AxiosResponse } from 'axios';

export interface CreateUserData {
  nome: string;
  email: string;
  confirmarEmail: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  dataDeNascimento: string;
  checkTermo: boolean;
}

export interface ChangePasswordData {
  senhaAtual: string;
  senhaNova: string;
}

export interface UpdateUserProfileData {
  nome: string;
  email: string;
  dataDeNascimento: string;
  cidade: string;
  estado: string;
  pais: string;
}

export interface UserRepository {
  create(data: string): Promise<{ user: UserEntity; setCookie: string[] }>;
  changePassword(data: ChangePasswordData): Promise<void>;
  delete(): Promise<void>;
  updateProfile(dados: string, imagem?: File): Promise<void>;
  carregarTelaDePerfilLeitura(): Promise<
    AxiosResponse<LoadUserProfileResponseDTO>
  >;
}
