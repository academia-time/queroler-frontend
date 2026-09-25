import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  userProfileSchema,
  UserProfileFormDTO,
} from '@/core/application/user/user-profile.dto';

export const INITIAL_USER_PROFILE_DEFAULT_VALUES: UserProfileFormDTO = {
  nome: '',
  email: '',
  cpf: '',
  dataDeNascimento: '',
  cidade: '',
  estado: '',
  pais: '',
  fotoUrl: '',
};

export function useUserProfileForm(): Pick<
  UseFormReturn<UserProfileFormDTO>,
  'register' | 'formState' | 'setValue' | 'handleSubmit'
> {
  const form = useForm<UserProfileFormDTO>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: INITIAL_USER_PROFILE_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  return {
    register: form.register,
    formState: form.formState,
    setValue: form.setValue,
    handleSubmit: form.handleSubmit,
  };
}
