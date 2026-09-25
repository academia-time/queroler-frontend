'use server';

import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';

export async function loadBookReadingPageAction(idUsuario: number) {
  try {
    const repository = new ApiBookRepository(api);

    const response = await repository.buscarTelaDeLeitura(idUsuario);

    return {
      success: true,
      response,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Não foi possível carregar a tela de leitura do usuário.',
    };
  }
}
