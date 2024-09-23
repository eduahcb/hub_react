import { HttpResponse, http } from 'msw'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import { wrapper } from 'lib/utils/test-utils'

import { Signup } from '../Signup'

const server = setupServer(
	...[
		http.get('/api/v1/modules', () => {
			return HttpResponse.json({ modules: [] })
		}),
	],
)
const navigate = vi.fn()

describe('Signup page', () => {
	userEvent.setup()

	beforeAll(() => server.listen())

	beforeEach(() => {
		navigate.mockClear()
	})

	afterEach(() => server.resetHandlers())

	afterAll(() => {
		server.close()
	})

	describe('validation', () => {
		test('should show error message when name is empty', async () => {
			render(<Signup navigate={navigate} />, { wrapper })

			const button = await screen.findByRole('button', { name: 'Cadastrar' })
			await userEvent.click(button)

			expect(
				await screen.findByText('o campo nome é obrigatório'),
			).toBeInTheDocument()
		})

		test('should show error message when email is empty', async () => {
			render(<Signup navigate={navigate} />, { wrapper })

			const button = await screen.findByRole('button', { name: 'Cadastrar' })
			await userEvent.click(button)

			expect(
				await screen.findByText('o campo email é obrigatório'),
			).toBeInTheDocument()
		})

		test('should show error messag when password is less than 8 characters', async () => {
			render(<Signup navigate={navigate} />, { wrapper })

			const button = await screen.findByRole('button', { name: 'Cadastrar' })
			await userEvent.click(button)

			expect(
				await screen.findByText(
					'o campo senha tem que ter no mínimo 8 caracteres',
				),
			).toBeInTheDocument()
		})

		test('should show error message when confirm_password is different from password', async () => {
			render(<Signup navigate={navigate} />, { wrapper })

			const password = await screen.findByPlaceholderText(
				'Digite aqui sua senha',
			)
			const confirm_password = await screen.findByPlaceholderText(
				'Digite novamente sua senha',
			)

			await userEvent.type(password, '12345678')
			await userEvent.type(confirm_password, '12345679')

			const button = await screen.findByRole('button', { name: 'Cadastrar' })
			await userEvent.click(button)

			expect(
				await screen.findByText('as senhas não são iguais'),
			).toBeInTheDocument()
		})

		test('should show error message when module_id is empty', async () => {
			render(<Signup navigate={navigate} />, { wrapper })

			const button = await screen.findByRole('button', { name: 'Cadastrar' })
			await userEvent.click(button)

			expect(
				await screen.findByText('o campo módulo é obrigatório'),
			).toBeInTheDocument()
		})
	})
})
