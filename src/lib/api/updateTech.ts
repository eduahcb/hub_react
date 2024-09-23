import { NotFound, InternalServerError } from 'lib/errors'
import type { Tech, TechForm } from 'lib/types'

import { envs } from 'lib/constants'
export const fetchUpdateTech = async (
	{ id, tech }: { id: number; tech: TechForm },
	{ token }: { token: string },
) => {
	const response = await fetch(`${envs.API_URL}/api/v1/techs/${id}`, {
		method: 'PUT',
		body: JSON.stringify(tech),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok && response.status === 404) {
		throw new NotFound('Level not found')
	}

	if (!response.ok) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}

	const data = await response.json()
	const newTech: Tech = data.tech

	return newTech
}
