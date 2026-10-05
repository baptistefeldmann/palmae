// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// À COMPLÉTER : domaine définitif (voir ARCHITECTURE.md §7).
	// SITE_URL et BASE_PATH permettent de publier ailleurs, par ex. la maquette sur GitHub Pages (/palmae)
	site: process.env.SITE_URL ?? 'https://www.palmae.re',
	base: process.env.BASE_PATH ?? '/',

	env: {
		schema: {
			/** Maquette de démonstration : brouillons visibles, bandeau « maquette », pages non indexées */
			DEMO: envField.boolean({ context: 'server', access: 'public', default: false }),
		},
	},

	// Polices téléchargées au build et servies par le site (aucun appel à Google côté visiteur)
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Bodoni Moda',
			cssVariable: '--font-bodoni',
			weights: [400, 500],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Didot', 'Bodoni 72', 'serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Jost',
			cssVariable: '--font-jost',
			weights: [300, 400, 500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
	],

	image: {
		layout: 'constrained',
		responsiveStyles: true,
	},
});
