import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './Router'

import './index.css'

async function enableMocking() {
	if (process.env.NODE_ENV === 'development') {
		const { worker } = await import('./mocks/browser')

		return worker.start()
	}

	return Promise.resolve()
}

enableMocking().then(() => {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Router />
		</StrictMode>,
	)
})
