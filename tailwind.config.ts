import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			// TODO: rename colors
			// TODO: move to variables (rgba)
			// TODO: use opacity (rgba)
			// TODO: use base size 16 and white color by default

			fontSize: {
				xs: '10px',
				sm: '11px',
				base: '12px',
				lg: '13px',
				xl: '16px',
				'2xl': '20px',
			},
			boxShadow: {
				base: '0 0 4px rgba(255, 255, 255, 1)',
			},
			colors: {
				'dark-bg': '#242429',
				'screen-bg': '#3a3b42',
				'text-opacity': 'rgba(255, 255, 255, 0.35)',
				'tag-bg': 'rgba(46, 46, 51, 1)',
				blue: '#4EBAE9',
				yellow: '#FCC00A',
				orange: '#FBA43A',
				'sub-currency': 'rgba(255, 255, 255, 0.5)',
				'orange-dark': '#6C5508',
				'button-bg': '#141518',
				icon: '#7C7C81',
				'icon-bg': '#404045',
				'input-bg': 'rgba(0, 0, 0, 0.25)',
				'best-orange-bg': 'rgba(var(--best-orange), 0.05)',
				'best-orange-b': 'rgb(var(--best-orange))',
				'best-blue-bg': 'rgba(var(--best-blue), 0.05)',
				'best-blue-b': 'rgb(var(--best-blue))',
				'best-text': 'rgba(108, 85, 8, 1)',
				'refresh-bg': 'rgba(46, 46, 55, 1)',
				'refresh-text': 'rgba(255, 255, 255, 0.25)',
			},
		},
	},
	plugins: [],
};

export default config;
