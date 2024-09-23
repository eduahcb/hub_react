import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Level, TechForm } from 'lib/types'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from 'components/Dialog'

import { Feedback, Form } from 'components/Form'
import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { Button } from 'components/Button'

import { techForm } from 'lib/validation/techForm'
import { useDashboardMutation } from './hooks/useDashboardMutations'

type CreateTechDialogProps = {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	levels: Level[] | undefined
}

export const CreateTechDialog = ({
	levels = [],
	open,
	onOpenChange,
}: CreateTechDialogProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<TechForm>({
		resolver: zodResolver(techForm),
	})

	const { createTech } = useDashboardMutation()

	const onSubmit = async (data: TechForm) => {
		createTech.mutate(data, {
			onSuccess: () => {
				onOpenChange?.(false)
				reset()
			},
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-grey-3" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle className="text-grey-0">
						Cadastrar Tecnologia
					</DialogTitle>
				</DialogHeader>
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="p-0 mt-6 w-full md:w-full"
				>
					<Form.Control>
						<Form.Label>Nome</Form.Label>
						<Input id="name" {...register('name')} placeholder="nome" />
						{errors?.name && <Feedback>{errors.name?.message}</Feedback>}
					</Form.Control>

					<Form.Control>
						<Form.Label>Selecionar status</Form.Label>
						<Select
							placeHolder="status"
							id="level_id"
							{...register('level_id')}
							setValue={(value) => setValue('level_id', Number(value))}
						>
							{levels.map((level) => (
								<Select.Option key={level.id} value={level.id}>
									{level.name}
								</Select.Option>
							))}
						</Select>
						{errors?.level_id && (
							<Feedback>{errors.level_id?.message}</Feedback>
						)}
					</Form.Control>

					<div className="mt-3 w-full">
						<Button
							loading={createTech.isPending}
							disabled={createTech.isPending}
							fluid
							variant="primary"
						>
							Cadastrar Tecnologia
						</Button>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
