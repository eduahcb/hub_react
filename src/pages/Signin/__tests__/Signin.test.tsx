import { HttpResponse, http } from 'msw'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import { wrapper } from 'lib/utils/test-utils'

import { Signin } from '../Signin'

const server = setupServer(
	...[
		http.post('/api/v1/signin', () => {
			return new HttpResponse(null, {
				status: 204,
				headers: {
					Authorization: 'dakjldwakljdwkla',
				},
			})
		}),
	],
)

const navigate = vi.fn()

describe('Signin page', () => {
	userEvent.setup()

	beforeAll(() => server.listen())

	beforeEach(() => {
		server.resetHandlers()
		navigate.mockClear()
	})

	afterAll(() => server.close())

	describe('validation', () => {
		test('should show error message when email is invalid', async () => {
			render(<Signin navigate={navigate} />, { wrapper })

			const emailInput = await screen.findByPlaceholderText('email')

			await userEvent.type(emailInput, 'invalid-email')

			const loginButton = await screen.findByRole('button', { name: 'Entrar' })
			userEvent.click(loginButton)

			const errorMessage = await screen.findByText(
				'o campo email tem que ser um email válido',
			)

			expect(errorMessage).toBeInTheDocument()
		})

		test('should show error message when email is empty', async () => {
			render(<Signin navigate={navigate} />, { wrapper })

			const loginButton = await screen.findByRole('button', { name: 'Entrar' })
			await userEvent.click(loginButton)

			const errorMessage = await screen.findByText(
				'o campo email é obrigatório',
			)
			expect(errorMessage).toBeInTheDocument()
		})

		test('should show error message when password is empty', async () => {
			render(<Signin navigate={navigate} />, { wrapper })

			const loginButton = await screen.findByRole('button', { name: 'Entrar' })
			userEvent.click(loginButton)

			const errorMessage = await screen.findByText(
				'o campo senha é obrigatório',
			)

			expect(errorMessage).toBeInTheDocument()
		})

		test('should call navigate when form is valid', async () => {
			render(<Signin navigate={navigate} />, { wrapper })

			const emailInput = await screen.findByPlaceholderText('email')
			const passwordInput = await screen.findByPlaceholderText('senha')

			await userEvent.type(emailInput, 'cleitin@test.com')
			await userEvent.type(passwordInput, '12345678')

			const loginButton = await screen.findByRole('button', { name: 'Entrar' })
			await userEvent.click(loginButton)

			await waitFor(async () => {
				expect(navigate).toHaveBeenCalledWith('/dashboard')
			})
		})
	})

	describe('redirct', () => {
		test('should redirect to signup url', async () => {
			render(<Signin navigate={navigate} />, { wrapper })

			const singupButton = await screen.findByRole('button', {
				name: 'Cadastre-se',
			})

			await userEvent.click(singupButton)

			expect(navigate).toHaveBeenCalledWith('/signup')
		})
	})
})
