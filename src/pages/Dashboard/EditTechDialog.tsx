import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Level, Tech, TechForm } from 'lib/types'

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

type EditTechDialogProps = {
	tech: Tech | undefined
	levels: Level[] | undefined
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export const EditTechDialog = ({
	tech,
	levels = [],
	open,
	onOpenChange,
}: EditTechDialogProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TechForm>({
		resolver: zodResolver(techForm),
	})

	const { updateTech, deleteTech } = useDashboardMutation()

	const onSubmit = async (data: TechForm) => {
		if (tech) {
			updateTech.mutate(
				{ id: tech.id, tech: data },
				{
					onSuccess: () => {
						onOpenChange?.(false)
					},
				},
			)
		}
	}

	const onDelete = async () => {
		if (tech?.id) {
			deleteTech.mutate(tech?.id, {
				onSuccess: () => {
					onOpenChange?.(false)
				},
			})
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-grey-3" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle className="text-grey-0">Teclogia Detalhes</DialogTitle>
				</DialogHeader>
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="p-0 mt-6 w-full md:w-full"
				>
					<Form.Control>
						<Form.Label>Nome</Form.Label>
						<Input defaultValue={tech?.name} {...register('name')} />
						{errors?.name && <Feedback>{errors.name?.message}</Feedback>}
					</Form.Control>

					<Form.Control>
						<Form.Label>Status</Form.Label>
						<Select
							placeHolder="Status"
							{...register('level_id')}
							setValue={(value) => setValue('level_id', Number(value))}
							value={tech?.level.id}
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

					<div className="mt-3 w-full flex justify-between">
						<Button
							loading={updateTech.isPending}
							disabled={updateTech.isPending}
							variant="negative"
						>
							Salvar alterações
						</Button>
						<Button
							loading={deleteTech.isPending}
							disabled={deleteTech.isPending}
							type="button"
							onClick={onDelete}
						>
							Excluir
						</Button>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
