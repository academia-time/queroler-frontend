'use server';

import {
  ChangePasswordDTO,
  changePasswordSchema,
} from '@/core/application/user/change-password.dto';
import { ChangePasswordUseCase } from '@/core/application/user/change-password.usecase';
import api from '@/infra/http/api';
import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';
import { cookies } from 'next/headers';
import z from 'zod';

export async function changePasswordFirstLoginAction(data: ChangePasswordDTO) {
  const validated = changePasswordSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Dados inválidos. Verifique o formulário e tente novamente.',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new ApiUserRepository(api);
    const useCase = new ChangePasswordUseCase(repository);
    await useCase.execute(validated.data);

    const cookieStore = await cookies();
    cookieStore.delete('primeiroLoginPendente');

    return {
      success: true,
      message: 'Alteração de senha realizada com sucesso.',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message:
        errorMessage || 'Falha ao alterar senha. Tente novamente mais tarde.',
    };
  }
}
