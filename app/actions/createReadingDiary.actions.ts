'use server';

import api from '@/infra/http/api';
import { ApiDiaryRepository } from '@/infra/repositories/diary/diary.repository';
import { CreateReadingDiaryDTO } from '@/core/application/diary/create-reading-diary.dto';

export async function createReadingDiaryAction(data: CreateReadingDiaryDTO) {
  try {
    const repository = new ApiDiaryRepository(api);

    await repository.criarDiario(data);

    return {
      success: true,
      message: 'Diário de leitura criado com sucesso.',
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
      message: errorMessage || 'Falha ao criar diário de leitura.',
    };
  }
}
