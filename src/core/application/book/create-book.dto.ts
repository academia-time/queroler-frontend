import { IdiomaEnum } from '@/core/domain/book/language.enum';
import z from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const createBookSchema = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  isbn: z
    .string()
    .min(1, 'ISBN obrigatório')
    .max(17, 'Máximo de 17 caracteres')
    .transform((val) => val.replace(/\D/g, '')),
  editora: z.string().min(1, 'Editora obrigatória'),
  anoDePublicacao: z
    .string('Ano de publicação obrigatório')
    .min(1, 'Ano de publicação deve ter no mínimo 1 dígito')
    .max(4, 'Ano de publicação deve ter 4 dígitos'),
  numeroDePaginas: z.string('Número de páginas obrigatório'),
  idioma: z.enum(IdiomaEnum),
  sinopse: z.string().min(50, 'Sinopse deve ter 50 caracteres no mínimo'),
  autores: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() !== '') {
        return val
          .split(',')
          .map((nome) => ({ nome: nome.trim() }))
          .filter((obj) => obj.nome !== '');
      }
      return val;
    },
    z.array(
      z.object({
        nome: z.string(),
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

export type CreateBookDTO = z.infer<typeof createBookSchema>;
export type FindBookByIsbnDTO = z.infer<typeof findBookByIsbnSchema>;
