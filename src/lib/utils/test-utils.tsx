import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { SetupServerApi } from 'msw/node'
import { HttpResponse, http } from 'msw'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

type WrapperProps = {
	children: ReactNode
}

export const wrapper = ({ children }: WrapperProps) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

type ServerEndpoints = {
	path: string
	method: 'get' | 'post' | 'put' | 'delete'
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	response: any
	status: number
}

export const createServerEndpoints = (
	server: SetupServerApi,
	endpoints: ServerEndpoints[],
) => {
	const result = endpoints.map((endpoint) =>
		http[endpoint.method](endpoint.path, () =>
			HttpResponse.json(endpoint.response, { status: endpoint.status }),
		),
	)

	return server.use(...result)
}
