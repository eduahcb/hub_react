import type { ComponentProps } from "react";

type FormLabelProps = ComponentProps<'label'>;

export const FormLabel = (props: FormLabelProps) => {
  return <label className="block text-sm mb-2">{props.children}</label>
}
