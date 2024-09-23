import type { ComponentProps, ReactNode } from 'react'

import { tv } from 'tailwind-variants'

import Spinner from './assets/spinner.svg?react'

const button = tv({
	base: 'py-2 px-6 rounded text-white font-medium',
	variants: {
		color: {
			default: 'bg-grey-1 hover:bg-grey-2',
			primary: 'bg-primary-main hover:bg-primary-focus',
			negative: 'bg-primary-negative',
			disabled: 'bg-grey-1 hover:bg-grey-2 cursor-not-allowed',
      tertiary: 'bg-none hover:bg-grey-2'
		},
		size: {
			sm: 'py-0.5 px-3',
			md: 'py-2 px-6',
		},
	  width: {
      base: 'w-fit',
      fluid: 'w-full'
    }
	},
})

type ButtonProps = ComponentProps<'button'> & {
	children: ReactNode
	variant?: 'primary' | 'negative' | 'default' | 'tertiary'
	loading?: boolean
	size?: 'md' | 'sm'
	fluid?: boolean
}

export const Button = ({
	children,
	variant = 'default',
	disabled,
	loading = false,
	size = 'md',
	fluid = false,
	...rest
}: ButtonProps) => {
	return (
		<button
			{...rest}
			className={button({
				size,
				color: disabled ? 'disabled' : variant,
        width: fluid ? 'fluid' : 'base',
			})}
		>
			<div className="flex items-center justify-center">
				{loading && <Spinner className="fill-white mr-2 h-5 w-5" />}
				{children}
			</div>
		</button>
	)
}
