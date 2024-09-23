import type { ComponentProps } from 'react';

import { Button } from './Button';

type IconButtonProps = Omit<ComponentProps<typeof Button>, 'loading'> & {
}

export const IconButton = (props: IconButtonProps) => {
	return <Button {...props}>{props.children}</Button>;
};
