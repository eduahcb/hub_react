import {
  type ReactNode,
  Children,
  cloneElement,
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  useRef,
  useState,
  type ChangeEvent,
  useEffect,
} from 'react'

import { SelectOption } from './SelectOption'
import ArrowDown from './assets/arrow-down.svg?react'
import ArrowUp from './assets/arrow-up.svg?react'

type SelectProps = {
  value?: number | string
  children: ReactNode
  placeHolder?: string
  name?: string
  id?: string
  setValue?: (value: string | number) => void
}

interface SelectComponent
  extends ForwardRefExoticComponent<
    SelectProps & RefAttributes<HTMLInputElement>
  > {
  Option: typeof SelectOption
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const [value, setValue] = useState<string | number>(props?.value ?? '')
    const [showDropdown, setShowDropdown] = useState(false)

    const displayValue = useRef(null)

    const handleOnChange = (_: ChangeEvent) => {
      setShowDropdown((prev) => !prev)
    }

    const handleOptionOnChange = (_: ChangeEvent, newSelected: string) => {
      if (value !== newSelected) {
        setValue(newSelected)
        setShowDropdown(false)
        props.setValue?.(newSelected)
      }
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const options = Children.map(props.children, (child: any) => {
      if (value === child.props.value) {
        displayValue.current = child.props.children
        props?.setValue?.(child.props.value)
      }

      return cloneElement(child, {
        name: props.name,
        onChange: (e: ChangeEvent) =>
          handleOptionOnChange(e, child.props.value),
      })
    })

    const display = displayValue.current ?? props.placeHolder
    
    useEffect(()=> {
      if(!value) {
        props.setValue?.('')
      }
    }, [])
  
    return (
      <div className="relative">
        <div className="flex justify-between items-center w-full py-2 px-3 bg-grey-2 border-2 border-grey-2 rounded color:text-grey-1 text-grey-0 has-[:checked]:border-grey-0">
          <input
            type="checkbox"
            className="appearance-none absolute inset-0 z-10"
            onChange={handleOnChange}
            ref={ref}
            id={props.id}
            name={props.name}
            value={value}
          />
          <div className="select-none">{display}</div>
          {showDropdown ? (
            <ArrowUp className="h-5 w-5" />
          ) : (
            <ArrowDown className="h-5 w-5" />
          )}
        </div>
        {showDropdown && (
          <ul className="w-full absolute bg-grey-2 mt-1 rounded border-2 border-grey-3 first:rounded-t">
            {options}
          </ul>
        )}
      </div>
    )
  },
) as SelectComponent

Select.Option = SelectOption
