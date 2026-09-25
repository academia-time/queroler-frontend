import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';
import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { UserEntity } from '@/core/domain/user/user.entity';
import { AxiosInstance } from 'axios';
import { Profile } from '@/core/domain/user/profile.enum';

describe('ApiUserRepository', () => {
  let api: jest.Mocked<AxiosInstance>;
  let repository: ApiUserRepository;

  const userPayload: CreateUserDTO = {
    nome: 'Teste',
    email: 'teste@email.com',
    confirmarEmail: 'teste@email.com',
    senha: '123456',
    confirmarSenha: '123456',
    cpf: '429.063.400-14',
    dataDeNascimento: '2003-06-28',
    checkTermo: true,
  };

  const userResponse: UserEntity = {
    id: 19,
    nome: 'Teste',
    email: 'teste@email.com',
    cpf: '429.063.400-14',
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
  };

  beforeEach(() => {
    api = {
      post: jest.fn(),
    } as never as jest.Mocked<AxiosInstance>;
    repository = new ApiUserRepository(api as unknown as AxiosInstance);
  });

  it('deve chamar api.post com os dados corretos e retornar o usuário', async () => {
    api.post.mockResolvedValue({
      data: userResponse,
      headers: {
        'set-cookie': [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token; Path=/; HttpOnly; SameSite=Lax',
        ],
      },
    });
    const result = await repository.create(userPayload.toString());
    const formdata = new FormData();
    formdata.append('dados', userPayload.toString());
    expect(api.post).toHaveBeenCalledWith('/usuarios', formdata);
    expect(result).toEqual({
      user: userResponse,
      setCookie: [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token; Path=/; HttpOnly; SameSite=Lax',
      ],
    });
  });

  it('deve lançar o erro do backend se api.post falhar', async () => {
    const backendError = { response: { data: { message: 'Erro do backend' } } };
    api.post.mockRejectedValue(backendError);
    await expect(repository.create(userPayload.toString())).rejects.toEqual({
      message: 'Erro do backend',
    });
  });

  it('deve lançar o próprio erro se não houver response.data', async () => {
    const genericError = new Error('Falha desconhecida');
    api.post.mockRejectedValue(genericError);
    await expect(repository.create(userPayload.toString())).rejects.toEqual(
      genericError
    );
  });
});
