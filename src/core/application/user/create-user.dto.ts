import z from 'zod';

export const createUserSchema = z
  .object({
    nome: z.string().min(1, 'Nome obrigatório'),
    email: z
      .string()
      .min(1, 'E-mail obrigatório')
      .max(256, 'Máximo de 256 caracteres')
      .email({ message: 'E-mail inválido' }),
    senha: z
      .string()
      .nonempty('Senha obrigatória')
      .min(8, 'Mínimo 8 caracteres')
      .refine((val) => /[A-Z]/.test(val), {
        message: 'A senha deve conter pelo menos uma letra maiúscula.',
      })
      .refine((val) => /[a-z]/.test(val), {
        message: 'A senha deve conter pelo menos uma letra minúscula.',
      })
      .refine((val) => /\d/.test(val), {
        message: 'A senha deve conter pelo menos um número.',
      })
      .refine((val) => /^.*[@$!%*?&.#_-].*$/.test(val), {
        message: 'A senha deve conter pelo menos um caractere especial.',
      }),
    confirmarSenha: z.string().min(8, 'Confirmação obrigatória'),
    cpf: z.string().min(11, 'CPF obrigatório').max(14, 'CPF inválido'),
    checkTermo: z.literal(true, { message: 'É necessário aceitar os termos' }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export type CreateUserDTO = z.infer<typeof createUserSchema>;
