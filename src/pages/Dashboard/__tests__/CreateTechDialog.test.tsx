import { render, screen } from '@testing-library/react'

import { setupServer } from 'msw/node'

import { createServerEndpoints, wrapper } from 'lib/utils/test-utils'

import { Dashboard } from '../Dashboard'

import userEvent from '@testing-library/user-event'

const navigate = vi.fn()

const server = setupServer()

const openCreateModal = async () => {
	render(<Dashboard navigate={navigate} />, {
		wrapper,
	})

	const createButton = await screen.findByRole('button', {
		name: /create new tech/i,
	})

	await userEvent.click(createButton)
}

describe('when is creating a new tech', () => {
	beforeAll(() => {
		server.listen()
	})

	beforeEach(() => {
		navigate.mockClear()
		server.resetHandlers()
	})

	afterAll(() => server.close())

	describe('when user does not fill in the fields', () => {
		beforeEach(() => {
			createServerEndpoints(server, [
				{ path: '/api/v1/me', method: 'get', response: {}, status: 200 },
				{
					path: '/api/v1/techs',
					method: 'get',
					response: { techs: [] },
					status: 200,
				},
				{
					path: '/api/v1/levels',
					method: 'get',
					response: { levels: [] },
					status: 200,
				},
			])
		})

		test('should show error message', async () => {
			await openCreateModal()

			const button = await screen.findByRole('button', {
				name: 'Cadastrar Tecnologia',
			})

			await userEvent.click(button)

			expect(
				await screen.findByText('o campo nome é obrigatório'),
			).toBeInTheDocument()

			expect(
				await screen.findByText('o campo status é obrigatório'),
			).toBeInTheDocument()
		})
	})

	describe('when user fills in the fields', () => {
		beforeEach(() => {
			createServerEndpoints(server, [
				{ path: '/api/v1/me', method: 'get', response: {}, status: 200 },
				{
					path: '/api/v1/techs',
					method: 'get',
					response: { techs: [] },
					status: 200,
				},
				{
					path: '/api/v1/levels',
					method: 'get',
					response: { levels: [{ id: 1, name: 'Iniciante' }] },
					status: 200,
				},
				{
					path: '/api/v1/techs',
					method: 'post',
					response: {
						tech: {
							id: 1,
							name: 'remix',
							level: { id: 1, name: 'Iniciante' },
						},
					},
					status: 201,
				},
			])
		})

		test('should create a new tech', async () => {
			await openCreateModal()

			const nameInput = await screen.findByPlaceholderText('nome')
			await userEvent.type(nameInput, 'svelte')

			const statusInput = await screen.findByRole('checkbox')
			await userEvent.click(statusInput)

			const selectedStatus = await screen.findByRole('radio', {
				description: 'Iniciante',
			})
			await userEvent.click(selectedStatus)

			const button = await screen.findByRole('button', {
				name: 'Cadastrar Tecnologia',
			})
			await userEvent.click(button)

			expect(await screen.findByText('remix')).toBeInTheDocument()
		})
	})
})
