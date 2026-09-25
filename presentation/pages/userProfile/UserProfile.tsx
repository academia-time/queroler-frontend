'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Header } from '@/presentation/shared/components/header/header';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';
import { useRouter } from 'next/navigation';
import { loadUserProfilePageAction } from '@/app/actions/loadUserProfilePage.actions';
import { updateUserProfileAction } from '@/app/actions/updateUser.actions';
import { useEffect } from 'react';
import { useUserProfileForm } from '@/presentation/pages/userProfile/useUserProfileForm';
import { useAuth } from '@/presentation/shared/lib/auth-context';
import { Profile } from '@/core/domain/user/profile.enum';
import { toast } from 'react-toastify';
import { deleteUserProfileAction } from '@/app/actions/deleteUserProfile.actions';
import { DeleteProfileModal } from '@/presentation/shared/components/deleteProfileModal/DeleteProfileModal';
import { UserProfileRequestDTO } from '@/core/application/user/user-profile.dto';
import { useUserStore } from '@/presentation/shared/lib/user-store';

export function UserProfile() {
  const user = useUserStore((state) => state.user);
  const { logout } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [perfilCarregadoComSucesso, setPerfilCarregadoComSucesso] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useUserProfileForm();

  useEffect(() => {
    async function carregarTelaDePerfil() {
      const result = await loadUserProfilePageAction();

      if (!result.success) {
        toast.error(result.message);
        setPerfilCarregadoComSucesso(false);
        return;
      }

      if (!result.response) {
        setPerfilCarregadoComSucesso(false);
        return;
      }

      setValue('nome', result.response.nome);
      setValue('email', result.response.email);
      setValue('cpf', result.response.cpf);
      setValue('dataDeNascimento', result.response.dataDeNascimento);
      setValue('cidade', result.response.cidade ?? '');
      setValue('estado', result.response.estado ?? '');
      setValue('pais', result.response.pais ?? '');
      setValue('fotoUrl', result.response.fotoUrl ?? '');

      if (
        result.response?.fotoUrl &&
        result.response.fotoUrl !== 'Foto não encontrada.'
      ) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_API_URL}${result.response.fotoUrl}`
        );
      }

      if (result.success && result.response) {
        setUserProfile(result.response.profile);
      }

      setPerfilCarregadoComSucesso(true);
    }

    carregarTelaDePerfil();
  }, [setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue('imagem', file, { shouldValidate: true, shouldDirty: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');

    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5);

    setValue('dataDeNascimento', v);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteUserProfileAction();
    if (result.success) {
      setIsDeleteModalOpen(false);
      logout();
    } else {
      toast.error(result.message || 'Erro ao excluir perfil.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const submitData = async (data: UserProfileRequestDTO) => {
    const result = await updateUserProfileAction(data);

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
  };

  return (
    <div>
      <Header
        nomeUsuario={user?.nome ?? ''}
        email={user?.email ?? ''}
        fotoDePerfil={user?.fotoUrl ?? 'Foto não encontrada.'}
        profile={user?.profile ?? Profile.LEITOR}
      />
      <div className="min-h-screen lg:mx-50 flex flex-col">
        <main className="flex-1 px-4 py-6 lg:px-8">
          <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
            Meu perfil
          </h1>
          <p className="text-text-secondary text-sm lg:text-base mb-6">
            Cadastre e edite as informações do seu perfil.
          </p>

          <form
            className="flex flex-col lg:flex-row gap-6"
            onSubmit={handleSubmit((data) =>
              submitData(data as UserProfileRequestDTO)
            )}
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

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Nome completo
                  </label>
                  <input
                    data-testid="input-nome"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="nome"
                    {...register('nome')}
                    aria-invalid={!!errors.nome}
                  />
                  <FieldError message={errors.nome?.message as string} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    E-mail
                  </label>
                  <input
                    data-testid="input-email"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="email"
                    {...register('email')}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError message={errors.email?.message as string} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    CPF
                  </label>
                  <input
                    data-testid="input-cpf"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="cpf"
                    {...register('cpf')}
                    readOnly
                  />
                </div>
                <div className="relative flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Data de nascimento
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      data-testid="input-nascimento"
                      maxLength={10}
                      className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
                      id="data-picker"
                      {...register('dataDeNascimento', {
                        onChange: handleDateChange,
                      })}
                      aria-invalid={!!errors.dataDeNascimento}
                    />
                    <FieldError
                      message={errors.dataDeNascimento?.message as string}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Cidade
                  </label>
                  <input
                    data-testid="input-cidade"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="cidade"
                    {...register('cidade')}
                    aria-invalid={!!errors.cidade}
                  />
                  <FieldError message={errors.cidade?.message as string} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Estado
                  </label>
                  <input
                    data-testid="input-estado"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="estado"
                    {...register('estado')}
                    aria-invalid={!!errors.estado}
                  />
                  <FieldError message={errors.estado?.message as string} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-text-primary text-xs tracking-widest">
                  País
                </label>
                <input
                  data-testid="input-pais"
                  className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                  id="pais"
                  {...register('pais')}
                  aria-invalid={!!errors.pais}
                />
                <FieldError message={errors.pais?.message as string} />
              </div>

              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  data-testid="btn-excluir-perfil"
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={
                    !perfilCarregadoComSucesso || userProfile !== Profile.LEITOR
                  }
                  className="px-2 text-sm text-brand hover:opacity-80 cursor-pointer font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Excluir perfil
                </button>
                <button
                  type="button"
                  data-testid="btn-voltar"
                  onClick={() => router.back()}
                  className="px-9 py-3 text-sm text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-dark-purple font-bold cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  data-testid="btn-salvar"
                  type="submit"
                  disabled={isSubmitting || !isValid || !isDirty}
                  className={`px-9 py-3 text-sm text-white rounded-lg bg-brand font-bold cursor-pointer
                  ${
                    isSubmitting || !isValid || !isDirty
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-80'
                  }`}
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <DeleteProfileModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
