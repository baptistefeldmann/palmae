/**
 * Les 24 communes de La Réunion, triées sans tenir compte de l'article
 * (« Le Tampon » est rangé à T), comme on les cherche dans une liste.
 */
export const COMMUNES = [
	'Les Avirons',
	'Bras-Panon',
	'Cilaos',
	'Entre-Deux',
	"L'Étang-Salé",
	'Petite-Île',
	'La Plaine-des-Palmistes',
	'Le Port',
	'La Possession',
	'Saint-André',
	'Saint-Benoît',
	'Saint-Denis',
	'Saint-Joseph',
	'Saint-Leu',
	'Saint-Louis',
	'Saint-Paul',
	'Saint-Philippe',
	'Saint-Pierre',
	'Sainte-Marie',
	'Sainte-Rose',
	'Sainte-Suzanne',
	'Salazie',
	'Le Tampon',
	'Les Trois-Bassins',
] as const;

export type Commune = (typeof COMMUNES)[number];
