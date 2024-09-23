import Cookies from 'js-cookie'

export const useAuth = () => {
	const destroySession = () => {
		Cookies.remove('__auth_hub', { path: '/' })
	}

	const createSession = (token: string) => {
		const base64token = btoa(token)

		Cookies.set('__auth_hub', base64token, {
			expires: 1 / 24,
			path: '/',
		})
	}

	const getSession = () => {
		const token = Cookies.get('__auth_hub')

		if (!token) return ''

		return atob(token)
	}

	const isAuthenticated = () => {
		return !!getSession()
	}

	return {
		isAuthenticated,
		createSession,
		getSession,
		destroySession,
	}
}
