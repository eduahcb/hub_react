import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Dashboard, Signin, Signup } from 'routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import ToasSuccessIcon from 'assets/sucess.svg?react'
import ToastErrorIcon from 'assets/error.svg?react'

import { routesPaths } from 'lib/constants'
import { PrivateRoute } from 'components/PrivateRoute'

const routes = createBrowserRouter([
	{
		path: routesPaths.signin.path,
		index: true,
		element: <Signin />,
	},
	{
		path: routesPaths.signup.path,
		index: true,
		element: <Signup />,
	},
	{
		path: routesPaths.dashboard.path,
		index: true,
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
	},
])

const queryclient = new QueryClient()

export const Router = () => {
	return (
		<>
			<QueryClientProvider client={queryclient}>
				<RouterProvider router={routes} />
			</QueryClientProvider>
			<Toaster
				icons={{
					success: <ToasSuccessIcon className="w-4 h-4" />,
					error: <ToastErrorIcon className="w-4 h-4" />,
				}}
				toastOptions={{
					classNames: {
						toast: 'bg-grey-2 p-3 text-grey-0',
					},
				}}
			/>
		</>
	)
}
