/**
 * Texte factice provisoire (lorem ipsum) pour les pages dont le contenu n'est pas encore écrit.
 * Chaque appel est à remplacer par le vrai texte.
 */
const PHRASES = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	'Curabitur pretium tincidunt lacus, nulla gravida orci a odio.',
	'Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
	'Integer in mauris eu nibh euismod gravida.',
	'Duis ac tellus et risus vulputate vehicula.',
	'Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.',
	'Maecenas fermentum consequat mi, donec fermentum pellentesque malesuada.',
	'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
];

/** Renvoie `phrases` phrases factices, en commençant à la phrase `depart` (déterministe). */
export function lorem(phrases = 3, depart = 0): string {
	return Array.from({ length: phrases }, (_, i) => PHRASES[(depart + i) % PHRASES.length]).join(' ');
}
