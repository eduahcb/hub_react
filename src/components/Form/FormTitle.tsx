import type { ReactNode } from "react"

type FormProps = {
  children: ReactNode
}

export const FormTitle = (props: FormProps) => {
  return (
		<h3 className="text-grey-0 text-lg mb-6">{props.children}</h3>
  )
}
