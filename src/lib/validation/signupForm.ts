import { z } from 'zod'

export const signupForm = z
  .object({
    name: z
      .string()
      .min(1, 'o campo nome é obrigatório')
      .max(50, 'o campo nome tem que ter no máximo 50 caracteres'),
    email: z
      .string()
      .min(1, 'o campo email é obrigatório')
      .email({ message: 'o campo email tem que ser um email válido' }),
    password: z
      .string()
      .min(8, 'o campo senha tem que ter no mínimo 8 caracteres'),
    confirm_password: z
      .string()
      .min(1, 'o campo confirmar senha é obrigatório'),
    bio: z.string().optional(),
    contact: z.string().optional(),
    module_id: z.coerce.number().gt(0, 'o campo módulo é obrigatório'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'as senhas não são iguais',
    path: ['confirm_password'],
  })
