import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { useSigninMutations } from '../hooks/useSigninMutations'

import { wrapper } from 'lib/utils/test-utils'

const navigate = vi.fn()
const setError = vi.fn()
const createSession = vi.fn()

const mockResponse = (response: () => HttpResponse) => {
	return [
		http.post('/api/v1/signin', () => {
			return response()
		}),
	]
}

const server = setupServer()

describe('useSigninService', () => {
	beforeAll(() => {
		server.listen()
	})

	beforeEach(() => {
		server.resetHandlers()
	})

	afterAll(() => {
		server.close()
	})

	test('should redirect to dashboard', async () => {
		const response = () =>
			new HttpResponse(null, {
				status: 204,
				headers: {
					authorization: 'dawkldjawkljdwklajdkljawkldjawkl',
				},
			})

		server.use(...mockResponse(response))

		const { result } = renderHook(
			() => useSigninMutations({ navigate, setError, createSession }),
			{
				wrapper,
			},
		)
		result.current.signin.mutate({ email: '', password: '' })

		await waitFor(() => expect(navigate).toHaveBeenCalledWith('/dashboard'))
	})

	test('should return a error when user is not found', async () => {
		const body = JSON.stringify({
			error: 'Not Found',
			message: 'User not found',
		})

		const response = () =>
			new HttpResponse(body, {
				status: 404,
			})

		server.use(...mockResponse(response))

		const { result } = renderHook(
			() => useSigninMutations({ navigate, setError, createSession }),
			{
				wrapper,
			},
		)
		result.current.signin.mutate({ email: '', password: '' })

		await waitFor(() =>
			expect(setError).toHaveBeenCalledWith('email', {
				message: 'email não encontrado',
				type: 'manual',
			}),
		)
	})

	test('should return a error when password is invalid', async () => {
		const body = JSON.stringify({
			error: 'Unauthorized',
			message: 'password is incorrect',
		})

		const response = () =>
			new HttpResponse(body, {
				status: 401,
			})

		server.use(...mockResponse(response))

		const { result } = renderHook(
			() => useSigninMutations({ navigate, setError, createSession }),
			{
				wrapper,
			},
		)

		result.current.signin.mutate({ email: '', password: '' })

		await waitFor(() =>
			expect(setError).toHaveBeenCalledWith('password', {
				message: 'senha incorreta',
				type: 'manual',
			}),
		)
	})
})
