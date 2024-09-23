import { BadRequest, InternalServerError } from 'lib/errors'
import type { SignupForm } from 'lib/types'

import { envs } from 'lib/constants'
export const fetchSignup = async (signupForm: SignupForm) => {
	const response = await fetch(`${envs.API_URL}/api/v1/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(signupForm),
	})

	if (!response.ok && response.status === 400) {
		throw new BadRequest('email already exits')
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
