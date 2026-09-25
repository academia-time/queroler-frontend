import {
  UseFormRegisterReturn,
  FieldError as RHFFieldError,
} from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import { Input } from '@/presentation/shared/components/input/Input';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';

interface AuthFieldsProps {
  register: {
    email: UseFormRegisterReturn;
    password: UseFormRegisterReturn;
  };
  errors: {
    email?: RHFFieldError;
    password?: RHFFieldError;
  };
}

export function AuthFields({ register, errors }: AuthFieldsProps) {
  return (
    <>
      <div>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Seu e-mail"
          icon={<Mail size={18} />}
          dataTestId="input-email"
          autoComplete="email"
          maxLength={256}
          {...register.email}
          aria-invalid={!!errors.email}
        />
        <FieldError message={errors.email?.message as string} />
      </div>
      <div>
        <Input
          label="Senha"
          type="password"
          id="senha"
          placeholder="Sua senha"
          icon={<Lock size={18} />}
          dataTestId="input-senha"
          autoComplete="current-password"
          {...register.password}
          aria-invalid={!!errors.password}
          showPasswordToggle
        />
        <FieldError message={errors.password?.message as string} />
      </div>
    </>
  );
}
