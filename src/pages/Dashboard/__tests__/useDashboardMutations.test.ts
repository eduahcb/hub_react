import { createServerEndpoints, wrapper } from 'lib/utils/test-utils'

import { renderHook, waitFor } from '@testing-library/react'

import { setupServer } from 'msw/node'

import { useDashboardQueries } from '../hooks/useDashboardQueries'
import { useDashboardMutation } from '../hooks/useDashboardMutations'

const server = setupServer()

describe('useDashboardMutation', () => {
	beforeAll(() => {
		server.listen()
	})

	beforeEach(async () => {
		server.resetHandlers()
	})

	afterAll(() => server.close())

	describe('when createTech mutation is called', () => {
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
							name: 'svelte',
							level: { id: 1, name: 'Iniciante' },
						},
					},
					status: 201,
				},
			])
		})

		test('should create a new tech', async () => {
			const { result: resultQuery } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})

			const { result: resultMutation } = renderHook(
				() => useDashboardMutation(),
				{
					wrapper,
				},
			)

			await waitFor(async () =>
				resultMutation.current.createTech.mutateAsync({
					name: 'svelte',
					level_id: 1,
				}),
			)

			await waitFor(() => expect(resultQuery.current.techs).toHaveLength(1))
		})
	})

	describe('when deleteTech mutation is called', () => {
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
				{
					path: '/api/v1/techs/:id',
					method: 'delete',
					response: {
						tech: {
							id: 1,
							name: 'remix',
							level: { id: 1, name: 'Iniciante' },
						},
					},
					status: 200,
				},
			])
		})

		test('should delete a tech', async () => {
			const { result: resultQuery } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})
			const { result: resultMutation } = renderHook(
				() => useDashboardMutation(),
				{
					wrapper,
				},
			)
			await waitFor(async () =>
				resultMutation.current.createTech.mutateAsync({
					name: 'remix',
					level_id: 1,
				}),
			)
			await waitFor(() => expect(resultQuery.current.techs).toHaveLength(1))
			let techs = resultQuery.current.techs
			if (!techs) {
				throw Error('techs is undefined')
			}
			const id = techs[0].id
			await waitFor(async () =>
				resultMutation.current.deleteTech.mutateAsync(id),
			)
			techs = resultQuery.current.techs
			if (!techs) {
				throw Error('techs is undefined')
			}
			await waitFor(() => expect(resultQuery.current.techs).toHaveLength(0))
		})
	})

	describe('when updateTech mutation is called', () => {
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
				{
					path: '/api/v1/techs/:id',
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

		test('should update a tech', async () => {
			const { result: resultQuery } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})
			const { result: resultMutation } = renderHook(
				() => useDashboardMutation(),
				{
					wrapper,
				},
			)
			await waitFor(async () => {
				resultMutation.current.createTech.mutateAsync({
					name: 'remix',
					level_id: 1,
				})
			})
			await waitFor(() => expect(resultQuery.current.techs).toHaveLength(1))
			let techs = resultQuery.current.techs
			if (!techs) {
				throw Error('techs is undefined')
			}
			const id = techs[0].id
			await waitFor(async () =>
				resultMutation.current.updateTech.mutateAsync({
					id,
					tech: { name: 'svelte', level_id: 1 },
				}),
			)
			techs = resultQuery.current.techs
			if (!techs) {
				throw Error('techs is undefined')
			}
			const tech = techs[0]
			await waitFor(() => expect(tech).toHaveProperty('name', 'svelte'))
		})
	})
})
