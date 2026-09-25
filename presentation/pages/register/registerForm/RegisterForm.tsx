'use client';

import {
  Button,
  Input,
  FieldError,
  Checkbox,
  AuthFields,
} from '@/presentation/shared/components';
import { ArrowRight } from 'lucide-react';
import { useRegisterForm } from '@/presentation/pages/register/registerForm/useRegisterForm';
import { useHookFormMask } from 'use-mask-input';
import { HeaderRegisterForm } from '@/presentation/pages/register/headerForm/HeaderRegisterForm';
import { LogoHeader } from '@/presentation/pages/auth';
import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { createUserAction } from '@/app/actions/createUser.actions';
import { Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { TermsModal } from '@/presentation/shared/components/modal/TermsModal';
import { useState } from 'react';
import { termsOfService } from '@/presentation/shared/components/modal/terms/termsOfService';
import { privacyPolicy } from '@/presentation/shared/components/modal/terms/privacyPolicy';

export function RegisterForm() {
  const hoje = new Date();
  const anoLimite = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate() - 1).padStart(2, '0');

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const openTerms = () => {
    setModalTitle('Termos de Serviço');
    setModalContent(termsOfService);
    setIsModalOpen(true);
  };

  const openPrivacy = () => {
    setModalTitle('Política de Privacidade');
    setModalContent(privacyPolicy);
    setIsModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useRegisterForm();
  const registerWithMask = useHookFormMask(register);

  const submitData = async (data: CreateUserDTO) => {
    const result = await createUserAction(data);
    if (!result?.success) {
      toast.error(result?.message);
      return;
    }
    toast.success('Usuário criado com sucesso! Redirecionando para login...');
    router.push('/dados-adicionais');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <LogoHeader />
        <div
          className="w-full max-w-2xl p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg mx-auto"
          data-testid="register-form-container"
        >
          <HeaderRegisterForm />
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-testid="register-form"
            onSubmit={handleSubmit(submitData)}
            noValidate
          >
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  label="Nome"
                  id="nome"
                  placeholder="Seu nome completo"
                  dataTestId="input-nome"
                  maxLength={80}
                  {...register('nome')}
                  aria-invalid={!!errors.nome}
                />
                <FieldError message={errors.nome?.message as string} />
              </div>
              <AuthFields
                register={{
                  email: register('email'),
                  password: register('senha'),
                }}
                errors={{
                  email: errors.email,
                  password: errors.senha,
                }}
              />
              <div>
                <Input
                  label="Data de Nascimento"
                  id="dataDeNascimento"
                  type="date"
                  max={`${anoLimite}-${mes}-${dia}`}
                  dataTestId="input-data-nascimento"
                  {...register('dataDeNascimento')}
                  aria-invalid={!!errors.dataDeNascimento}
                />
                <FieldError
                  message={errors.dataDeNascimento?.message as string}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Input
                  label="CPF"
                  id="cpf"
                  placeholder="Seu CPF"
                  dataTestId="input-cpf"
                  maxLength={14}
                  {...registerWithMask('cpf', '999.999.999-99')}
                  aria-invalid={!!errors.cpf}
                />
                <FieldError message={errors.cpf?.message as string} />
              </div>
              <div>
                <Input
                  label="Confirmar E-mail"
                  type="email"
                  id="confirmarEmail"
                  placeholder="Confirme seu e-mail"
                  icon={<Mail size={18} />}
                  dataTestId="input-confirmar-email"
                  autoComplete="email"
                  maxLength={256}
                  {...register('confirmarEmail')}
                  aria-invalid={!!errors.confirmarEmail}
                />
                <FieldError
                  message={errors.confirmarEmail?.message as string}
                />
              </div>
              <div>
                <Input
                  label="Confirmar Senha"
                  type="password"
                  id="confirmarSenha"
                  placeholder="Confirme sua senha"
                  dataTestId="input-confirmarSenha"
                  autoComplete="new-password"
                  {...register('confirmarSenha')}
                  aria-invalid={!!errors.confirmarSenha}
                  showPasswordToggle
                />
                <FieldError
                  message={errors.confirmarSenha?.message as string}
                />
              </div>
              <div className="flex flex-col h-full gap-2 align-center flex-start">
                <div className="mt-4">
                  <Checkbox
                    id="checkTermo"
                    label={
                      <>
                        Ao continuar você concorda com os{' '}
                        <button
                          type="button"
                          onClick={openTerms}
                          className="text-[#E41B6F] underline hover:opacity-80 cursor-pointer"
                        >
                          Termos de Serviço
                        </button>{' '}
                        e{' '}
                        <button
                          type="button"
                          onClick={openPrivacy}
                          className="text-[#E41B6F] underline hover:opacity-80 cursor-pointer"
                        >
                          Política de Privacidade
                        </button>
                        .
                      </>
                    }
                    error={!!errors.checkTermo}
                    data-testid="input-termo"
                    {...register('checkTermo')}
                    aria-invalid={!!errors.checkTermo}
                  />
                </div>
                <FieldError message={errors.checkTermo?.message as string} />
              </div>
            </div>

            <div className="md:col-span-2 mt-8">
              <Button
                variant="primary"
                type="submit"
                iconRight={<ArrowRight size={16} />}
                data-testid="register-submit-button"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <TermsModal
        isOpen={isModalOpen}
        title={modalTitle}
        content={modalContent}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
