import z from 'zod';

export const readingDiaryTimelineSchema = z
  .object({
    inicioDaLeitura: z.string().min(1, 'Data de início obrigatória'),

    terminoDaLeitura: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.terminoDaLeitura) {
        return true;
      }

      return data.terminoDaLeitura >= data.inicioDaLeitura;
    },
    {
      message: 'A data de término não pode ser anterior à data de início',
      path: ['terminoDaLeitura'],
    }
  );

export type ReadingDiaryTimelineFormDTO = z.infer<
  typeof readingDiaryTimelineSchema
>;
