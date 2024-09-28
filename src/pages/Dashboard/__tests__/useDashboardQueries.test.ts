import { createServerEndpoints, wrapper } from 'lib/utils/test-utils'

import { renderHook, waitFor } from '@testing-library/react'

import { setupServer } from 'msw/node'
import { useDashboardQueries } from '../hooks/useDashboardQueries'

const server = setupServer()

describe('useDashboardQueries', () => {
	beforeAll(() => {
		server.listen()
	})

	beforeEach(() => server.resetHandlers())

	afterAll(() => server.close())

	describe('when techs enpoint return empty data', () => {
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

		test('should return empty techs', async () => {
			const { result } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})
			await waitFor(() => expect(result.current.techs).toHaveLength(0))
		})
	})

	describe('when techs enpoint return data', () => {
		beforeEach(() => {
			createServerEndpoints(server, [
				{ path: '/api/v1/me', method: 'get', response: {}, status: 200 },
				{
					path: '/api/v1/techs',
					method: 'get',
					response: {
						techs: [
							{
								id: 1,
								name: 'svelte',
								level: { id: 1, name: 'Intermediário' },
							},
						],
					},
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

		test('should return techs', async () => {
			const { result } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})

			await waitFor(() => expect(result.current.techs).toHaveLength(1))

			await waitFor(() =>
				expect(result.current.techs).toMatchObject([
					{
						id: 1,
						name: 'svelte',
						level: { id: 1, name: 'Intermediário' },
					},
				]),
			)
		})
	})

	describe('when levels enpoint return empty data', () => {
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

		test('should return empty levels', async () => {
			const { result } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})

			await waitFor(() => result.current.levels !== undefined)

			expect(result.current.levels).toHaveLength(0)
			expect(result.current.levels).toMatchObject([])
		})
	})

	describe('when levels enpoint return data', () => {
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
					response: {
						levels: [
							{ id: 1, name: 'Iniciante' },
							{ id: 2, name: 'Intermediário' },
							{ id: 3, name: 'Avançado' },
						],
					},
					status: 200,
				},
			])
		})

		test('should return levels', async () => {
			const { result } = renderHook(() => useDashboardQueries(), {
				wrapper,
			})

			await waitFor(() => expect(result.current.levels).toHaveLength(3))
			await waitFor(() =>
				expect(result.current.levels).toMatchObject([
					{ id: 1, name: 'Iniciante' },
					{ id: 2, name: 'Intermediário' },
					{ id: 3, name: 'Avançado' },
				]),
			)
		})
	})
})
