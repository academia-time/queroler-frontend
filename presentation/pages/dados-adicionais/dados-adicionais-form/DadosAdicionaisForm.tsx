'use client';

import { Button, Input, FieldError } from '@/presentation/shared/components';
import { ArrowRight } from 'lucide-react';
import { LogoHeader } from '@/presentation/pages/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { HeaderDadosAdicionaisForm } from '@/presentation/pages/dados-adicionais/header-dados-adicionais-form/HeaderDadosAdicionaisForm';
import Image from 'next/image';
import { useAditionalDataForm } from '@/presentation/pages/dados-adicionais/dados-adicionais-form/useDadosAdicionaisForm';
import { loadUserProfilePageAction } from '@/app/actions/loadUserProfilePage.actions';
import { AditionalDataRequestDTO } from '@/core/application/user/aditional-data.dto';
import { useUserStore } from '@/presentation/shared/lib/user-store';
import { useAuth } from '@/presentation/shared/lib/auth-context';
import { updateWithAditionalDataAction } from '@/app/actions/updateWithAditionalData.actions';

export function DadosAdicionaisForm() {
  const router = useRouter();

  const { isAuthenticated, setAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useAditionalDataForm();

  const { cidade, estado, pais, fotoUrl, imagem } = watch();

  const hasAnyValue = [cidade, estado, pais, fotoUrl, imagem].some(
    (value) => value || (typeof value === 'string' && value?.trim() !== '')
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue('imagem', file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const pularForm = () => {
    setAuthenticated(true);
    router.refresh();
    router.push('/');
  };

  const submitData = async (data: AditionalDataRequestDTO) => {
    const result = await updateWithAditionalDataAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const user = useUserStore.getState().user;

    useUserStore.setState({
      user: {
        ...user!,
        nome: data.nome,
        email: data.email,
        fotoUrl: previewImage ?? user?.fotoUrl ?? 'Foto não encontrada.',
      },
    });

    toast.success('Perfil atualizado com sucesso!');
    setAuthenticated(true);
    router.refresh();
    router.push('/');
  };

  useEffect(() => {
    async function carregarDadosUsuarioCadastrado() {
      const result = await loadUserProfilePageAction();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (!result.response) {
        return;
      }

      setValue('nome', result.response.nome);
      setValue('email', result.response.email);
      setValue('cpf', result.response.cpf);
      setValue('dataDeNascimento', result.response.dataDeNascimento);
      setValue('cidade', result.response.cidade ?? '');
      setValue('estado', result.response.estado ?? '');
      setValue('pais', result.response.pais ?? '');
    }

    carregarDadosUsuarioCadastrado();
  }, [setValue]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <LogoHeader />
        <div
          className="w-full max-w-2xl p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg mx-auto"
          data-testid="register-form-container"
        >
          <HeaderDadosAdicionaisForm />
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-testid="register-form"
            onSubmit={handleSubmit(submitData)}
            noValidate
          >
            <div className="flex flex-col gap-3 w-full lg:w-[220px]">
              <span className="text-brand text-xs tracking-widest">
                Foto de perfil
              </span>
              <div
                onClick={triggerFileInput}
                className="w-[100px] h-[140px] lg:w-[200px] lg:h-[290px] bg-border border-2 border-dashed border-text-secondary flex flex-col items-center justify-center hover:opacity-80 cursor-pointer relative overflow-hidden"
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={previewImage}
                      alt="Foto de perfil"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100px, 200px"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-text-primary text-xs text-center px-4">
                      JPG, PNG ou JPEG
                    </span>
                    <span className="text-text-primary text-xs text-center px-4">
                      Tamanho máximo 10MB
                    </span>
                  </>
                )}
              </div>
              <FieldError message={errors.imagem?.message as string} />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  label="Cidade"
                  id="cidade"
                  placeholder="Adicione a cidade"
                  dataTestId="input-cidade"
                  maxLength={40}
                  {...register('cidade')}
                  aria-invalid={!!errors.cidade}
                />
                <FieldError message={errors.cidade?.message as string} />
              </div>
              <div>
                <Input
                  label="Estado"
                  id="estado"
                  placeholder="Adicione o estado"
                  dataTestId="input-estado"
                  maxLength={40}
                  {...register('estado')}
                  aria-invalid={!!errors.estado}
                />
                <FieldError message={errors.estado?.message as string} />
              </div>
              <div>
                <Input
                  label="País"
                  id="pais"
                  placeholder="Adicione o país"
                  dataTestId="input-pais"
                  maxLength={40}
                  {...register('pais')}
                  aria-invalid={!!errors.pais}
                />
                <FieldError message={errors.pais?.message as string} />
              </div>
            </div>

            <div className="md:col-span-2 mt-8 flex gap-4">
              <Button
                variant="primary"
                type="button"
                data-testid="skip-button"
                className="flex-1"
                onClick={() => pularForm()}
              >
                Pular
              </Button>
              <Button
                variant="primary"
                type="submit"
                iconRight={<ArrowRight size={16} />}
                data-testid="add-submit-button"
                className="flex-1"
                disabled={isSubmitting || !hasAnyValue}
              >
                {isSubmitting ? 'Enviando...' : 'Avançar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
