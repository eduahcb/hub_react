import { HttpResponse } from 'msw'

import db from '../database'

export const Modules = {
	success: () => {
		// Modules
		db.module.create({
			id: 1,
			name: '1 - Iniciando no frontend',
		})

		db.module.create({
			id: 2,
			name: '2 - Iniciando no backend',
		})

		return HttpResponse.json({ modules: db.module.getAll() })
	},
}
