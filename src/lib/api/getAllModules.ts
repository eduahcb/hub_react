import { InternalServerError } from 'lib/errors'

import type { Module } from 'lib/types'

import { envs } from 'lib/constants'

export const fetchGetAllModules = async () => {
	const response = await fetch(`${envs.API_URL}/api/v1/modules`)

	if (!response.ok) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}

	const data = await response.json()

	const modules: Module[] = data.modules

	return modules
}
