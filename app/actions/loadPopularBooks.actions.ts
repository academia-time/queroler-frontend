'use server';

import { LoadPopularBooksUseCase } from '@/core/application/book/load-popular-books.usecase';
import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';

export async function loadPopularBooksAction() {
  try {
    const repository = new ApiBookRepository(api);
    const useCase = new LoadPopularBooksUseCase(repository);
    const response = await useCase.execute();

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as string) ||
        'Falha ao buscar livros populares. Tente novamente mais tarde.',
    };
  }
}
