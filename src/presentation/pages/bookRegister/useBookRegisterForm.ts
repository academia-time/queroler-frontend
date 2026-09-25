import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  CreateBookDTO,
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
  UseFormReturn<CreateBookDTO>,
  'register' | 'formState' | 'setValue' | 'getValues' | 'handleSubmit'
> {
  const form = useForm<CreateBookDTO>({
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
