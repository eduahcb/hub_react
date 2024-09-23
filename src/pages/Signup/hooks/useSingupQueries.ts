import { useQuery } from '@tanstack/react-query'

import { fetchGetAllModules } from 'lib/api'

export const useSignupQueries = () => {
	const { data } = useQuery({
		queryKey: ['modules'],
		queryFn: fetchGetAllModules,
	})

	return {
		modules: data,
	}
}
