import { useQuery } from '@tanstack/react-query'

import { fetchGetAllLevels, fetchGetAllTechs } from 'lib/api'
import { fetchUser } from 'lib/api/getUser'
import { useAuth } from 'lib/hooks/useAuth'

export const useDashboardQueries = () => {
	const { getSession } = useAuth()

	const token = getSession()

	const { data: levels } = useQuery({
		queryKey: ['levels'],
		queryFn: fetchGetAllLevels,
	})

	const { data: techs } = useQuery({
		queryKey: ['techs'],
		queryFn: () => fetchGetAllTechs({ token }),
	})

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: () => fetchUser({ token }),
	})

	return {
		levels,
		techs,
		user,
	}
}
