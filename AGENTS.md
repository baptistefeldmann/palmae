## Projet

Site vitrine de Palmæ, paysagiste à La Réunion. Architecture, contenus et points en attente : voir `ARCHITECTURE.md`.

- Astro 7, site statique. Node via nvm : lancer `source ~/.nvm/nvm.sh` avant `npm`/`npx` dans un shell non interactif.
- Tout est en français : contenus, noms de classes CSS, variables, commentaires.
- Infos entreprise, navigation, métiers et options (`null` = inconnu) : `src/config/site.ts`. Ne jamais coder en dur un téléphone, un email ou un texte d'option dans une page.
- Design system (couleurs, échelle typographique, espacements, boutons) : `src/styles/global.css`. Utiliser les variables `--c-*`, `--t-*`, `--e-*` ; styles de composant dans le `<style>` scopé du `.astro`.
- Projets : `src/content/projets/<slug>/index.md` + photos dans le même dossier, schéma dans `src/content.config.ts`. Lire la liste via `getProjets()` de `src/lib/projets.ts` (gère les brouillons).
- Contenus provisoires : texte factice via `lorem()` de `src/lib/lorem.ts` ; photos Unsplash listées dans `PHOTOS-PROVISOIRES.md` ; les 6 projets d'exemple sont en `brouillon: true` (visibles en dev et dans la maquette).
- Un style scopé ne s'applique pas à l'élément racine d'un composant enfant : passer par `:global(...)`.
- Liens internes : toujours `href={lien('/chemin')}` (`src/lib/liens.ts`), jamais `href="/chemin"` : la maquette est servie sous `/palmae` sur GitHub Pages.
- Maquette : `.github/workflows/maquette.yml` publie sur GitHub Pages à chaque push sur `main`, avec `DEMO=true` (brouillons visibles, bandeau, `noindex`). En local : `SITE_URL=https://baptistefeldmann.github.io BASE_PATH=/palmae DEMO=true npm run build`, puis `astro preview` avec les mêmes variables.
- Zod s'importe depuis `astro/zod` (Zod 4).
- `compressHTML: 'jsx'` : les retours à la ligne entre deux éléments en ligne suppriment l'espace ; écrire `{' '}` quand il en faut un.
- Vérifier avec `npx astro check` et `npm run build` avant de conclure.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
