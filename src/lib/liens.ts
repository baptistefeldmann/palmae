/** Préfixe de déploiement (`/` en production, `/palmae` sur GitHub Pages), sans barre finale. */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Lien interne à partir d'un chemin du site (`/conception`) : à utiliser pour tout `href` interne. */
export const lien = (chemin: string) => `${base}${chemin}`;
