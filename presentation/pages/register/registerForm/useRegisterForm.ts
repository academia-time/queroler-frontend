import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  createUserSchema,
  CreateUserDTO,
} from '@/core/application/user/create-user.dto';

export const INITIAL_REGISTER_DEFAULT_VALUES: Partial<CreateUserDTO> = {
  nome: '',
  email: '',
  confirmarEmail: '',
  senha: '',
  confirmarSenha: '',
  cpf: '',
  dataDeNascimento: '',
  checkTermo: false,
};

export function useRegisterForm(): Pick<
  UseFormReturn<CreateUserDTO>,
  'register' | 'formState' | 'handleSubmit'
> {
  const form = useForm<CreateUserDTO>({
    resolver: zodResolver(createUserSchema),
    defaultValues: INITIAL_REGISTER_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  return {
    register: form.register,
    formState: form.formState,
    handleSubmit: form.handleSubmit,
  };
}
