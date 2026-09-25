import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  createReadingTrackingSchema,
  CreateReadingTrackingFormDTO,
} from '@/core/application/diary/create-reading-tracking.dto';

export function useReadingDiaryTrackingForm(numeroDePaginas: number) {
  return useForm<CreateReadingTrackingFormDTO>({
    resolver: zodResolver(createReadingTrackingSchema(numeroDePaginas)),
    defaultValues: {
      pagina: undefined,
      comentario: '',
    },
    mode: 'onChange',
  });
}
