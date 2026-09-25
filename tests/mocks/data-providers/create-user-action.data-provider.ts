import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { Profile } from '@/core/domain/user/profile.enum';
import { UserEntity } from '@/core/domain/user/user.entity';

export function createUserPayload(
  overrides: Partial<CreateUserDTO> = {}
): CreateUserDTO {
  return {
    nome: 'Usuário Teste',
    email: 'usuario@teste.com',
    confirmarEmail: 'usuario@teste.com',
    senha: '123456K&t#',
    confirmarSenha: '123456K&t#',
    cpf: '123.456.789-01',
    dataDeNascimento: '2005-12-26',
    checkTermo: true,
    ...overrides,
  };
}
export function createUserResponse(overrides: Partial<UserEntity> = {}): {
  user: UserEntity;
  setCookie: string[];
} {
  return {
    user: {
      id: 19,
      nome: 'Usuário Teste',
      email: 'usuario@teste.com',
      cpf: '12345678901',
      profile: Profile.LEITOR,
      dataDeNascimento: null,
      aceitarTermos: true,
      cidade: null,
      estado: null,
      pais: null,
      foto: null,
      user: undefined,
      notificacoes: undefined,
      livros: undefined,
      ...overrides,
    },
    setCookie: [
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token; Path=/; HttpOnly; SameSite=Lax',
    ],
  };
}
