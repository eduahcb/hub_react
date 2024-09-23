vi.mock('sonner', () => ({
	toast: {
		error: vi.fn(),
		success: vi.fn(),
	},
}))

import { http, HttpResponse } from 'msw'
import { wrapper } from 'lib/utils/test-utils'

import { renderHook, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { useSignupMutations } from '../hooks/useSignupMutations'

const navigate = vi.fn()
const setError = vi.fn()
const createSession = vi.fn()

const mockResponse = (response: () => HttpResponse) => {
	return [
		http.get('/api/v1/modules', () => {
			return HttpResponse.json({ modules: [] })
		}),

		http.post('/api/v1/signup', () => {
			return response()
		}),
	]
}

import { toast } from 'sonner'

const server = setupServer()

describe('useSignupMutations', () => {
	beforeAll(() => server.listen())

	beforeEach(() => {
		server.resetHandlers()
	})

	afterAll(() => server.close())

	test('should redirect to /dashboard when signup is successful', async () => {
		const response = () =>
			new HttpResponse(null, {
				status: 204,
				headers: {
					authorization: 'dawkldjawkljdwklajdkljawkldjawkl',
				},
			})

		server.use(...mockResponse(response))

		const { result } = renderHook(
			() => useSignupMutations({ navigate, setError, createSession }),
			{
				wrapper,
			},
		)

		result.current.signup.mutate({
			name: 'Crispim',
			email: 'crispim@test.com',
			password: '12345678',
			confirm_password: '12345678',
			module_id: 1,
		})

		await waitFor(async () =>
			expect(navigate).toHaveBeenCalledWith('/dashboard'),
		)
	})

	test('should call setError when email already exists', async () => {
		const body = JSON.stringify({
			error: 'Bad Request',
			message: 'email already exists',
		})

		const response = () =>
			new HttpResponse(body, {
				status: 400,
			})

		server.use(...mockResponse(response))

		const { result } = renderHook(
			() => useSignupMutations({ navigate, setError, createSession }),
			{
				wrapper,
			},
		)

		result.current.signup.mutate({
			name: 'Crispim',
			email: 'crispim@test.com',
			password: '12345678',
			confirm_password: '12345678',
			module_id: 1,
		})

		await waitFor(async () =>
			expect(setError).toHaveBeenCalledWith('email', {
				type: 'manual',
				message: 'email já cadastrado',
			}),
		)
	})

	test('should call toast.error when there is a server error', async () => {
		const body = JSON.stringify({
			error: 'Internal Server',
			message: 'oops!! something went wrong',
		})

		const response = () =>
			new HttpResponse(body, {
				status: 500,
			})

		server.use(...mockResponse(response))

		const { result } = renderHook(
			() => useSignupMutations({ navigate, setError, createSession }),
			{
				wrapper,
			},
		)

		result.current.signup.mutate({
			name: 'Crispim',
			email: 'crispim@test.com',
			password: '12345678',
			confirm_password: '12345678',
			module_id: 1,
		})

		await waitFor(async () =>
			expect(toast.error).toHaveBeenCalledWith('Ops! Algo deu errado', {
				position: 'top-right',
				duration: 2000,
			}),
		)
	})
})
