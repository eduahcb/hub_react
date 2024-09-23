import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'

import type { NavigateFunction } from 'react-router-dom'
import type { UseFormSetError } from 'react-hook-form'
import type { SigninForm } from 'lib/types'

import { InternalServerError, NotFound, Unauthorized } from 'lib/errors'
import { fetchSignin } from 'lib/api'

type UseSigninMutationsParameters = {
	navigate: NavigateFunction
	setError: UseFormSetError<SigninForm>
	createSession: (token: string) => void
}

export const useSigninMutations = ({
	navigate,
	setError,
	createSession,
}: UseSigninMutationsParameters) => {
	const signin = useMutation({
		mutationFn: fetchSignin,
		onSuccess: (token: string): void => {
			createSession(token)
			navigate('/dashboard')
		},
		onError: (error: Error) => {
			if (error instanceof NotFound) {
				setError('email', {
					type: 'manual',
					message: 'email não encontrado',
				})
			}

			if (error instanceof Unauthorized) {
				setError('password', {
					type: 'manual',
					message: 'senha incorreta',
				})
			}

			if (error instanceof InternalServerError) {
				toast.error('Ops! Algo deu errado', {
					position: 'top-right',
					duration: 2000,
				})
			}
		},
	})

	return {
		signin,
	}
}
