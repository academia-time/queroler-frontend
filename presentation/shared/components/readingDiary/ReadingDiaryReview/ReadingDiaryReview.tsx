'use client';

import { useEffect, useState } from 'react';
import { BookHeart, Check, ChevronDown, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';
import { updateReadingDiaryAction } from '@/app/actions/updateReadingDiary.actions';
import { useReadingDiaryReviewForm } from '@/presentation/shared/components/readingDiary/ReadingDiaryReview/useReadingDiaryReviewForm';
import { ReadingDiaryReviewFormDTO } from '@/core/application/diary/reading-diary-review.schema';

export interface ReadingDiaryReviewProps {
  diarioId: number;
  nota: number;
  tituloDaResenha: string | null;
  resenha: string | null;
  spoilers: boolean;
  onAvaliacaoSalva: () => Promise<void>;
}

export function ReadingDiaryReview({
  diarioId,
  nota,
  tituloDaResenha,
  resenha,
  spoilers,
  onAvaliacaoSalva,
}: ReadingDiaryReviewProps) {
  const [spoiler, setSpoiler] = useState(spoilers);
  const [menuOpen, setIsMenuOpen] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('Selecione');
  //const [avaliacao, setAvaliacao] = useState(nota ?? 0);

  const handleStarClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    const valor = clickX <= rect.width / 2 ? index + 0.5 : index + 1;

    setValue('nota', valor, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useReadingDiaryReviewForm({
    nota: nota ?? 0,
    tituloDaResenha: tituloDaResenha ?? '',
    resenha: resenha ?? '',
  });

  const avaliacao = watch('nota');
  const tituloResenha = watch('tituloDaResenha');

  useEffect(() => {
    reset({
      nota: nota ?? 0,
      tituloDaResenha: tituloDaResenha ?? '',
      resenha: resenha ?? '',
    });
  }, [nota, tituloDaResenha, resenha, reset]);

  const handleSalvarAvaliacao = async (data: ReadingDiaryReviewFormDTO) => {
    const temResenha =
      data.tituloDaResenha.trim().length > 0 && data.resenha.trim().length > 0;

    const result = await updateReadingDiaryAction(diarioId, {
      nota: data.nota,

      ...(temResenha && {
        tituloDaResenha: data.tituloDaResenha.trim(),
        resenha: data.resenha.trim(),
      }),
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    await onAvaliacaoSalva();
  };

  return (
    <div className="py-5 lg:py-8">
      <form
        onSubmit={handleSubmit(handleSalvarAvaliacao)}
        noValidate
        className="bg-secondary-bg border border-border rounded-md p-3"
      >
        <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
          <BookHeart size={16} /> Avalie o Livro
        </h2>

        <h1 className="text-text-primary text-xs pt-3 pb-2">
          Sua Avaliação<span className="text-brand">*</span>
        </h1>

        <div className="flex flex-col gap-2 lg:gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const valorInteiro = index + 1;
                const valorMetade = index + 0.5;

                const estrelaCompleta = avaliacao >= valorInteiro;
                const meiaEstrela =
                  avaliacao >= valorMetade && avaliacao < valorInteiro;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={(event) => handleStarClick(index, event)}
                    className="relative w-7 h-7 cursor-pointer"
                    aria-label={`Avaliação ${valorMetade} a ${valorInteiro}`}
                  >
                    <Star className="absolute inset-0 w-7 h-7 text-active" />

                    {estrelaCompleta && (
                      <Star className="absolute inset-0 w-7 h-7 text-active fill-active" />
                    )}

                    {meiaEstrela && (
                      <div className="absolute inset-0 w-1/2 overflow-hidden">
                        <Star className="w-7 h-7 text-active fill-active" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-text-primary text-xs">
              Título da Resenha
              <span className="pl-1 text-[8px]">
                (opcional, max. 250 caracteres.)
              </span>
            </label>

            <input
              type="text"
              maxLength={250}
              placeholder="Dê um título à sua resenha"
              {...register('tituloDaResenha')}
              aria-invalid={!!errors.tituloDaResenha}
              className="w-full bg-secondary-bg border border-border rounded px-3 py-2 text-text-primary text-xs outline-none"
            />

            <FieldError message={errors.tituloDaResenha?.message} />

            <span className="text-text-primary/50 text-[10px] self-start">
              {tituloResenha.length}/250
            </span>

            <label className="flex items-center space-x-3 py-4 text-text-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={spoiler}
                onChange={(e) => setSpoiler(e.target.checked)}
                className="sr-only"
              />

              <div className="flex items-center justify-center w-4 h-4 rounded-md border border-border/50">
                {spoiler && <Check className="w-3 h-3 stroke-3" />}
              </div>

              <span className="text-xs">Contém spoilers</span>
            </label>

            <label className="text-text-primary text-xs">
              Resenha
              <span className="pl-1 text-[8px]">
                (opcional, min. 100 caracteres.)
              </span>
            </label>

            <textarea
              data-testid="input-resenha"
              placeholder="Escreva sua resenha aqui"
              rows={6}
              {...register('resenha')}
              aria-invalid={!!errors.resenha}
              className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-2 text-text-primary text-xs outline-none resize-none"
              id="resenha"
            />

            <FieldError message={errors.resenha?.message} />

            <h1 className="text-text-primary text-xs pt-4">Compartilhamento</h1>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 py-2">
              <div className="relative w-full lg:w-auto">
                <button
                  type="button"
                  data-testid="btn-add-lista"
                  onClick={() => setIsMenuOpen(!menuOpen)}
                  className="w-full lg:w-70 flex items-center justify-between px-4 py-3 text-xs rounded-xs transition-opacity duration-200 text-white hover:brightness-110 cursor-pointer bg-border"
                >
                  {opcaoSelecionada}

                  <ChevronDown size={16} className="text-text-primary/60" />
                </button>

                {menuOpen && (
                  <div className="absolute left-0 mt-2 w-full lg:w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
                    <button
                      type="button"
                      data-testid="profile-button"
                      onClick={() => {
                        setOpcaoSelecionada('Resenha pública');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                    >
                      Resenha pública
                    </button>

                    <div className="mx-4 h-px bg-border" />

                    <button
                      type="button"
                      data-testid="profile-button"
                      onClick={() => {
                        setOpcaoSelecionada('Resenha privada');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                    >
                      Resenha privada
                    </button>
                  </div>
                )}
              </div>

              <button
                data-testid="btn-salvar-avaliacao"
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full lg:w-auto px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold
                  ${
                    isSubmitting || !isValid
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-80 cursor-pointer'
                  }
              `}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar avaliação'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
