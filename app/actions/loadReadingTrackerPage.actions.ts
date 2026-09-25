'use server';

import api from '@/infra/http/api';
import { ApiDiaryRepository } from '@/infra/repositories/diary/diary.repository';

export async function loadReadingTrackerPageAction() {
  try {
    const repository = new ApiDiaryRepository(api);

    const response = await repository.carregarTelaAcompanhamentoDeLeitura();

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
        'Falha ao carregar tela de acompanhamento de leitura. Tente novamente mais tarde.',
    };
  }
}
