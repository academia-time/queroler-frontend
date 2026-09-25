'use server';
import api from '@/infra/http/api';
import z from 'zod';
import {
  CreateBookDTO,
  createBookSchema,
} from '@/core/application/book/create-book.dto';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';
import { CreateBookUseCase } from '@/core/application/book/create-book.usecase';
import { CreateBookData } from '@/core/domain/book/book.repository';

export async function createBookAction(data: CreateBookDTO) {
  const validated = createBookSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Dados inválidos. Verifique o formulário e tente novamente.',
      errors: fieldErrors,
    };
  }

  const payload: CreateBookData = {
    titulo: data.titulo,
    isbn: data.isbn,
    editora: data.editora,
    anoDePublicacao: data.anoDePublicacao,
    numeroDePaginas: data.numeroDePaginas,
    idioma: data.idioma,
    sinopse: data.sinopse,
    autores: data.autores,
  };

  try {
    const repository = new ApiBookRepository(api);
    const useCase = new CreateBookUseCase(repository);
    await useCase.execute(JSON.stringify(payload), data.imagem);
    return {
      success: true,
      message: 'Livro criado com sucesso.',
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'error' in error
          ? String(error.error)
          : '';

    return {
      success: false,
      message:
        errorMessage || 'Falha ao criar livro. Tente novamente mais tarde.',
    };
  }
}
