import type { ChangeEvent, ComponentProps } from 'react'

type SelectOptionProps = ComponentProps<'li'> & {
	value: string | number
	name?: string
	onChange?: (event: ChangeEvent, value: string | number) => void
}

export const SelectOption = (props: SelectOptionProps) => {
	return (
		<li className="relative flex items-center gap-1 w-5/5 p-2 text-grey-0 outline-2 has-[:checked]:bg-grey-4 hover:bg-grey-4 has-[:focus]:bg-grey-4">
			<input
				name={props.name ?? 'select-component'}
				type="radio"
				value={props.value}
				data-label={props.children}
				aria-describedby={`option-${props.value}-description`}
				className="appearance-none inset-0 absolute"
				onChange={(event) => props.onChange?.(event, props.value)}
			/>
			<span id={`option-${props.value}-description`}>{props.children}</span>
		</li>
	)
}
