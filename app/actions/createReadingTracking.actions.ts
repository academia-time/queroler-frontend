'use server';

import api from '@/infra/http/api';
import { ApiDiaryRepository } from '@/infra/repositories/diary/diary.repository';
import { CreateReadingTrackingDTO } from '@/core/application/diary/create-reading-tracking.dto';

export async function createReadingTrackingAction(
  diarioId: number,
  data: CreateReadingTrackingDTO
) {
  try {
    const repository = new ApiDiaryRepository(api);

    await repository.salvarAcompanhamento(diarioId, data);

    return {
      success: true,
      message: 'Registro salvo com sucesso.',
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
        'Falha ao salvar registro de leitura. Tente novamente mais tarde.',
    };
  }
}
