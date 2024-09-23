import { forwardRef, useState, type ComponentProps } from 'react'
import { InputWrapper } from '../Input/InputWrapper'

import EyeSVG from './assets/eye.svg?react'
import EyeOffSVG from './assets/eye-off.svg?react'

type InputProps = Omit<ComponentProps<'input'>, 'type'> & {
  onClick?: (event?: CustomEvent<HTMLInputElement>) => void
}

export const Password = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [type, setType] = useState('password')

    const handleClick = () => {
      setType((prev) => (prev === 'password' ? 'text' : 'password'))
      props.onClick?.()
    }

    return (
      <>
        {type === 'password' ? (
          <div className="flex w-full">
            <InputWrapper
              {...props}
              className="pr-9"
              type="password"
              autoComplete="on"
              ref={ref}
            />
            <div className="flex justify-around items-center">
              <EyeSVG
                onClick={() => handleClick()}
                className="fill-grey-1 absolute mr-11 z-10 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full">
            <InputWrapper {...props} className="pr-9" type="text" ref={ref} />
            <div className="flex justify-around items-center">
              <EyeOffSVG
                onClick={() => handleClick()}
                className="fill-grey-1 absolute mr-11 z-10 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        )}
      </>
    )
  },
)
