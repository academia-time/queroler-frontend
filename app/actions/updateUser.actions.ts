'use server';

import api from '@/infra/http/api';
import z from 'zod';
import {
  userProfileSchema,
  UserProfileRequestDTO,
} from '@/core/application/user/user-profile.dto';
import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';
import { UpdateUserProfileUseCase } from '@/core/application/user/update-user.usecase';

export async function updateUserProfileAction(data: UserProfileRequestDTO) {
  const validated = userProfileSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);

    return {
      success: false,
      message: 'Dados inválidos. Verifique o formulário e tente novamente.',
      errors: fieldErrors,
    };
  }

  const payload = {
    nome: data.nome,
    email: data.email,
    dataDeNascimento: data.dataDeNascimento,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais,
  };

  try {
    const repository = new ApiUserRepository(api);
    const useCase = new UpdateUserProfileUseCase(repository);

    await useCase.execute(JSON.stringify(payload), data.imagem);

    return {
      success: true,
      message: 'Perfil atualizado com sucesso.',
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
        'Falha ao atualizar perfil. Tente novamente mais tarde.',
    };
  }
}
