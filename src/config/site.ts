/**
 * Informations de l'entreprise et réglages du site.
 * Les valeurs marquées « À COMPLÉTER » sont provisoires (voir ARCHITECTURE.md §7).
 */

export const site = {
	nom: 'Palmæ',
	accroche: 'Jardins & Extérieurs',
	description:
		"Paysagiste à La Réunion : conception, réalisation et entretien de jardins sur toute l'île.",
	zone: "Toute l'île de La Réunion",

	contact: {
		// À COMPLÉTER
		telephone: { affichage: '0692 00 00 00', lien: '+262692000000' },
		// À COMPLÉTER
		email: 'contact@palmae.re',
	},

	// Laisser vide pour masquer le lien. À COMPLÉTER
	reseaux: {
		instagram: '',
		facebook: '',
	},

	formulaire: {
		/** Adresse qui reçoit les demandes de devis (fonction serverless). `null` : envoi désactivé. À COMPLÉTER au déploiement */
		endpoint: null as string | null,
	},
};

/**
 * Points encore inconnus. `null` = inconnu : rien n'est affiché
 * et les textes restent neutres.
 */
export const options: {
	/** Déclaration Services à la personne : affiche le crédit d'impôt 50 % sur la page Entretien. */
	servicesALaPersonne: boolean | null;
	/** Affiche « devis gratuit » dans les boutons et la FAQ. */
	devisGratuit: boolean | null;
	/** Précise dans la page Conception et la FAQ si l'étude est facturée. */
	conceptionPayante: boolean | null;
} = {
	servicesALaPersonne: null,
	devisGratuit: null,
	conceptionPayante: null,
};

export const METIER_IDS = ['conception', 'realisation', 'entretien'] as const;
export type MetierId = (typeof METIER_IDS)[number];

export const metiers: { id: MetierId; titre: string; href: string; resume: string }[] = [
	{
		id: 'conception',
		titre: 'Conception',
		href: '/conception',
		resume: 'Imaginer le jardin : étude du terrain, plans, choix des végétaux.',
	},
	{
		id: 'realisation',
		titre: 'Réalisation',
		href: '/realisation',
		resume: 'Donner vie au projet : aménagement, plantations, maçonnerie paysagère.',
	},
	{
		id: 'entretien',
		titre: 'Entretien',
		href: '/entretien',
		resume: 'Faire durer le jardin : taille, tonte et soins, au fil des saisons.',
	},
];

export const navigation: { libelle: string; href: string; siProjets?: boolean }[] = [
	...metiers.map(({ titre, href }) => ({ libelle: titre, href })),
	// Affiché seulement quand la page Projets existe (voir src/lib/projets.ts)
	{ libelle: 'Projets', href: '/projets', siProjets: true },
	{ libelle: 'À propos', href: '/a-propos' },
];
