import { useMutation } from '@tanstack/react-query'

import { fetchSignup } from 'lib/api'

export const useSignupMutations = () => {
	const signup = useMutation({
		mutationFn: fetchSignup,
	})

	return {
		signup,
	}
}
