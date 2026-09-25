'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { loginAction } from '@/app/actions/auth/login.actions';
import { loginSchema, LoginDTO } from '@/core/application/auth/login.dto';
import { Button } from '@/presentation/shared/components';
import { AuthFields } from '@/presentation/shared/components/AuthFields';
import { HeaderForm } from '@/presentation/pages/auth';
import { useAuth } from '@/presentation/shared/lib/auth-context';

export function LoginForm() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = async (data: LoginDTO) => {
    const result = await loginAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    if (result.data?.primeiroLogin) {
      router.push('/alterar-senha');
      return;
    }

    setAuthenticated(true);
    router.refresh();
    router.push('/');
  };

  return (
    <div
      className="w-full max-w-md p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg"
      data-testid="login-form-container"
    >
      <HeaderForm />
      <form
        className="flex flex-col gap-4"
        data-testid="login-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <AuthFields
          register={{
            email: register('email'),
            password: register('password'),
          }}
          errors={{
            email: errors.email,
            password: errors.password,
          }}
        />

        <div className="flex justify-end mb-2">
          <Link
            href="/esqueci-senha"
            className="text-xs sm:text-sm text-text-secondary hover:underline transition-colors"
            data-testid="forgot-password-link"
          >
            Esqueci minha senha
          </Link>
        </div>
        <Button
          variant="primary"
          type="submit"
          iconRight={<ArrowRight size={16} />}
          data-testid="login-submit-button"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
        <div className="flex items-center gap-2 my-2" data-testid="divider-or">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-secondary uppercase">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div
          className="text-center text-sm lg:text-base mt-2 gap-1 flex justify-center"
          data-testid="register-section"
        >
          <span className="text-text-secondary">Ainda não tem conta?</span>{' '}
          <Link
            href="/register"
            className="text-brand font-bold hover:underline transition-colors"
            data-testid="register-link"
          >
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
