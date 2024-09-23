import { HttpResponse, http } from 'msw'
import { wrapper } from 'lib/utils/test-utils'

import { renderHook, waitFor } from '@testing-library/react'

import { setupServer } from 'msw/node'
import { useDashboardQueries } from '../hooks/useDashboardQueries'

const queryServer = setupServer()

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

describe('useDashboardQueries', () => {
	beforeAll(() => {
		queryServer.listen()
	})

	beforeEach(() => queryServer.resetHandlers())

	afterEach(() => queryServer.resetHandlers())

	afterAll(() => queryServer.close())

	test('should return empty techs', async () => {
		const endpoints = [
			mockLevelsQueries({ levels: [] }),
			mockTechsQueries({ techs: [] }),
		]

		queryServer.use(...endpoints)

		const { result } = renderHook(() => useDashboardQueries(), {
			wrapper,
		})

		await waitFor(() => expect(result.current.techs).toHaveLength(0))
	})

	test('should return techs', async () => {
		const endpoints = [
			mockLevelsQueries({ levels: [] }),
			mockTechsQueries({
				techs: [
					{ id: 1, name: 'svelte', level: { id: 1, name: 'Intermediário' } },
				],
			}),
		]

		queryServer.use(...endpoints)

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

	test('should return empty levels', async () => {
		const endpoints = [
			mockLevelsQueries({
				levels: [],
			}),
			mockTechsQueries({
				techs: [],
			}),
		]

		queryServer.use(...endpoints)

		const { result } = renderHook(() => useDashboardQueries(), {
			wrapper,
		})

		await waitFor(() => expect(result.current.levels).toHaveLength(0))
		await waitFor(() => expect(result.current.levels).toMatchObject([]))
	})

	test('should return levels', async () => {
		const endpoints = [
			mockLevelsQueries({
				levels: [
					{ id: 1, name: 'Iniciante' },
					{ id: 2, name: 'Intermediário' },
					{ id: 3, name: 'Avançado' },
				],
			}),
			mockTechsQueries({
				techs: [],
			}),
		]

		queryServer.use(...endpoints)

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
