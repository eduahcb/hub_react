import type { z } from 'zod'

import type { signinForm } from 'lib/validation/signinForm'
import type { signupForm } from 'lib/validation/signupForm'
import type { techForm } from 'lib/validation/techForm'

export type SignupForm = z.infer<typeof signupForm>

export type SigninForm = z.infer<typeof signinForm>

export type TechForm = z.infer<typeof techForm>

export type Module = {
	id: number
	name: string
}

export type Level = {
	id: number
	name: string
}

export type Tech = {
	id: number
	name: string
	level: Level
}

export type User = {
	id: number
	name: string
	contact?: string
	bio?: string
	module: {
		id: number
		name: string
	}
}
