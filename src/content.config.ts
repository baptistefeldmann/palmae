import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { COMMUNES } from './config/communes';
import { METIER_IDS } from './config/site';

/**
 * Un projet = un dossier `src/content/projets/<slug>/` contenant `index.md`
 * et ses photos, référencées en chemins relatifs (`./couverture.jpg`).
 */
const projets = defineCollection({
	loader: glob({
		pattern: '*/index.md',
		base: './src/content/projets',
		// Le nom du dossier sert d'identifiant et d'URL : /projets/<slug>
		generateId: ({ entry }) => entry.split('/')[0],
	}),
	schema: ({ image }) =>
		z.object({
			/** Nom donné au jardin (« Tamarin ») */
			titre: z.string(),
			/** Description courte affichée sous le nom (« Jardin créole sur les pentes du Tampon ») */
			sousTitre: z.string(),
			commune: z.enum(COMMUNES),
			date: z.coerce.date(),
			prestations: z.array(z.enum(METIER_IDS)).min(1),
			categories: z.array(z.string()).default([]),
			/** En m² */
			surface: z.number().positive().optional(),
			/** En mètres */
			altitude: z.number().nonnegative().optional(),
			/** Durée des travaux, en texte libre (« 3 mois ») */
			duree: z.string().optional(),
			/** Végétaux phares */
			vegetaux: z.array(z.string()).default([]),
			/** Texte court : cartes et description SEO */
			resume: z.string().max(200),
			couverture: image(),
			couvertureAlt: z.string(),
			galerie: z.array(z.object({ src: image(), alt: z.string() })).default([]),
			avantApres: z
				.array(z.object({ avant: image(), apres: image(), legende: z.string().optional() }))
				.default([]),
			temoignage: z.object({ auteur: z.string(), texte: z.string() }).optional(),
			aLaUne: z.boolean().default(false),
			/** Visible en développement uniquement */
			brouillon: z.boolean().default(false),
		}),
});

export const collections = { projets };
