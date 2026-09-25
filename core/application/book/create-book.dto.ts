import { IdiomaEnum } from '@/core/domain/book/language.enum';
import z from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const anoAtual = new Date().getFullYear();

export const createBookSchema = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  isbn: z
    .string()
    .min(1, 'ISBN obrigatório')
    .max(13, 'O ISBN não deve ter 10 ou 13 dígitos')
    .regex(
      /^\d+$/,
      'O ISBN deve conter apenas números (sem letras ou caracteres especiais)'
    )
    .refine((val) => val.length === 10 || val.length === 13, {
      message: 'O ISBN deve ter exatamente 10 ou 13 dígitos',
    }),
  editora: z.string().min(1, 'Editora obrigatória'),
  anoDePublicacao: z
    .string('Ano de publicação obrigatório')
    .length(4, 'Ano de publicação deve ter exatamente 4 números')
    .regex(/^\d+$/, 'O ano de publicação deve conter apenas números')
    .transform((val) => Number(val))
    .refine((ano) => ano <= anoAtual, {
      message: `O ano de publicação não pode ser maior que o ano atual (${anoAtual})`,
    })
    .transform((val) => String(val)),
  numeroDePaginas: z.coerce
    .number('Número de páginas deve ter apenas números')
    .positive('O número de páginas deve ser maior que 0'),
  idioma: z.enum(IdiomaEnum),
  sinopse: z.string().min(50, 'Sinopse deve ter 50 caracteres no mínimo'),
  autores: z
    .union([
      z
        .string()
        .min(1, 'Autores é obrigatório')
        .regex(
          /^[A-Za-zÀ-ÖØ-öø-ÿ\s,]+$/,
          'O campo não deve conter números ou caracteres especiais (exceto vírgula)'
        ),
      z.array(z.object({ nome: z.string() })),
    ])
    .transform((val) => {
      if (typeof val === 'string') {
        if (!val.trim()) return [];

        return val
          .split(',')
          .map((nome) => ({ nome: nome.trim() }))
          .filter((obj) => obj.nome !== '');
      }
      return val;
    })
    .pipe(
      z.array(
        z.object({
          nome: z.string().min(1, 'Nome do autor não pode ser vazio'),
        })
      )
    ),
  imagem: z
    .any()
    .optional()
    .refine((file) => {
      if (file && file instanceof File) {
        return file.size <= MAX_FILE_SIZE;
      }
      return true;
    }, 'Tamanho máximo de 10MB permitido')
    .refine((file) => {
      if (file && file instanceof File) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
      return true;
    }, 'Apenas formatos .jpg, .jpeg, e .png são suportados'),
});

export const findBookByIsbnSchema = createBookSchema.omit({
  titulo: true,
  editora: true,
  anoDePublicacao: true,
  numeroDePaginas: true,
  idioma: true,
  sinopse: true,
  autores: true,
  imagem: true,
});

export type CreateBookDTO = z.input<typeof createBookSchema>;
export type CreateBookRequestDTO = z.infer<typeof createBookSchema>;
export type FindBookByIsbnDTO = z.infer<typeof findBookByIsbnSchema>;
