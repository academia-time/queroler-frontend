import { CreateUserUseCase } from '@/core/application/user/create-user.usecase';
import { createUserPayload } from '@/tests/mocks/data-providers/create-user-action.data-provider';

import { UserRepository } from '@/core/domain/user/user.repository';
import { createUserResponse } from '@/tests/mocks/data-providers/create-user-action.data-provider';

const makeRepository = (overrides: Partial<UserRepository> = {}) => {
  const base: UserRepository = {
    create: jest.fn(async () => createUserResponse()),
    updateProfile: jest.fn(async () => {}),
    delete: jest.fn(async () => {}),
    changePassword: jest.fn(),
    carregarTelaDePerfilLeitura: jest.fn(),
  };
  return { ...base, ...overrides } as UserRepository;
};

describe('CreateUserUseCase', () => {
  it('deve criar um usuário', async () => {
    const repository = makeRepository();
    const useCase = new CreateUserUseCase(repository);
    const input = createUserPayload();
    await expect(useCase.execute(input.toString())).resolves.toBeDefined();
    expect(repository.create).toHaveBeenCalledWith(input.toString());
  });
});
