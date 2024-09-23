import { InternalServerError } from 'lib/errors'

import { envs } from 'lib/constants'
export const fetchSignout = async ({ token }: { token: string }) => {
	const response = await fetch(`${envs.API_URL}/api/v1/signout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}
}
