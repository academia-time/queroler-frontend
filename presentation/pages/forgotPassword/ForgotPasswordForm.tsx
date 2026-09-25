'use client';

import { Button } from '@/presentation/shared/components';
import { Input, FieldError } from '@/presentation/shared/components';
import { Mail, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogoHeader } from '@/presentation/pages/auth';

const forgotSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail obrigatório')
    .max(256, 'Máximo de 256 caracteres')
    .email({ message: 'E-mail inválido' }),
});

type ForgotFormFields = z.infer<typeof forgotSchema>;

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotFormFields>({
    resolver: zodResolver(forgotSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = (_data: ForgotFormFields) => {
    // TODO: Implementar envio de email de recuperação
  };

  return (
    <div className="flex min-h-screen items-center flex-col justify-center">
      <LogoHeader />
      <div
        className="w-full max-w-md p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg mx-auto"
        data-testid="forgot-form-container"
      >
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Recuperar senha
          </h1>
          <p className="text-base lg:text-lg text-text-secondary leading-snug">
            Informe seu e-mail para receber o link de recuperação.
          </p>
        </div>
        <form
          className="flex flex-col gap-4"
          data-testid="forgot-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            <FieldError message={errors.email?.message as string} />
          </div>
          <Button
            variant="primary"
            type="submit"
            iconRight={<ArrowRight size={16} />}
            data-testid="forgot-submit-button"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar link'}
          </Button>
        </form>
      </div>
    </div>
  );
}
