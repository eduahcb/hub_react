/// <reference types="vitest" />

import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true,
		setupFiles: path.join(__dirname, 'src', 'setupTests.ts'),
		environment: 'jsdom',
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html', 'lcov'],
			include: ['src/**/*'],
			exclude: [
				'src/**/*.test.tsx',
				'src/**/*.test.ts',
				'src/mocks/*',
				'src/**/*.stories.tsx',
				'src/main.tsx',
				'src/Router.tsx',
			],
		},
	},
	plugins: [tsconfigPaths(), react(), svgr()],
	server: {
		port: 3000,
	},
})
