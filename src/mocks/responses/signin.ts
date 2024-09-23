import { HttpResponse } from 'msw'

export const Signin = {
	success: () => {
		return new HttpResponse(null, {
			status: 204,
			headers: {
				authorization: 'dawkldjawkljdwklajdkljawkldjawkl',
			},
		})
	},

	userNotFound: () => {
		const body = JSON.stringify({
			error: 'Not Found',
			message: 'User not found',
		})

		return new HttpResponse(body, {
			status: 404,
		})
	},

	passwordIncorrect: () => {
		const body = JSON.stringify({
			error: 'Unauthorized',
			message: 'password is incorrect',
		})

		return new HttpResponse(body, {
			status: 401,
		})
	},
}
