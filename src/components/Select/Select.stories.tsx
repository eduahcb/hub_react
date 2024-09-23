import type { Story } from '@ladle/react'
import { Select } from './Select'

export default {
	title: 'Components / Select',
}

export const Default: Story = () => (
	<Select placeHolder="Select" name="category">
		<Select.Option value="1">Option 1</Select.Option>
		<Select.Option value="2">Option 2</Select.Option>
		<Select.Option value="3">Option 3</Select.Option>
	</Select>
)
