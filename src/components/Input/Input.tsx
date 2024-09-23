import { forwardRef, type ComponentProps } from 'react'
import { InputWrapper } from './InputWrapper'

type InputProps = Omit<ComponentProps<'input'>, 'type'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputWrapper type="text" {...props} ref={ref} />
})
