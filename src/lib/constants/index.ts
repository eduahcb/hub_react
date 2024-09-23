export const routesPaths = {
	signin: {
		path: '/',
		private: false,
	},
	signup: {
		path: '/signup',
		private: false,
	},
	dashboard: {
		path: '/dashboard',
		private: true,
	},
}

export const envs = {
	API_URL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
}
