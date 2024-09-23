import type { Level } from 'lib/types'

import { envs } from 'lib/constants'

export const fetchGetAllLevels = async () => {
	const response = await fetch(`${envs.API_URL}/api/v1/levels`)

	if (!response.ok) {
		throw new Error('ooops!!! something went wrong!')
	}

	const data = await response.json()

	const levels: Level[] = data.levels

	return levels
}
