import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  AditionalDataFormDTO,
  aditionalDataSchema,
} from '@/core/application/user/aditional-data.dto';

export const INITIAL_ADITIONAL_DATA_DEFAULT_VALUES: AditionalDataFormDTO = {
  nome: '',
  email: '',
  cpf: '',
  dataDeNascimento: '',
  cidade: '',
  estado: '',
  pais: '',
  fotoUrl: '',
  imagem: undefined,
};

export function useAditionalDataForm(): Pick<
  UseFormReturn<AditionalDataFormDTO>,
  'register' | 'formState' | 'setValue' | 'handleSubmit' | 'watch'
> {
  const form = useForm<AditionalDataFormDTO>({
    resolver: zodResolver(aditionalDataSchema),
    defaultValues: INITIAL_ADITIONAL_DATA_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  return {
    register: form.register,
    formState: form.formState,
    setValue: form.setValue,
    handleSubmit: form.handleSubmit,
    watch: form.watch,
  };
}
