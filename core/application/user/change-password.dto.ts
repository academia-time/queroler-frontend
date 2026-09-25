import z from 'zod';

export const changePasswordSchema = z
  .object({
    senhaAtual: z
      .string()
      .nonempty('Senha Atual obrigatória')
      .min(8, 'Mínimo 8 caracteres'),
    senhaNova: z
      .string()
      .nonempty('Senha Nova obrigatória')
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
    confirmarSenhaNova: z.string().min(8, 'Confirmação obrigatória'),
  })
  .refine((data) => data.senhaNova === data.confirmarSenhaNova, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenhaNova'],
  });

export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;
