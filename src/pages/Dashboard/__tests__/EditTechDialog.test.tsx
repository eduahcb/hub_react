import { render, screen, waitFor } from '@testing-library/react'

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
const mockUpateTechMutation = (response: any) => {
	return http.put('/api/v1/techs/:id', async () => {
		return HttpResponse.json(response, { status: 200 })
	})
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const mockDeleteTechMutation = (response: any) => {
	return http.delete('/api/v1/techs/:id', async () => {
		return HttpResponse.json(response, { status: 200 })
	})
}

const server = setupServer()

const openEditModal = async (techName: string) => {
	render(<Dashboard navigate={navigate} />, {
		wrapper,
	})

	const techCard = await screen.findByText(techName)

	await userEvent.click(techCard)
}

describe('when is editing a tech', () => {
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
				mockLevelsQueries({ levels: [{ id: 1, name: 'Iniciante' }] }),
				mockTechsQueries({
					techs: [
						{ id: 1, name: 'remix', level: { id: 1, name: 'Iniciante' } },
					],
				}),
			]
			server.use(...endpoints)

			await openEditModal('remix')

			const nameInput = await screen.findByDisplayValue('remix')
			await userEvent.clear(nameInput)

			const button = await screen.findByRole('button', {
				name: 'Salvar alterações',
			})
			await userEvent.click(button)

			expect(
				await screen.findByText('o campo nome é obrigatório'),
			).toBeInTheDocument()
		})
	})

	describe('success', () => {
		test('should create a new tech', async () => {
			const endpoints = [
				mockProfile(),
				mockLevelsQueries({ levels: [{ id: 1, name: 'Iniciante' }] }),
				mockTechsQueries({
					techs: [
						{ id: 1, name: 'solidjs', level: { id: 1, name: 'Iniciante' } },
					],
				}),
				mockUpateTechMutation({
					tech: { id: 1, name: 'svelte', level: { id: 1, name: 'Iniciante' } },
				}),
			]
			server.use(...endpoints)

			await openEditModal('solidjs')

			const nameInput = await screen.findByDisplayValue('solidjs')
			await userEvent.clear(nameInput)
			await userEvent.type(nameInput, 'svelte')

			const button = await screen.findByRole('button', {
				name: 'Salvar alterações',
			})
			await userEvent.click(button)

			expect(await screen.findByText('svelte')).toBeInTheDocument()
		})

		test('should delete a new tech', async () => {
			const endpoints = [
				mockProfile(),
				mockLevelsQueries({ levels: [{ id: 1, name: 'Iniciante' }] }),
				mockTechsQueries({
					techs: [
						{ id: 1, name: 'solidjs', level: { id: 1, name: 'Iniciante' } },
					],
				}),
				mockDeleteTechMutation({
					tech: { id: 1, name: 'solidjs', level: { id: 1, name: 'Iniciante' } },
				}),
			]
			server.use(...endpoints)

			await openEditModal('solidjs')

			const button = await screen.findByRole('button', {
				name: 'Excluir',
			})
			await userEvent.click(button)

			await waitFor(() =>
				expect(screen.queryByText('solidjs')).not.toBeInTheDocument(),
			)
		})
	})
})
