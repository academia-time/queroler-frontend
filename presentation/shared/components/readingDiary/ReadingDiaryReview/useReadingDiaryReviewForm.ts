import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  readingDiaryReviewSchema,
  ReadingDiaryReviewFormDTO,
} from '@/core/application/diary/reading-diary-review.schema';

interface UseReadingDiaryReviewFormProps {
  nota: number;
  tituloDaResenha: string;
  resenha: string;
}

export function useReadingDiaryReviewForm({
  nota,
  tituloDaResenha,
  resenha,
}: UseReadingDiaryReviewFormProps) {
  return useForm<ReadingDiaryReviewFormDTO>({
    resolver: zodResolver(readingDiaryReviewSchema),
    defaultValues: {
      nota,
      tituloDaResenha,
      resenha,
    },
    mode: 'onChange',
  });
}
