'use server';

import api from '@/infra/http/api';
import { ApiDiaryRepository } from '@/infra/repositories/diary/diary.repository';
import { UpdateReadingDiaryDTO } from '@/core/application/diary/update-reading-diary.dto';

export async function updateReadingDiaryAction(
  diarioId: number,
  data: UpdateReadingDiaryDTO
) {
  try {
    const repository = new ApiDiaryRepository(api);

    await repository.atualizarDiario(diarioId, data);

    return {
      success: true,
      message: 'Diário de leitura atualizado com sucesso.',
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
      message: errorMessage || 'Falha ao atualizar diário de leitura.',
    };
  }
}
