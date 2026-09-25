import z from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const aditionalDataSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome obrigatório')
    .max(120, 'Máximo de 120 caracteres'),
  email: z.email('E-mail inválido'),
  cpf: z.string().min(1),
  dataDeNascimento: z
    .string()
    .min(10, 'Data de nascimento no padão dd/mm/aaaa é obrigatória'),
  cidade: z
    .string()
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      'Cidade não deve conter números ou caracteres especiais'
    )
    .optional()
    .or(z.literal('')),
  estado: z
    .string()
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      'Estado não deve conter números ou caracteres especiais'
    )
    .optional()
    .or(z.literal('')),
  pais: z
    .string()
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      'País não deve conter números ou caracteres especiais'
    )
    .optional()
    .or(z.literal('')),

  fotoUrl: z.string().nullable().optional(),

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
    }, 'Apenas formatos .jpg, .jpeg e .png são suportados'),
});

export type AditionalDataFormDTO = z.input<typeof aditionalDataSchema>;
export type AditionalDataRequestDTO = z.infer<typeof aditionalDataSchema>;
