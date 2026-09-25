'use client';

import { NotebookPen } from 'lucide-react';
import { LoadReadingDiaryTrackingResponseDTO } from '@/core/application/diary/load-reading-diary-response.dto';
import { toast } from 'react-toastify';
import { createReadingTrackingAction } from '@/app/actions/createReadingTracking.actions';
import { useReadingDiaryTrackingForm } from '@/presentation/shared/components/readingDiary/ReadingDiaryTracking/useReadingDiaryTrackingForm';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';
import { CreateReadingTrackingFormDTO } from '@/core/application/diary/create-reading-tracking.dto';

export interface ReadingDiaryTrackingProps {
  diarioId: number;
  numeroDePaginas: number;
  acompanhamentos: LoadReadingDiaryTrackingResponseDTO[];
  onRegistroSalvo: () => Promise<void>;
}

export function ReadingDiaryTracking({
  diarioId,
  numeroDePaginas,
  acompanhamentos,
  onRegistroSalvo,
}: ReadingDiaryTrackingProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useReadingDiaryTrackingForm(numeroDePaginas);

  const handleSalvarRegistro = async (data: CreateReadingTrackingFormDTO) => {
    const result = await createReadingTrackingAction(diarioId, {
      //Necessário alterar após ajustes serem feitos no backend referente a forma como recebe as paginas lidas
      paginaInicial: data.pagina - 1,
      paginaFinal: data.pagina,
      comentario: data.comentario,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    reset();

    await onRegistroSalvo();
  };

  return (
    <div className="bg-secondary-bg border border-border rounded-md p-3">
      <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-5">
        <NotebookPen size={14} /> Acompanhamento de Leitura
      </h2>

      <form onSubmit={handleSubmit(handleSalvarRegistro)} noValidate>
        <div className="flex-1 flex flex-col gap-1 pb-3">
          <label className="text-text-primary text-xs">
            Páginas lidas<span className="text-brand">*</span>
          </label>

          <input
            data-testid="input-paginas"
            type="number"
            min={1}
            max={numeroDePaginas}
            {...register('pagina', {
              valueAsNumber: true,
            })}
            className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-3 text-text-primary text-xs"
            placeholder={`1-${numeroDePaginas}`}
            id="numero-paginas-lidas"
            aria-invalid={!!errors.pagina}
          />

          <FieldError message={errors.pagina?.message} />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-text-primary text-xs">Comentários</label>

          <textarea
            data-testid="input-comentarios"
            {...register('comentario')}
            placeholder="Suas anotações privadas sobre esta seção de leitura"
            rows={6}
            className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-2 text-text-primary text-xs outline-none resize-none"
            id="comentarios"
            aria-invalid={!!errors.comentario}
          />
          <FieldError message={errors.comentario?.message} />
        </div>

        <div className="flex justify-end gap-4 py-4">
          <button
            data-testid="btn-salvar-registro"
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold
    ${
      isSubmitting || !isValid
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:opacity-80 cursor-pointer'
    }
  `}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar registro'}
          </button>
        </div>
      </form>
      <div className="h-px bg-border" />

      <div>
        <h1 className="text-text-primary text-xs py-4">Histórico</h1>

        {acompanhamentos.map((acompanhamento) => (
          <div
            key={acompanhamento.id}
            className="bg-secondary-bg border border-border rounded-md p-3 mb-3"
          >
            <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
              <NotebookPen size={16} />
              {acompanhamento.paginaFinal} páginas lidas
            </h2>

            <div className="pt-3 pb-8">
              <div className="bg-black border border-border rounded-md p-3">
                <p className="flex items-center gap-2 text-text-primary/50 text-sm lg:text-md font-thin">
                  {acompanhamento.comentario}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
