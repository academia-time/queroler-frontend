'use server';
import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';
import { FindBookByIsbnUseCase } from '@/core/application/book/find-book-by-isbn.usecase';
import {
  FindBookByIsbnDTO,
  findBookByIsbnSchema,
} from '@/core/application/book/create-book.dto';
import z from 'zod';

export async function findBookByIsbnAction(data: FindBookByIsbnDTO) {
  const validated = findBookByIsbnSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'ISBN inválido. Verifique o campo e tente novamente.',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new ApiBookRepository(api);
    const useCase = new FindBookByIsbnUseCase(repository);
    const response = await useCase.execute(data.isbn);
    return {
      success: true,
      response,
      message: 'Livro encontrado com sucesso.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as string) ||
        'Falha ao buscar livro pelo ISBN. Tente novamente mais tarde.',
    };
  }
}
