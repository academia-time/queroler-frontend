'use server';

import api from '@/infra/http/api';
import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';

export async function loadUserProfilePageAction() {
  try {
    const repository = new ApiUserRepository(api);

    const response = await repository.carregarTelaDePerfilLeitura();

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'error' in error
          ? String(error.error)
          : (error as string);
    return {
      success: false,
      message:
        errorMessage ||
        'Falha ao carregar perfil de usuário. Tente novamente mais tarde.',
    };
  }
}
