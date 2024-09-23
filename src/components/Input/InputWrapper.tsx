import { forwardRef, type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputWrapperProps = ComponentProps<'input'>

export const InputWrapper = forwardRef<HTMLInputElement, InputWrapperProps>((props, ref) => {
  const className = twMerge(
    'w-full py-2 px-3 bg-grey-2 rounded placeholder:text-grey-1 focus:border-grey-0 text-grey-0 outline-grey-0',
    props.className,
  );

  return <input {...props} className={className} ref={ref} />

})
