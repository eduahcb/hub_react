import { render, screen, waitFor } from '@testing-library/react'

import { setupServer } from 'msw/node'

import { createServerEndpoints, wrapper } from 'lib/utils/test-utils'

import { Dashboard } from '../Dashboard'

import userEvent from '@testing-library/user-event'

const navigate = vi.fn()

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

	afterAll(() => server.close())

	describe('when user does not fill in the fields', () => {
		beforeEach(() => {
			createServerEndpoints(server, [
				{ path: '/api/v1/me', method: 'get', response: {}, status: 200 },
				{
					path: '/api/v1/techs',
					method: 'get',
					response: {
						techs: [
							{ id: 1, name: 'remix', level: { id: 1, name: 'Iniciante' } },
						],
					},
					status: 200,
				},
				{
					path: '/api/v1/levels',
					method: 'get',
					response: { levels: [{ id: 1, name: 'Iniciante' }] },
					status: 200,
				},
			])
		})

		test('should show error message', async () => {
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

	describe('when user changes the tech name', () => {
		beforeEach(() => {
			createServerEndpoints(server, [
				{ path: '/api/v1/me', method: 'get', response: {}, status: 200 },
				{
					path: '/api/v1/techs',
					method: 'get',
					response: {
						techs: [
							{ id: 1, name: 'solidjs', level: { id: 1, name: 'Iniciante' } },
						],
					},
					status: 200,
				},
				{
					path: '/api/v1/levels',
					method: 'get',
					response: { levels: [{ id: 1, name: 'Iniciante' }] },
					status: 200,
				},
				{
					path: '/api/v1/techs/1',
					method: 'put',
					response: {
						tech: {
							id: 1,
							name: 'svelte',
							level: { id: 1, name: 'Iniciante' },
						},
					},
					status: 200,
				},
			])
		})

		test('should create a new tech', async () => {
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
	})

	describe('when user deles the tech', () => {
		beforeEach(() => {
			createServerEndpoints(server, [
				{ path: '/api/v1/me', method: 'get', response: {}, status: 200 },
				{
					path: '/api/v1/techs',
					method: 'get',
					response: {
						techs: [
							{ id: 1, name: 'solidjs', level: { id: 1, name: 'Iniciante' } },
						],
					},
					status: 200,
				},
				{
					path: '/api/v1/levels',
					method: 'get',
					response: { levels: [{ id: 1, name: 'Iniciante' }] },
					status: 200,
				},
				{
					path: '/api/v1/techs/1',
					method: 'delete',
					response: {
						tech: {
							id: 1,
							name: 'solidjs',
							level: { id: 1, name: 'Iniciante' },
						},
					},
					status: 200,
				},
			])
		})

		test('should delete a new tech', async () => {
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
