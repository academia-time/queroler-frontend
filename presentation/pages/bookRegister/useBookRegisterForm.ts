import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  CreateBookDTO,
  CreateBookRequestDTO,
  createBookSchema,
} from '@/core/application/book/create-book.dto';

export const INITIAL_BOOK_REGISTER_DEFAULT_VALUES: Partial<CreateBookDTO> = {
  titulo: '',
  isbn: '',
  editora: '',
  anoDePublicacao: '',
  numeroDePaginas: '',
  idioma: undefined,
  sinopse: '',
  autores: '',
  imagem: undefined,
};

export function useBookRegisterForm(): Pick<
  UseFormReturn<CreateBookDTO, undefined, CreateBookRequestDTO>,
  'register' | 'formState' | 'setValue' | 'getValues' | 'handleSubmit'
> {
  const form = useForm<CreateBookDTO, undefined, CreateBookRequestDTO>({
    resolver: zodResolver(createBookSchema),
    defaultValues: INITIAL_BOOK_REGISTER_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  return {
    register: form.register,
    formState: form.formState,
    setValue: form.setValue,
    getValues: form.getValues,
    handleSubmit: form.handleSubmit,
  };
}
