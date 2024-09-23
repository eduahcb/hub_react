import { HttpResponse, http } from 'msw'
import { drop } from '@mswjs/data'
import { wrapper } from 'lib/utils/test-utils'

import db from 'mocks/database'

import { renderHook, waitFor } from '@testing-library/react'

import { setupServer } from 'msw/node'

import { useDashboardQueries } from '../hooks/useDashboardQueries'
import { useDashboardMutation } from '../hooks/useDashboardMutations'

const mutationServer = setupServer()

const mockTechsQueries = () => {
	return http.get('/api/v1/techs', () => {
		return HttpResponse.json({ techs: [] })
	})
}

const mockLevelsQueries = () => {
	return http.get('/api/v1/levels', () => {
		db.level.create({
			id: 1,
			name: 'Iniciante',
		})

		db.level.create({
			id: 2,
			name: 'Intermediário',
		})

		db.level.create({
			id: 3,
			name: 'Avançado',
		})

		return HttpResponse.json({
			levels: db.level.getAll(),
		})
	})
}

const mockCreateTechMutation = () => {
	return http.post('/api/v1/techs', async ({ request }) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const body = (await request.json()) as any

		const level = db.level.findFirst({
			where: { id: { equals: Number(body.level_id) } },
		})

		const newTech = db.tech.create({ ...body, level })

		return HttpResponse.json({ tech: newTech }, { status: 201 })
	})
}

const mockDeleteTechMutation = () => {
	return http.delete('/api/v1/techs/:id', async ({ params }) => {
		const tech = db.tech.delete({
			where: { id: { equals: Number(params.id) } },
		})

		return HttpResponse.json({ tech }, { status: 200 })
	})
}

const mockUpateTechMutation = () => {
	return http.put('/api/v1/techs/:id', async ({ params, request }) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const data = (await request.json()) as any

		const level = db.level.findFirst({
			where: { id: { equals: Number(data.level_id) } },
		})

		const updatedTech = db.tech.update({
			where: {
				id: { equals: Number(params.id) },
			},
			data: {
				...data,
				level,
			},
		})

		return HttpResponse.json({ tech: updatedTech }, { status: 200 })
	})
}

describe('useDashboardMutation', () => {
	beforeAll(() => {
		mutationServer.listen()
	})

	beforeEach(async () => {
		mutationServer.resetHandlers()
		drop(db)
	})

	afterEach(() => {
		mutationServer.resetHandlers()
		drop(db)
	})

	afterAll(() => mutationServer.close())

	test('should create a new tech', async () => {
		const endpoints = [
			mockTechsQueries(),
			mockLevelsQueries(),
			mockCreateTechMutation(),
		]

		mutationServer.use(...endpoints)

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

	test('should delete a tech', async () => {
		const endpoints = [
			mockTechsQueries(),
			mockLevelsQueries(),
			mockCreateTechMutation(),
			mockDeleteTechMutation(),
		]

		mutationServer.use(...endpoints)

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
		await waitFor(async () => resultMutation.current.deleteTech.mutateAsync(id))

		techs = resultQuery.current.techs

		if (!techs) {
			throw Error('techs is undefined')
		}

		await waitFor(() => expect(resultQuery.current.techs).toHaveLength(0))
	})

	test('should update a tech', async () => {
		const endpoints = [
			mockTechsQueries(),
			mockLevelsQueries(),
			mockCreateTechMutation(),
			mockUpateTechMutation(),
		]

		mutationServer.use(...endpoints)

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

			resultMutation.current.createTech.mutateAsync({
				name: 'solidjs',
				level_id: 1,
			})
		})

		await waitFor(() => expect(resultQuery.current.techs).toHaveLength(2))

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
