import type { ReactNode } from "react"

type FormControlProps = {
  children: ReactNode
}

export const FormControl = (props: FormControlProps) => {
  return <div className="w-full mb-6">{props.children}</div>
}
