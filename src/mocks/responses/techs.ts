import { HttpResponse } from 'msw'

import db from '../database'

export const Techs = {
	getAll: () => {
		const techs = db.tech.getAll()
		return HttpResponse.json({ techs })
	},

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	create: (data: any) => {
		const level = db.level.findFirst({
			where: { id: { equals: Number(data.level_id) } },
		})

		const newTech = db.tech.create({ ...data, level })

		return HttpResponse.json({ tech: newTech }, { status: 201 })
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	update: (id: number, data: any) => {
		const level = db.level.findFirst({
			where: { id: { equals: Number(data.level_id) } },
		})

		const updatedTech = db.tech.update({
			where: {
				id: { equals: Number(id) },
			},
			data: {
				...data,
				level,
			},
		})

		return HttpResponse.json({ tech: updatedTech }, { status: 200 })
	},

	delete: (id: number) => {
		const tech = db.tech.delete({ where: { id: { equals: id } } })

		return HttpResponse.json({ tech }, { status: 200 })
	},
}
