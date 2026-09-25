import z from 'zod';

export const readingDiaryReviewSchema = z
  .object({
    nota: z
      .number()
      .min(0.5, 'Selecione uma avaliação')
      .max(5, 'A avaliação máxima é 5')
      .refine(
        (value) => Number.isInteger(value * 2),
        'A avaliação deve ser feita de 0,5 em 0,5'
      ),

    tituloDaResenha: z
      .string()
      .trim()
      .max(250, 'O título deve ter no máximo 250 caracteres'),

    resenha: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    const temTitulo = data.tituloDaResenha.length > 0;
    const temResenha = data.resenha.length > 0;

    if (temTitulo && !temResenha) {
      ctx.addIssue({
        code: 'custom',
        path: ['resenha'],
        message: 'A resenha deve ter no mínimo 100 caracteres',
      });

      return;
    }

    if (!temTitulo && temResenha) {
      ctx.addIssue({
        code: 'custom',
        path: ['tituloDaResenha'],
        message: 'Informe um título para a resenha',
      });
    }

    if (temTitulo && temResenha && data.resenha.length < 100) {
      ctx.addIssue({
        code: 'custom',
        path: ['resenha'],
        message: 'A resenha deve ter no mínimo 100 caracteres',
      });
    }
  });

export type ReadingDiaryReviewFormDTO = z.infer<
  typeof readingDiaryReviewSchema
>;
