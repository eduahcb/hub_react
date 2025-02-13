import { useMutation } from '@tanstack/react-query'

import { fetchSignin } from 'lib/api'

export const useSigninMutations = () => {
	const signin = useMutation({
		mutationFn: fetchSignin,
	})

	return {
		signin,
	}
}
