/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				fade: 'fade 500ms 0s ease-in-out backwards',
        'fade-in': 'fadeIn 500ms 0s ease-in-out backwards'
			},
			keyframes: {
				fade: {
					'0%': { opacity: 0, transform: 'scale(0.5)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
				fadeIn: {
					'0%': { opacity: 0, transform: 'scale(0.5)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
			},
			colors: {
				primary: {
					main: '#ff577f',
					focus: '#ff427f',
					negative: '#59323f',
				},
				grey: {
					0: '#f8f9fa',
					1: '#868e96',
					2: '#343b41',
					3: '#212529',
					4: '#121214',
				},
				sucess: '#3fe864',
				negative: '#e83f5b',
			},
		},
	},
	plugins: [],
}
