'use client';

import { Button } from '@/presentation/shared/components';
import { Input, FieldError } from '@/presentation/shared/components';
import { ArrowRight, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogoHeader } from '@/presentation/pages/auth';
import {
  ChangePasswordDTO,
  changePasswordSchema,
} from '@/core/application/user/change-password.dto';
import { changePasswordFirstLoginAction } from '@/app/actions/changePasswordFirstLogin.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/shared/lib/auth-context';
import { deleteAuthCookieAction } from '@/app/actions/auth/deleteAuthCookie.actions';
import { deleteFirstLoginCookieAction } from '@/app/actions/auth/deleteFirstLoginCookie.actions';

export function ChangePasswordForm() {
  const { setAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordDTO>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      senhaAtual: '',
      senhaNova: '',
      confirmarSenhaNova: '',
    },
    criteriaMode: 'all',
  });

  const router = useRouter();

  const onSubmit = async (data: ChangePasswordDTO) => {
    const result = await changePasswordFirstLoginAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setAuthenticated(true);
    router.refresh();
    router.push('/');
  };

  const onCancel = async () => {
    await deleteFirstLoginCookieAction();
    setAuthenticated(false);
    await deleteAuthCookieAction();
  };

  return (
    <div className="flex min-h-screen items-center flex-col justify-center">
      <LogoHeader />
      <div
        className="w-full max-w-md p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg mx-auto"
        data-testid="change-password-form-container"
      >
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Alterar senha
          </h1>
          <p className="text-base lg:text-lg text-text-secondary leading-snug">
            Crie uma nova senha que contenha no mínimo 8 caracteres, 1 caractere
            especial, 1 letra maiúscula, 1 letra minúscula e números.
          </p>
        </div>
        <form
          className="flex flex-col gap-4"
          data-testid="change-password-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <Input
              label="Senha Atual"
              type="password"
              id="senha-atual"
              placeholder="Sua senha atual"
              icon={<Lock size={18} />}
              dataTestId="input-senha-atual"
              autoComplete="senhaAtual"
              maxLength={256}
              showPasswordToggle={true}
              {...register('senhaAtual')}
              aria-invalid={!!errors.senhaAtual}
            />
            <FieldError message={errors.senhaAtual?.message as string} />
          </div>
          <div>
            <Input
              label="Senha Nova"
              type="password"
              id="senha-nova"
              placeholder="Sua senha nova"
              icon={<Lock size={18} />}
              dataTestId="input-senha-nova"
              autoComplete="senhaNova"
              maxLength={256}
              showPasswordToggle={true}
              {...register('senhaNova')}
              aria-invalid={!!errors.senhaNova}
            />
            <FieldError message={errors.senhaNova?.message as string} />
          </div>
          <div>
            <Input
              label="Confirmar senha nova"
              type="password"
              id="confirmar-senha-nova"
              placeholder="Confirme senha nova"
              icon={<Lock size={18} />}
              dataTestId="input-confirmar-senha-nova"
              autoComplete="confirmarSenhaNova"
              maxLength={256}
              showPasswordToggle={true}
              {...register('confirmarSenhaNova')}
              aria-invalid={!!errors.confirmarSenhaNova}
            />
            <FieldError
              message={errors.confirmarSenhaNova?.message as string}
            />
          </div>
          <div className="flex items-center justify-between gap-4 mt-2">
            <Button
              variant="primary"
              type="button"
              data-testid="change-password-cancel-button"
              onClick={() => onCancel()}
            >
              {'Cancelar'}
            </Button>
            <Button
              variant="primary"
              type="submit"
              iconRight={<ArrowRight size={16} />}
              data-testid="change-password-submit-button"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Salvando...' : 'Confirmar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
