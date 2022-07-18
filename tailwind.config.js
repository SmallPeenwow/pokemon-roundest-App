/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	// purge: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			extend: {
				keyframes: {
					'fade-in': {
						'0%': {
							opacity: '0',
						},
						'100%': {
							opacity: '1',
						},
					},
				},
				animation: {
					'fade-in': 'fade-in 0.5s ease-out',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
