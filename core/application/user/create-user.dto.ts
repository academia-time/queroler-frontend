import z from 'zod';

export const createUserSchema = z
  .object({
    nome: z
      .string('Nome obrigatório')
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(80, 'Nome deve ter no máximo 80 caracteres')
      .regex(
        /^[a-zA-ZÀ-ÿ\s'-]+$/,
        'O nome não deve conter números ou caracteres especiais'
      ),
    email: z
      .string()
      .min(1, 'E-mail obrigatório')
      .max(256, 'Máximo de 256 caracteres')
      .email({ message: 'E-mail inválido' }),
    confirmarEmail: z
      .string()
      .min(1, 'Confirmação de e-mail obrigatória')
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
    cpf: z
      .string()
      .min(1, 'CPF obrigatório')
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF incompleto ou inválido'),
    dataDeNascimento: z.iso.date({ error: 'Data inválida' }).refine(
      (val) => {
        const apenasData = val.split('T')[0];

        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate() - 1).padStart(2, '0');
        const dataAtualLocal = `${ano}-${mes}-${dia}`;

        return apenasData <= dataAtualLocal;
      },
      {
        message: 'A data não pode ser igual ou maior que a data atual.',
      }
    ),
    checkTermo: z.boolean().refine((val) => val === true, {
      message: 'É necessário aceitar os termos',
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  })
  .refine((data) => data.email === data.confirmarEmail, {
    message: 'Os e-mails não coincidem',
    path: ['confirmarEmail'],
  });

export type CreateUserDTO = z.infer<typeof createUserSchema>;
