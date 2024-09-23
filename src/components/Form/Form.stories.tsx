import type { Story } from '@ladle/react'

import { Form } from './Form'
import { Input } from 'components/Input/Input'

export default {
  title: 'Components / Form',
}

export const Default: Story = () => (
  <Form>
    <Form.Title>Teste</Form.Title>
    <Form.Control>
      <Form.Label>Teste</Form.Label>
      <Input />
    </Form.Control>
    
    <Form.Control>
      <Form.Label>Other</Form.Label>
      <Input />
    </Form.Control>
  </Form>
)
