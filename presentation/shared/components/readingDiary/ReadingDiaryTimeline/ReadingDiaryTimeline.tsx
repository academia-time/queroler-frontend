'use client';

import { toast } from 'react-toastify';
import { Input, FieldError } from '@/presentation/shared/components';
import { useReadingDiaryTimelineForm } from '@/presentation/shared/components/readingDiary/ReadingDiaryTimeline/useReadingDiaryTimelineForm';
import { createReadingDiaryAction } from '@/app/actions/createReadingDiary.actions';
import { updateReadingDiaryAction } from '@/app/actions/updateReadingDiary.actions';
import { formatReadingDiaryDateToApi } from '@/core/application/diary/reading-diary-date.mapper';
import { ReadingDiaryTimelineFormDTO } from '@/core/application/diary/reading-diary-timeline.schema';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ReadingDiaryTimelineProps {
  diarioId?: number;
  livroId: number;
  inicioDaLeitura?: string | null;
  terminoDaLeitura?: string | null;
  onDiarioSalvo: () => Promise<void>;
}

function formatarDataParaInput(data?: string | null): string {
  if (!data) return '';

  const [dataParte] = data.split(' ');

  if (!dataParte) return '';

  const [dia, mes, ano] = dataParte.split('/');

  if (!dia || !mes || !ano) return '';

  return `${ano}-${mes}-${dia}`;
}

export function ReadingDiaryTimeline({
  livroId,
  diarioId,
  inicioDaLeitura,
  terminoDaLeitura,
  onDiarioSalvo,
}: ReadingDiaryTimelineProps) {
  const dataInicio = formatarDataParaInput(inicioDaLeitura);
  const dataTermino = formatarDataParaInput(terminoDaLeitura);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useReadingDiaryTimelineForm({
    inicioDaLeitura: dataInicio,
    terminoDaLeitura: dataTermino,
  });

  const inicioJaSalvo = !!inicioDaLeitura;
  const terminoJaSalvo = !!terminoDaLeitura;

  const diarioFinalizado = inicioJaSalvo && terminoJaSalvo;

  const router = useRouter();

  useEffect(() => {
    reset({
      inicioDaLeitura: dataInicio,
      terminoDaLeitura: dataTermino,
    });
  }, [dataInicio, dataTermino, reset]);

  const handleSalvar = async (data: ReadingDiaryTimelineFormDTO) => {
    if (!diarioId) {
      const result = await createReadingDiaryAction({
        livroId,

        inicioDaLeitura: formatReadingDiaryDateToApi(data.inicioDaLeitura),

        ...(data.terminoDaLeitura && {
          terminoDaLeitura: formatReadingDiaryDateToApi(data.terminoDaLeitura),
        }),
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      await onDiarioSalvo();

      return;
    }

    if (inicioJaSalvo && !terminoJaSalvo && data.terminoDaLeitura) {
      const result = await updateReadingDiaryAction(diarioId, {
        terminoDaLeitura: formatReadingDiaryDateToApi(data.terminoDaLeitura),
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      await onDiarioSalvo();
    }
  };

  return (
    <div className="py-5 lg:py-8">
      <form
        onSubmit={handleSubmit(handleSalvar)}
        noValidate
        className="bg-secondary-bg border border-border rounded-md p-3"
      >
        <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
          Cronologia de Leitura
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-text-primary text-xs">
              Data de início <span className="text-brand">*</span>
            </label>

            <Input
              id="dataDeInicio"
              type="date"
              {...register('inicioDaLeitura')}
              disabled={inicioJaSalvo}
              dataTestId="input-data-inicio"
              className="text-xs text-text-primary uppercase w-full"
            />

            <FieldError message={errors.inicioDaLeitura?.message} />
          </div>

          <div>
            <label className="text-text-primary text-xs">Data de término</label>

            <Input
              id="dataDeTermino"
              type="date"
              {...register('terminoDaLeitura')}
              disabled={terminoJaSalvo}
              dataTestId="input-data-termino"
              className="text-xs text-text-primary uppercase w-full"
            />

            <FieldError message={errors.terminoDaLeitura?.message} />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-2">
          <button
            type="button"
            data-testid="btn-cancelar"
            onClick={() => router.back()}
            className="px-10 py-3 text-xs text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-dark-purple font-bold cursor-pointer"
          >
            Cancelar
          </button>

          <button
            data-testid="btn-salvar"
            type="submit"
            disabled={diarioFinalizado || isSubmitting || !isValid || !isDirty}
            className={`px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold
    ${
      diarioFinalizado || isSubmitting || !isValid || !isDirty
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:opacity-80 cursor-pointer'
    }
  `}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
