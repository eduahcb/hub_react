import { envs } from 'lib/constants'
import { InternalServerError } from 'lib/errors'
import type { User } from 'lib/types'

export const fetchUser = async ({ token }: { token: string }) => {
	const response = await fetch(`${envs.API_URL}/api/v1/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}

	const data = await response.json()

	const user: User = data

	return user
}
