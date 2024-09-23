import { HttpResponse, http } from 'msw'

import { Signin } from './responses/signin'
import { Modules } from './responses/modules'
import { Signup } from './responses/signup'
import { Techs } from './responses/techs'
import { Levels } from './responses/levels'

export const handlers = [
	http.get('/api/v1/me', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		return HttpResponse.json({
			id: 1,
			name: 'Crispim',
			bio: '',
			contact: '',
			module: {
				id: 1,
				name: '1 - Introdução ao frontend',
			},
		})
	}),
	http.post('/api/v1/signin', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		// return Signin.userNotFound()
		// return Signin.passwordIncorrect()
		return Signin.success()
	}),
	http.post('/api/v1/signup', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		// return Signup.internalError()
		// return Signup.emailAlready()
		return Signup.success()
	}),
	http.get('/api/v1/signout', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		return new HttpResponse(null, { status: 204 })
	}),
	http.get('/api/v1/modules', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		return Modules.success()
	}),
	http.get('/api/v1/levels', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		return Levels.success()
	}),
	http.get('/api/v1/techs', async () => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		return Techs.getAll()
	}),

	http.post('/api/v1/techs', async ({ request }) => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		const body = await request.json()

		return Techs.create(body)
	}),

	http.put('/api/v1/techs/:id', async ({ params, request }) => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		const body = await request.json()

		return Techs.update(Number(params.id), body)
	}),

	http.delete('/api/v1/techs/:id', async ({ params }) => {
		await new Promise((resolve) => setTimeout(resolve, 500))

		return Techs.delete(Number(params.id))
	}),
]
