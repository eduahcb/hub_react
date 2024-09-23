import type { ComponentProps } from 'react'

type CardProps = ComponentProps<'div'> & {
	onClick?: () => void
}

type CardTitleProps = ComponentProps<'p'>

type CardOptionsProps = ComponentProps<'div'>

export const CardTitle = (props: CardTitleProps) => (
	<p className="select-none text-lg font-semibold">{props.children}</p>
)

export const CardOptions = (props: CardOptionsProps) => (
	<div {...props}>{props.children}</div>
)

export const Card = (props: CardProps) => {
	const handleOnClick = () => {
		props.onClick?.()
	}

	return (
		<div
			{...props}
			className="p-3 cursor-pointer text-sm text-grey-1 flex justify-between items-center rounded bg-grey-4 hover:bg-grey-3 w-full"
			onClick={handleOnClick}
		>
			{props.children}
		</div>
	)
}

Card.Title = CardTitle
Card.Options = CardOptions
