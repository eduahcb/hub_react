import type { Story } from '@ladle/react';

import { Button } from './Button';
import Spinner from './assets/spinner.svg?react';
import { IconButton } from './IconButton';

export default {
	title: 'Components / Button',
};

const Toolbar = () => <div className="mt-2" />;

export const Default: Story = () => (
	<div>
		<p>Default:</p>
		<Button>Button Text</Button>
		<Toolbar />
    
		<p>Fluid:</p>
		<Button loading fluid>Button Text</Button>
		<Toolbar />

		<p>Primary:</p>
		<Button variant='primary'>Button Text</Button>
		<Toolbar />

		<p>Negative</p>
		<Button variant="negative">Button Text</Button>
		<Toolbar />

		<p>Disabled</p>
		<Button disabled>Button Text</Button>
		<Toolbar />

		<p>Loading:</p>
		<Button loading>Button Text</Button>
		<Toolbar />

		<p>Small:</p>
		<Button size="sm">Button Text</Button>
		<Toolbar />

		<p>Only Icon:</p>
		<IconButton>
			<Spinner />
		</IconButton>
		<Toolbar />

		<p>Small Icon:</p>
		<IconButton size="sm">
			<Spinner />
		</IconButton>
		<Toolbar />
		
    <p>Icon tertiary:</p>
		<IconButton size="sm" variant='tertiary'>
			<Spinner />
		</IconButton>
		<Toolbar />
	</div>
);
