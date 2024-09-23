import { useEffect, type ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from 'lib/hooks/useAuth'

type PrivateRouteProps = {
	children: ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const navigate = useNavigate()

	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate('/')
		}
	}, [navigate, isAuthenticated])

	if (!isAuthenticated()) return null

	return <>{children}</>
}
