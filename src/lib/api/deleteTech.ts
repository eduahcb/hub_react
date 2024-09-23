import type { Tech } from 'lib/types'

import { NotFound, InternalServerError } from 'lib/errors'
import { envs } from 'lib/constants'

export const fetchDeleteTech = async (
	id: number,
	{ token }: { token: string },
) => {
	const response = await fetch(`${envs.API_URL}/api/v1/techs/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok && response.status === 404) {
		throw new NotFound('Tech not found')
	}

	if (!response.ok) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}

	const data = await response.json()
	const tech: Tech = data.tech

	return tech
}
