import { InternalServerError, NotFound, Unauthorized } from 'lib/errors'
import type { SigninForm } from 'lib/types'

import { envs } from 'lib/constants'

export const fetchSignin = async (signinForm: SigninForm) => {
	const response = await fetch(`${envs.API_URL}/api/v1/signin`, {
		method: 'POST',
		body: JSON.stringify(signinForm),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok && response.status === 404) {
		throw new NotFound('Email not found')
	}

	if (!response.ok && response.status === 401) {
		throw new Unauthorized('Password is incorrect')
	}

	if (!response.ok) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}

	const token = response.headers.get('Authorization') ?? ''

	if (!token) {
		throw new InternalServerError('ooops!!! something went wrong!')
	}

	return token
}
