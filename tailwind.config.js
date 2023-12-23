/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/components/**/*.{js,jsx,mdx}',
		'./src/app/**/*.{js,jsx,mdx}'
	],
	theme: {
		darkMode: 'class',
		screens: {
			xs: '25rem', // 400px
			sm: '36rem', // 576px
			md: '48rem', // 768px
			lg: '64rem', // 1024px
			xl: '80rem' // 1280px
		},
		extend: {
			fontFamily: {
				roboto: ['var(--font-roboto-flex)'],
				robotoSlab: ['var(--font-roboto-slab)'],
				robotoMono: ['var(--font-roboto-mono)']
			}
		}
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	]
}