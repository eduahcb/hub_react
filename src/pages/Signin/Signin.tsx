import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Password } from 'components/Password'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { NavigateFunction } from 'react-router-dom'
import type { SigninForm } from 'lib/types'

import { useSigninMutations } from './hooks/useSigninMutations'
import { Feedback, Form } from 'components/Form'
import { signinForm } from 'lib/validation/signinForm'
import { useAuth } from 'lib/hooks/useAuth'

type LoginProps = {
	navigate: NavigateFunction
}

export const Signin = ({ navigate }: LoginProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SigninForm>({
		resolver: zodResolver(signinForm),
	})

	const { createSession } = useAuth()

	const { signin } = useSigninMutations({
		navigate,
		setError,
		createSession,
	})

	const onSubmit = async (data: SigninForm) => signin.mutate(data)

	return (
		<div className="h-screen flex">
			<div className="pt-[70px] w-full flex flex-col items-center px-5 xl:px-0">
				<h2 className="text-primary-main text-3xl mb-8">Hub</h2>
				<Form onSubmit={handleSubmit(onSubmit)} className="animate-fade">
					<Form.Title>Login</Form.Title>

					<Form.Control>
						<Form.Label htmlFor="email">Email</Form.Label>
						<Input id="email" {...register('email')} placeholder="email" />
						<Feedback>{errors.email?.message}</Feedback>
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="password">Senha</Form.Label>
						<Password
							id="password"
							{...register('password')}
							placeholder="senha"
						/>
						<Feedback>{errors.password?.message}</Feedback>
					</Form.Control>

					<div className="w-full mb-[32px]">
						<Button loading={signin.isPending} fluid variant="primary">
							Entrar
						</Button>
					</div>

					<div className="w-full text-center">
						<p className="mb-6">Ainda não possui uma conta?</p>
						<Button fluid onClick={() => navigate('/signup')}>
							Cadastre-se
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
