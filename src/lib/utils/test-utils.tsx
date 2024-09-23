import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
