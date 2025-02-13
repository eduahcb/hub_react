import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	fetchCreateTech,
	fetchDeleteTech,
	fetchSignout,
	fetchUpdateTech,
} from 'lib/api'

import { useAuth } from 'lib/hooks/useAuth'

import type { Tech, TechForm } from 'lib/types'

export const useDashboardMutation = () => {
	const queryClient = useQueryClient()
	const { getSession, destroySession } = useAuth()

	const token = getSession()

	const createTech = useMutation({
		mutationKey: ['techs'],
		mutationFn: (tech: TechForm) => fetchCreateTech(tech, { token }),
		onSuccess: (data: Tech) => {
			queryClient.setQueryData(['techs'], (prevData: Tech[]) => {
				return [...prevData, data]
			})
		},
	})

	const updateTech = useMutation({
		mutationKey: ['techs'],
		mutationFn: ({ id, tech }: { id: number; tech: TechForm }) =>
			fetchUpdateTech({ id, tech }, { token }),
		onSuccess: (data: Tech) => {
			queryClient.setQueryData(['techs'], (prevData: Tech[]) => {
				const newTechs = prevData.map((tech) => {
					if (tech.id === data.id) {
						return data
					}

					return tech
				})

				return newTechs
			})
		},
	})

	const deleteTech = useMutation({
		mutationKey: ['techs'],
		mutationFn: (id: number) => fetchDeleteTech(id, { token }),
		onSuccess: (data) => {
			queryClient.setQueryData(['techs'], (prevData: Tech[]) => {
				const newTechs = prevData.filter((tech) => tech.id !== data.id)
				return newTechs
			})
		},
	})

	const signout = useMutation({
		mutationKey: ['signout'],
		mutationFn: (_: string) => fetchSignout({ token }),
		onSuccess: () => {
			destroySession()
		},
	})

	return {
		deleteTech,
		createTech,
		updateTech,
		signout,
	}
}
