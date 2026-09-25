'use server';

import api from '@/infra/http/api';
import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';

export async function deleteUserProfileAction() {
  try {
    const repository = new ApiUserRepository(api);
    await repository.delete();
    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'error' in error
          ? String((error as { error: unknown }).error)
          : String(error);

    return {
      success: false,
      message:
        errorMessage || 'Falha ao excluir perfil. Tente novamente mais tarde.',
    };
  }
}
