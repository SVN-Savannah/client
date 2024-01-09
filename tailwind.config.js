/** @type {import('tailwindcss').Config} */

let px1_9999 = {};
for (let i = 1; i <= 9999; i++) {
	px1_9999[`${i}px`] = `${i}px`;
}

module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			width: px1_9999,
			height: px1_9999,
			margin: px1_9999,
			padding: px1_9999,
			minWidth: px1_9999,
			minHeight: px1_9999,
			maxWidth: px1_9999,
			maxHeight: px1_9999,
			borderRadius: px1_9999,
			colors: {
				neutral: {
					DEFAULT: '#FFFFFF',
					10: '#FAFAFA',
					15: '#F2F2F2',
					20: '#E6E6E7',
					30: '#CDCECF',
					40: '#B4B5B7',
					50: '#9B9C9F',
					60: '#818386',
					70: '#686B6E',
					80: '#36393E',
					90: '#1D2126',
					100: '#04080E',
				},
				primary: {
					10: '#E5EDED',
					20: '#CCDADC',
					40: '#99B5B9',
					60: '#669196',
					80: '#336C73',
					100: '#004750',
					120: '#003940',
				},
				secondary: {
					10: '#EFFAFC',
					20: '#E0F5F9',
					40: '#C1ECF4',
					60: '#A1E2EE',
					80: '#82D9E9',
					100: '#63CFE3',
					120: '#4FA5B6',
				},
				success: {
					10: '#EAFBF2',
					20: '#D5F7E6',
					40: '#ABEFCD',
					60: '#81E8B3',
					80: '#57E09A',
					100: '#2DD881',
				},
				warning: {
					10: '#FFF8E6',
					20: '#FFF1CE',
					40: '#FFE39C',
					60: '#FFD66B',
					80: '#FFC839',
					100: '#FFBA08',
				},
				error: {
					10: '#FCECE5',
					20: '#FAD8CC',
					40: '#F5B199',
					60: '#EF8B66',
					80: '#EA6433',
					100: '#E53D00',
					120: '#B73100',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontSize: {
				h1: [
					'1.5rem',
					{
						lineHeight: '1.2',
						fontWeight: '700',
					},
				],
				h2: [
					'1.125rem',
					{
						lineHeight: '1.4',
						fontWeight: '700',
					},
				],
				h3: [
					'0.875rem',
					{
						lineHeight: '1.4',
						fontWeight: '500',
					},
				],
				h4: [
					'0.875rem',
					{
						lineHeight: '1.4',
						fontWeight: '700',
					},
				],
				h5: [
					'0.75rem',
					{
						lineHeight: '1.2',
						fontWeight: '600',
					},
				],
				h6: [
					'0.875rem',
					{
						lineHeight: '1.4',
						fontWeight: '600',
					},
				],
				sub1: [
					'1rem',
					{
						lineHeight: '1.4',
						fontWeight: '500',
					},
				],
				sub2: [
					'0.875rem',
					{
						lineHeight: '1.4',
						fontWeight: '500',
					},
				],
				body12: [
					'0.75rem',
					{
						lineHeight: '1.4',
						fontWeight: '400',
					},
				],
				body14: [
					'0.875rem',
					{
						lineHeight: '1.4',
						fontWeight: '400',
					},
				],
				body16: [
					'1rem',
					{
						lineHeight: '1.4',
						fontWeight: '400',
					},
				],
				btn2: [
					'0.875rem',
					{
						lineHeight: '1',
						fontWeight: '700',
					},
				],
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
