import { useMutation } from '@tanstack/react-query'

import type { UseFormSetError } from 'react-hook-form'
import type { NavigateFunction } from 'react-router-dom'

import { toast } from 'sonner'

import type { SignupForm } from 'lib/types'

import { BadRequest, InternalServerError } from 'lib/errors'
import { fetchSignup } from 'lib/api'

type UseSignupMutationParameters = {
	navigate: NavigateFunction
	setError: UseFormSetError<SignupForm>
	createSession: (token: string) => void
}

export const useSignupMutations = ({
	setError,
	navigate,
	createSession,
}: UseSignupMutationParameters) => {
	const signup = useMutation({
		mutationFn: fetchSignup,
		onSuccess: (token) => {
			toast.success('Conta criada com sucesso', {
				position: 'top-right',
				duration: 2000,
			})

			createSession(token)
			navigate('/dashboard')
		},
		onError: (error) => {
			if (error instanceof BadRequest) {
				setError('email', {
					type: 'manual',
					message: 'email já cadastrado',
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
		signup,
	}
}
