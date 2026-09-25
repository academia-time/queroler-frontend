'use server';
import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';
import { GetBookDetailsUseCase } from '@/core/application/book/get-book-details.usecase';

export async function getBookDetailsAction(id: number) {
  try {
    const repository = new ApiBookRepository(api);
    const useCase = new GetBookDetailsUseCase(repository);
    const response = await useCase.execute(id);

    return {
      success: true,
      response: response.data,
      message: 'Livro encontrado com sucesso.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as string) ||
        'Falha ao buscar livro pelo id. Tente novamente mais tarde.',
    };
  }
}
