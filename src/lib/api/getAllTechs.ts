import type { Tech } from 'lib/types'

import { envs } from 'lib/constants'

export const fetchGetAllTechs = async ({ token }: { token: string }) => {
	const response = await fetch(`${envs.API_URL}/api/v1/techs`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error('ooops!!! something went wrong!')
	}

	const data = await response.json()

	const techs: Tech[] = data.techs

	return techs
}
