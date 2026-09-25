import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { Profile } from '@/core/domain/user/profile.enum';
import { UserEntity } from '@/core/domain/user/user.entity';

export function createUserPayload(
  overrides: Partial<CreateUserDTO> = {}
): CreateUserDTO {
  return {
    nome: 'Usuário Teste',
    email: 'usuario@teste.com',
    senha: '123456K&t#',
    confirmarSenha: '123456K&t#',
    cpf: '12345678901',
    checkTermo: true,
    ...overrides,
  };
}
export function createUserResponse(
  overrides: Partial<UserEntity> = {}
): UserEntity {
  return {
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
  };
}
