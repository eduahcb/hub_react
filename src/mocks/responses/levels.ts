import { HttpResponse } from 'msw'

import db from '../database'

export const Levels = {
	success: () => {
		// Levels
		db.level.create({
			id: 1,
			name: 'Iniciante',
		})

		db.level.create({
			id: 2,
			name: 'Intermediário',
		})

		db.level.create({
			id: 3,
			name: 'Avançado',
		})

		return HttpResponse.json({ levels: db.level.getAll() })
	},
}
