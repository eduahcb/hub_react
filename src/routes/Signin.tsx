import { useNavigate } from 'react-router-dom'
import { Signin as SigninPage } from 'pages/Signin'
import { useEffect } from 'react'

import { useAuth } from 'lib/hooks/useAuth'

export const Signin = () => {
	const navigate = useNavigate()

	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/dashboard')
		}
	}, [navigate, isAuthenticated])

	return !isAuthenticated() && <SigninPage navigate={navigate} />
}
