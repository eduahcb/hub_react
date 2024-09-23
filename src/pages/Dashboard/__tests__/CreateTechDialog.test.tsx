import { render, screen } from '@testing-library/react'

import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

import { wrapper } from 'lib/utils/test-utils'

import { Dashboard } from '../Dashboard'

import userEvent from '@testing-library/user-event'

const navigate = vi.fn()

const mockProfile = () => {
	return http.get('/api/v1/me', () => {
		return HttpResponse.json({
			id: 1,
			name: 'Crispim',
			module: {
				id: 1,
				name: 'Módulo 1',
			},
		})
	})
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const mockTechsQueries = (response: any) => {
	return http.get('/api/v1/techs', () => {
		return HttpResponse.json(response)
	})
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const mockLevelsQueries = (response: any) => {
	return http.get('/api/v1/levels', () => {
		return HttpResponse.json(response)
	})
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const mockCreateTechMutation = (response: any) => {
	return http.post('/api/v1/techs', async () => {
		return HttpResponse.json(response, { status: 201 })
	})
}

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

	afterEach(() => server.resetHandlers())

	afterAll(() => server.close())

	describe('validation', () => {
		test('should show error message when tech is empty', async () => {
			const endpoints = [
				mockProfile(),
				mockLevelsQueries({ levels: [] }),
				mockTechsQueries({ techs: [] }),
			]
			server.use(...endpoints)

			await openCreateModal()

			const button = await screen.findByRole('button', {
				name: 'Cadastrar Tecnologia',
			})

			await userEvent.click(button)

			expect(
				await screen.findByText('o campo nome é obrigatório'),
			).toBeInTheDocument()
		})

		test('should show error message when level is empty', async () => {
			const endpoints = [
				mockProfile(),
				mockLevelsQueries({ levels: [] }),
				mockTechsQueries({ techs: [] }),
			]
			server.use(...endpoints)

			await openCreateModal()

			const button = await screen.findByRole('button', {
				name: 'Cadastrar Tecnologia',
			})

			await userEvent.click(button)

			expect(
				await screen.findByText('o campo status é obrigatório'),
			).toBeInTheDocument()
		})
	})

	describe('success', () => {
		test('should create a new tech', async () => {
			const endpoints = [
				mockProfile(),
				mockTechsQueries({ techs: [] }),
				mockLevelsQueries({ levels: [{ id: 1, name: 'Iniciante' }] }),
				mockCreateTechMutation({
					tech: { id: 1, name: 'remix', level: { id: 1, name: 'Iniciante' } },
				}),
			]
			server.use(...endpoints)

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
