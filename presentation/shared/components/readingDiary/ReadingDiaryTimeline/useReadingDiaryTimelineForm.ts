import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  readingDiaryTimelineSchema,
  ReadingDiaryTimelineFormDTO,
} from '@/core/application/diary/reading-diary-timeline.schema';

interface UseReadingDiaryTimelineFormProps {
  inicioDaLeitura: string;
  terminoDaLeitura: string;
}

export function useReadingDiaryTimelineForm({
  inicioDaLeitura,
  terminoDaLeitura,
}: UseReadingDiaryTimelineFormProps) {
  return useForm<ReadingDiaryTimelineFormDTO>({
    resolver: zodResolver(readingDiaryTimelineSchema),

    defaultValues: {
      inicioDaLeitura,
      terminoDaLeitura,
    },

    mode: 'onChange',
  });
}
