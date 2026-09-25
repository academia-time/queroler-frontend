'use server';
import { FindAllBooksByAttributeUseCase } from '@/core/application/book/find-all-books-by-attribute.usecase';
import { FindBooksByAttributeDTO } from '@/core/application/book/find-books-by-attribute.dto';
import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';

export async function findAllBooksByAttributeAction(
  data: FindBooksByAttributeDTO
) {
  try {
    const repository = new ApiBookRepository(api);
    const useCase = new FindAllBooksByAttributeUseCase(repository);
    const response = await useCase.execute(data);
    return {
      success: true,
      response: response.data,
      message: 'Livro(s) encontrado(s) com sucesso.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as string) ||
        'Falha ao buscar livros. Tente novamente mais tarde.',
    };
  }
}
