import { z } from 'zod'

export const techForm = z.object({
  name: z.string().min(1, 'o campo nome é obrigatório'),
  level_id: z.coerce.number().gt(0, 'o campo status é obrigatório'),
})
