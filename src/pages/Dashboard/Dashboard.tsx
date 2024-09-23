import type { Tech } from 'lib/types'

import { Button, IconButton } from 'components/Button'

import PlusSVG from './assets/plus.svg?react'
import TrashSVG from './assets/trash.svg?react'

import { Card } from 'components/Card'

import { CreateTechDialog } from './CreateTechDialog'
import { EditTechDialog } from './EditTechDialog'
import { useState } from 'react'

import { useDashboardQueries } from './hooks/useDashboardQueries'
import { useDashboardMutation } from './hooks/useDashboardMutations'
import type { NavigateFunction } from 'react-router-dom'

type DashboardProps = {
	navigate: NavigateFunction
}

export const Dashboard = ({ navigate }: DashboardProps) => {
	const [createForm, setCreateForm] = useState(false)
	const [editForm, setEditForm] = useState(false)
	const [selectedTech, setSelectedTech] = useState<Tech>()

	const { user, techs, levels } = useDashboardQueries()
	const { deleteTech, signout } = useDashboardMutation()

	const openCreateForm = () => setCreateForm(true)

	const editTech = (tech: Tech) => {
		setSelectedTech(tech)
		setEditForm(true)
	}

	const onSignout = () => {
		signout.mutate('', {
			onSuccess: () => navigate('/'),
		})
	}

	return (
		<>
			<header className="w-full pt-12 px-6 mb-14 xl:px-0">
				<div className="w-full max-w-7xl m-auto flex justify-between">
					<h1 className="text-2xl font-bold text-primary-main">Hub</h1>
					<Button size="sm" onClick={onSignout}>
						Sair
					</Button>
				</div>
			</header>
			<main className="w-full max-w-7xl m-auto px-6 xl:px-0">
				<section className="flex justify-between py-12 border-y border-grey-1 mb-12">
					<p className="text-lg font-bold text-grey-1">
						Olá {user?.name ?? 'Estranho'}
					</p>
					<p className="text-lg font-bold text-grey-1">{user?.module.name}</p>
				</section>
				<section className="flex justify-between mb-7">
					<p className="text-lg font-bold text-grey-1">Tecnologias</p>
					<IconButton
						aria-label="create new tech"
						size="sm"
						onClick={openCreateForm}
					>
						<PlusSVG className="w-4 h-4" />
					</IconButton>
				</section>
				<section>
					{techs && techs.length > 0 && (
						<div className="bg-grey-2 p-5 rounded">
							{techs.map((tech) => (
								<div
									key={tech.id}
									className="animate-fade-in mb-3 only:mb-0 last:mb-0"
								>
									<Card onClick={() => editTech(tech)}>
										<Card.Title>{tech.name}</Card.Title>
										<Card.Options className="flex items-center">
											<p className="mr-6">{tech.level.name}</p>
											<IconButton
												aria-label="delete tech"
												size="sm"
												variant="tertiary"
												onClick={(e) => {
													e.stopPropagation()
													deleteTech.mutate(tech.id)
												}}
											>
												<TrashSVG className="w-5 h-5" />
											</IconButton>
										</Card.Options>
									</Card>
								</div>
							))}
						</div>
					)}
				</section>

				<CreateTechDialog
					open={createForm}
					onOpenChange={setCreateForm}
					levels={levels}
				/>

				<EditTechDialog
					open={editForm}
					onOpenChange={setEditForm}
					levels={levels}
					tech={selectedTech}
				/>
			</main>
		</>
	)
}
