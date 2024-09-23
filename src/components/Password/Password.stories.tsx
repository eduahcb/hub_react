import type { Story } from '@ladle/react';
import { Password } from './Password';

export default {
	title: 'Components / Password',
};

export const Default: Story = () => (
	<Password onChange={(e) => console.log(e.target.value)} />
);
