import { extractJwtCookieValue } from '@/app/actions/auth/login.actions';
import { createUserAction } from '@/app/actions/createUser.actions';
import { createUserPayload } from '@/tests/mocks/data-providers/create-user-action.data-provider';
import { cookies } from 'next/headers';

const mockExecute = jest.fn();

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));
jest.mock('@/infra/http/api', () => ({}));
jest.mock('@/core/application/user/create-user.usecase', () => ({
  CreateUserUseCase: jest.fn().mockImplementation(() => ({
    execute: mockExecute,
  })),
}));

jest.mock('next/headers');
jest.mock('@/app/actions/auth/login.actions');

const mockedCookies = jest.mocked(cookies);
const mockedExtractJwtCookieValue = jest.mocked(extractJwtCookieValue);

type CookieStore = Awaited<ReturnType<typeof cookies>>;

describe('Server Actions: createUserAction', () => {
  const mockSet = jest.fn();
  const cookieStoreMock: Partial<CookieStore> = {
    set: mockSet,
  };
  beforeEach(() => {
    mockExecute.mockReset();
    mockedCookies.mockResolvedValue(cookieStoreMock as CookieStore);

    mockedExtractJwtCookieValue.mockResolvedValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token'
    );
  });

  it('deve criar um usuário com sucesso', async () => {
    mockExecute.mockResolvedValue({
      user: {},
      setCookie: [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token; Path=/; HttpOnly; SameSite=Lax',
      ],
    });

    const data = createUserPayload();
    const result = await createUserAction(data);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Usuário criado com sucesso.');
    expect(mockedExtractJwtCookieValue).toHaveBeenCalledWith([
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token; Path=/; HttpOnly; SameSite=Lax',
    ]);
    expect(mockSet).toHaveBeenCalledWith(
      'jwt',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token',
      expect.objectContaining({
        httpOnly: true,
        path: '/',
      })
    );
  });

  it('deve validar os dados e retornar erros para dados inválidos', async () => {
    const data = createUserPayload({
      nome: '',
      email: '',
      confirmarEmail: '',
      senha: '',
      confirmarSenha: '',
      cpf: '',
    });
    const result = await createUserAction(data);
    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Dados inválidos. Verifique o formulário e tente novamente.'
    );
    expect(result.errors).toBeDefined();
  });

  it('deve retornar um erro genérico quando a criação falhar', async () => {
    mockExecute.mockRejectedValue('UNKNOWN_ERROR');
    const data = createUserPayload();
    const result = await createUserAction(data);
    expect(result.success).toBe(false);
    expect(result.message).toBe('UNKNOWN_ERROR');
  });
});
