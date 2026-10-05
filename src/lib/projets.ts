import { getCollection } from 'astro:content';
import { DEMO } from 'astro:env/server';

/** Nombre minimal de projets publiés pour afficher la page Projets et son lien. */
export const SEUIL_PROJETS = 3;

/** Projets du plus récent au plus ancien. Les brouillons ne sont visibles qu'en développement et dans la maquette. */
export async function getProjets() {
	const projets = await getCollection('projets', ({ data }) => import.meta.env.DEV || DEMO || !data.brouillon);
	return projets.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function afficherProjets() {
	return (await getProjets()).length >= SEUIL_PROJETS;
}
