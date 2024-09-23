import { z } from 'zod'

export const signinForm = z.object({
  email: z
    .string()
    .min(1, 'o campo email é obrigatório')
    .email({ message: 'o campo email tem que ser um email válido' }),
  password: z.string().min(1, 'o campo senha é obrigatório'),
})
