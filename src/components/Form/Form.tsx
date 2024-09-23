import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ComponentProps,
} from 'react'

import { twMerge } from 'tailwind-merge'

import { FormTitle } from './FormTitle'
import { FormControl } from './FormControl'
import { FormLabel } from './FormLabel'

type FormProps = ComponentProps<'form'>

interface Formcomponent
  extends ForwardRefExoticComponent<
    FormProps & RefAttributes<HTMLFormElement>
  > {
  Title: typeof FormTitle
  Control: typeof FormControl
  Label: typeof FormLabel
}

export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const base = "bg-grey-3 rounded py-11 px-6  flex flex-col items-center text-grey-0 md:w-[369px]"
  const className = twMerge(base, props.className)

  return (
    <form
      ref={ref}
      {...props}
      className={className}
    >
      {props.children}
    </form>
  )
}) as Formcomponent

Form.Title = FormTitle
Form.Control = FormControl
Form.Label = FormLabel
