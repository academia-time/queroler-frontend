import z from 'zod';

export const createReadingTrackingSchema = (numeroDePaginas: number) =>
  z.object({
    pagina: z
      .number({
        message: 'Informe uma página válida',
      })
      .min(1, 'O numero de páginas lidas deve ser maior que 0')
      .max(
        numeroDePaginas,
        `O numero de páginas lidas não pode ser maior que ${numeroDePaginas}`
      ),

    comentario: z.string().trim().min(1, 'O campo comentário é obrigatório'),
  });

export type CreateReadingTrackingFormDTO = z.infer<
  ReturnType<typeof createReadingTrackingSchema>
>;

export interface CreateReadingTrackingDTO {
  paginaInicial: number;
  paginaFinal: number;
  comentario: string;
}
