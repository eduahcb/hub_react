
import type { Story } from '@ladle/react';

import { Card } from './Card';

export default {
	title: 'Components / Card',
};

export const Default: Story = () => (
  <Card>
    <Card.Title>teste</Card.Title>
    <p>oi</p>
  </Card>
)
