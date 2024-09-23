import { Button } from 'components/Button'
import { Feedback, Form } from 'components/Form'
import { Input } from 'components/Input'
import { Password } from 'components/Password'
import { Select } from 'components/Select'
import { useForm } from 'react-hook-form'

import type { NavigateFunction } from 'react-router-dom'
import type { SignupForm } from 'lib/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { signupForm } from 'lib/validation/signupForm'

import { useAuth } from 'lib/hooks/useAuth'

import { useSignupMutations } from './hooks/useSignupMutations'
import { useSignupQueries } from './hooks/useSingupQueries'

type SignupProps = {
	navigate: NavigateFunction
}

export const Signup = ({ navigate }: SignupProps) => {
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm<SignupForm>({
		resolver: zodResolver(signupForm),
	})

	const { createSession } = useAuth()

	const { modules } = useSignupQueries()

	const { signup } = useSignupMutations({
		setError,
		navigate,
		createSession,
	})

	const onSubmit = (signupForm: SignupForm) => signup.mutate(signupForm)

	return (
		<div className="h-screen flex">
			<div className="pt-[30px] w-full flex flex-col items-center px-5 xl:px-0">
				<div className="flex justify-between items-center mb-8 md:w-[369px]">
					<h2 className="text-primary-main text-3xl ">Hub</h2>
					<Button onClick={() => navigate('/')}>voltar</Button>
				</div>
				<Form className="animate-fade pb-0" onSubmit={handleSubmit(onSubmit)}>
					<Form.Title>Crie sua conta</Form.Title>

					<Form.Control>
						<Form.Label htmlFor="name">Nome</Form.Label>
						<Input
							id="name"
							{...register('name')}
							placeholder="Digite aqui seu nome"
						/>
						{errors?.name && <Feedback>{errors.name?.message}</Feedback>}
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="email">Email</Form.Label>
						<Input
							id="email"
							{...register('email')}
							placeholder="Digite aqui seu email"
						/>
						{errors?.email && <Feedback>{errors.email?.message}</Feedback>}
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="password">Senha</Form.Label>
						<Password
							id="password"
							{...register('password')}
							placeholder="Digite aqui sua senha"
						/>
						{errors?.password && (
							<Feedback>{errors.password?.message}</Feedback>
						)}
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="confirm_password">Confirmar Senha</Form.Label>
						<Password
							id="confirm_password"
							{...register('confirm_password')}
							placeholder="Digite novamente sua senha"
						/>
						{errors?.confirm_password && (
							<Feedback>{errors.confirm_password?.message}</Feedback>
						)}
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="bio">Bio</Form.Label>
						<Input
							id="bio"
							{...register('bio')}
							placeholder="Fale sobre você"
						/>
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="contact">Contato</Form.Label>
						<Input
							id="contact"
							{...register('contact')}
							placeholder="Opção de contato"
						/>
					</Form.Control>

					<Form.Control>
						<Form.Label htmlFor="contact">Selecionar módulo</Form.Label>
						<Select
							id="module_id"
							placeHolder="Selecione o módulo"
							{...register('module_id')}
							setValue={(value) => setValue('module_id', Number(value))}
						>
							{modules?.map((module) => (
								<Select.Option key={module.id} value={module.id}>
									{module.name}
								</Select.Option>
							))}
						</Select>
						{errors?.module_id && (
							<Feedback>{errors.module_id?.message}</Feedback>
						)}
					</Form.Control>

					<div className="w-full mb-5">
						<Button
							loading={signup.isPending}
							disabled={signup.isPending}
							fluid
							variant="negative"
						>
							Cadastrar
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
