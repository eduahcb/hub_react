import type { ReactNode } from "react"

type FeedbackProps = {
  children: ReactNode
}

export const Feedback = (props: FeedbackProps) => {
  return (
    <span className="text-red-500 text-sm mt-3 block">
     {props.children}
    </span>
  )
}
