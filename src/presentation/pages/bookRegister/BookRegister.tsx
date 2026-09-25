'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/presentation/shared/components/header/header';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';
import Image from 'next/image';
import { CreateBookDTO } from '@/core/application/book/create-book.dto';
import { useBookRegisterForm } from '@/presentation/pages/bookRegister/useBookRegisterForm';
import { toast } from 'react-toastify';
import { LIVRO_IDIOMA_OPCOES } from '@/core/domain/book/language.enum';
import { createBookAction } from '@/app/actions/createBook.actions';
import { useRef } from 'react';
import { findBookByIsbnAction } from '@/app/actions/findBookByIsbn.actions';

export function BookRegister() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [carregandoIsbn, setCarregandoIsbn] = useState(false);
  const [formDesabilitado, setFormDesabilitado] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useBookRegisterForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleBlurIsbn = async () => {
    const isbn = getValues('isbn');
    const cleanIsbn = isbn.trim().replace(/\D/g, '');

    if (cleanIsbn.length < 13) return;

    setCarregandoIsbn(true);

    const response = await findBookByIsbnAction({ isbn });

    if (response.success) {
      const bookData = response.response;

      if (bookData) {
        setValue('titulo', bookData.titulo || '', { shouldValidate: true });
        setValue('autores', bookData.autores || '', { shouldValidate: true });
        setValue('editora', bookData.editora || '', { shouldValidate: true });
        setValue('anoDePublicacao', bookData.anoDePublicacao || '', {
          shouldValidate: true,
        });
        setValue('numeroDePaginas', String(bookData.numeroDePaginas) || '', {
          shouldValidate: true,
        });
        setValue('idioma', bookData.idioma || '', { shouldValidate: true });
        setValue('sinopse', bookData.sinopse || '', { shouldValidate: true });
        setValue('imagem', bookData.capaUrl || '', { shouldValidate: true });

        toast.success('Livro encontrado! Dados preenchidos automaticamente.');
      }
    } else {
      toast.error(
        'Livro de mesmo ISBN não encontrado. Preencha os dados manualmente.'
      );
      setCarregandoIsbn(false);
      setFormDesabilitado(false);
    }
  };

  const submitData = async (data: CreateBookDTO) => {
    const result = await createBookAction(data);
    if (!result?.success) {
      toast.error(result?.message);
      return;
    }
    toast.success(
      'Livro criado com sucesso! Redirecionando para tela inicial...'
    );
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
          Incremente a nossa Biblioteca
        </h1>
        <p className="text-text-subtitle text-sm lg:text-base mb-6">
          Cadastre um livro não encontrado para você e outros leitores o
          adicionarem na sua lista de leitura.
        </p>

        <div>
          <form
            className="flex flex-col lg:flex-row gap-6"
            onSubmit={handleSubmit(submitData)}
            noValidate
            data-testid="book-register-form"
          >
            <div className="flex flex-col gap-3 w-full lg:w-[220px]">
              <span className="text-brand text-xs uppercase tracking-widest">
                Capa do livro
              </span>
              <div
                onClick={triggerFileInput}
                className="w-[100px] h-[140px] lg:w-[200px] lg:h-[280px] bg-border-default border-2 border-dashed border-border rounded-xs flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-80 relative overflow-hidden"
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
                      alt="Capa do livro"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100px, 200px"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-text-secondary text-xs text-center px-4">
                      JPG, PNG ou JPEG
                    </span>
                    <span className="text-text-secondary text-xs text-center px-4">
                      Tamanho máximo 10MB
                    </span>
                  </>
                )}
              </div>
              <FieldError message={errors.imagem?.message as string} />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  ISBN <span className="text-red-400">*</span>
                </label>
                <input
                  data-testid="input-isbn"
                  inputMode="numeric"
                  placeholder="Ex: 978-3-16-148410-0"
                  className="bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
                  id="isbn"
                  maxLength={17}
                  {...register('isbn')}
                  aria-invalid={!!errors.isbn}
                  onBlur={() => handleBlurIsbn()}
                />
                <FieldError message={errors.isbn?.message as string} />
                {carregandoIsbn && (
                  <span className="text-text-secondary text-xs mt-1">
                    Buscando livro...
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Título do livro <span className="text-red-400">*</span>
                </label>
                <input
                  data-testid="input-titulo"
                  className={`bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 ${formDesabilitado ? 'cursor-not-allowed' : ''}`}
                  disabled={formDesabilitado}
                  id="titulo"
                  {...register('titulo')}
                  aria-invalid={!!errors.titulo}
                />
                <FieldError message={errors.titulo?.message as string} />
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-secondary text-xs uppercase tracking-widest">
                    Autor(es) <span className="text-red-400">*</span>
                  </label>
                  <input
                    data-testid="input-autor"
                    className={`w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 ${formDesabilitado ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={formDesabilitado}
                    id="autores"
                    {...register('autores')}
                    aria-invalid={!!errors.autores}
                  />
                  <FieldError message={errors.autores?.message as string} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-secondary text-xs uppercase tracking-widest">
                    Editora <span className="text-red-400">*</span>
                  </label>
                  <input
                    data-testid="input-editora"
                    className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                    disabled={formDesabilitado}
                    id="titulo"
                    {...register('editora')}
                    aria-invalid={!!errors.editora}
                  />
                  <FieldError message={errors.editora?.message as string} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-secondary text-xs uppercase tracking-widest">
                    Ano de Publicação <span className="text-red-400">*</span>
                  </label>
                  <input
                    data-testid="input-ano"
                    className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                    disabled={formDesabilitado}
                    id="ano-de-publicacao"
                    {...register('anoDePublicacao')}
                    aria-invalid={!!errors.anoDePublicacao}
                  />
                  <FieldError
                    message={errors.anoDePublicacao?.message as string}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-secondary text-xs uppercase tracking-widest">
                    Número de Páginas <span className="text-red-400">*</span>
                  </label>
                  <input
                    data-testid="input-paginas"
                    type="number"
                    className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                    disabled={formDesabilitado}
                    id="numero-de-paginas"
                    {...register('numeroDePaginas')}
                    aria-invalid={!!errors.numeroDePaginas}
                  />
                  <FieldError
                    message={errors.numeroDePaginas?.message as string}
                  />
                </div>
              </div>
              <div>
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Idioma <span className="text-red-400">*</span>
                </label>
                <select
                  data-testid="select-idioma"
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none cursor-pointer"
                  id="idioma"
                  {...register('idioma')}
                  aria-invalid={!!errors.idioma}
                  disabled={formDesabilitado}
                >
                  <option value="">Selecione um idioma</option>
                  {LIVRO_IDIOMA_OPCOES.map((item) => (
                    <option key={item.label} value={item.valorEnum}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Sinopse <span className="text-red-400">*</span>
                </label>
                <textarea
                  data-testid="input-sinopse"
                  placeholder="Escreva a sinopse do livro (mínimo 50 caracteres)..."
                  rows={4}
                  className="bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary w-full resize-none"
                  disabled={formDesabilitado}
                  id="ano-de-publicacao"
                  {...register('sinopse')}
                  aria-invalid={!!errors.sinopse}
                />
                <FieldError message={errors.sinopse?.message as string} />
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  data-testid="btn-cancelar"
                  onClick={() => router.back()}
                  className="px-6 py-3 text-sm text-text-secondary hover:opacity-80 cursor-pointer uppercase font-bold"
                >
                  Cancelar
                </button>
                <button
                  data-testid="btn-salvar"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`px-6 py-3 text-sm rounded-lg uppercase font-bold transition-opacity duration-200 bg-brand text-white
                    ${isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'}`}
                >
                  Salvar dados
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
