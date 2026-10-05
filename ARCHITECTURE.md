# Palmæ — Architecture du site

Site vitrine de **Palmæ — Jardins & Extérieurs**, paysagiste à La Réunion.
Trois métiers : **Conception · Réalisation · Entretien**.
Objectif principal : générer des demandes de devis qualifiées.

---

## 1. Arborescence

```
/                          Accueil
├── /conception            Conception (étude, plans, choix des végétaux)
├── /realisation           Réalisation (aménagement, plantations, maçonnerie paysagère)
├── /entretien             Entretien (contrat annuel, interventions ponctuelles)
├── /projets               Galerie des jardins          ← générée seulement à partir de 3 projets publiés
│   └── /projets/[slug]    Fiche d'un jardin
├── /a-propos              L'entreprise, la personne, les valeurs
├── /devis                 Formulaire de devis + coordonnées
│   └── /devis/merci       Confirmation d'envoi
├── /mentions-legales
├── /confidentialite
└── /404
```

**Menu principal :** Logo · Conception · Réalisation · Entretien · Projets* · À propos · **[Demander un devis]**
\* entrée affichée automatiquement dès 3 projets publiés.

Mobile : menu burger + bouton d'appel direct (`tel:`).

**Pied de page :** coordonnées, zone d'intervention, liens des pages, réseaux sociaux, mentions légales.

**Nommage :** « Réalisation » désigne le métier (reprise du logo), « Projets » désigne le portfolio, pour éviter la confusion Réalisation / Réalisations.

---

## 2. Contenu des pages

### Accueil
1. Hero plein écran : photo + accroche + bouton devis
2. Les 3 métiers (3 cartes vers les pages dédiées)
3. Projets à la une (3–4) — *section masquée tant qu'il n'y a pas de projets*
4. Notre démarche : premier contact → visite → proposition → chantier → suivi
5. Avis clients — *section masquée tant qu'il n'y en a pas*
6. Zone d'intervention (La Réunion)
7. Rappel devis

### Pages métier (gabarit commun ×3)
1. Présentation + photo
2. Ce qui est compris
3. Déroulé
4. Projets liés (automatique, filtrés par métier)
5. FAQ
6. Bouton devis pré-rempli (`/devis?prestation=<métier>`)

Spécificités :
- **Entretien** : formules (contrat annuel / ponctuel). Le bloc crédit d'impôt 50 % n'est affiché que si le drapeau `servicesALaPersonne` est activé (voir §5).
- **FAQ** : pistes propres au contexte réunionnais — préparation avant la saison cyclonique (élagage, sécurisation), arrosage en saison sèche, microclimats des Hauts et des Bas, végétaux endémiques/indigènes et espèces envahissantes.

### Page Projets (inspirée de demeuresmarines.com)
Chaque jardin porte un nom (Tamarin, Alizé, Vétiver…), comme les biens de Demeures Marines.
- En-tête : « Chaque jardin porte un nom »
- Projet à la une (`aLaUne`) en grand format : photo pleine largeur, nom en très grand, sous-titre
- Grille de deux colonnes en quinconce : photo, commune · année, nom, sous-titre
- Pas de filtres tant qu'il y a moins d'une dizaine de projets

### Fiche d'un jardin
- En-tête plein écran : photo de couverture, commune · année, nom, sous-titre
- Fiche « Le jardin » : commune, altitude, surface, prestations, durée des travaux, année, végétaux phares
- Texte poétique (corps du Markdown), avec lettrine
- Avant/après avec curseur (si photos disponibles)
- Galerie en mosaïque (une photo large, deux demi-largeurs)
- Témoignage client (facultatif)
- Deux autres jardins + bouton devis pré-rempli avec la première prestation

### À propos
- L'entreprise et l'origine du nom : *Palmae*, nom botanique historique de la famille des palmiers
- Quatre valeurs
- Le paysagiste : Antoine Feldmann (texte rédigé d'après son CV), portrait à venir
- Parcours (formation et expériences), distinctions et publications
- Zone d'intervention
- À ajouter : assurances (décennale)

### Formulaire de devis (3 étapes)
1. **Le projet** : métier(s) (choix multiple), type de client (particulier / professionnel / copropriété), description
2. **Le terrain** : commune (liste des 24 communes de La Réunion), surface approximative (par tranches), budget indicatif (facultatif), échéance, photos (facultatif, 5 maximum)
3. **Coordonnées** : nom, email, téléphone (formats 0262 / 0692 / 0693 / +262), créneau de rappel, consentement RGPD

Traitement : anti-spam (champ piège + Cloudflare Turnstile), email au paysagiste, accusé de réception au client, redirection vers `/devis/merci`.
Formulation neutre (« Demander un devis ») tant que la gratuité n'est pas confirmée.

---

## 3. Modèle de contenu

### Projet — `src/content/projets/<slug>/index.md` (photos dans le même dossier)

| Champ | Type | Obligatoire |
|---|---|---|
| `titre` | nom du jardin (« Tamarin ») | oui |
| `sousTitre` | description courte (« Jardin créole sur les pentes du Tampon ») | oui |
| `commune` | l'une des 24 communes | oui |
| `date` | date | oui |
| `prestations` | `conception` \| `realisation` \| `entretien` (liste) | oui |
| `categories` | liste libre (terrasse, bassin, massifs, potager, clôture, arrosage…) | non |
| `surface` | nombre (m²) | non |
| `altitude` | nombre (m) | non |
| `duree` | durée des travaux, texte libre | non |
| `vegetaux` | végétaux phares (liste) | non |
| `resume` | texte court (cartes + description SEO) | oui |
| `couverture` | image | oui |
| `couvertureAlt` | texte alternatif de la couverture | oui |
| `galerie` | liste de `{ src, alt }` | non |
| `avantApres` | liste de `{ avant, apres, legende }` | non |
| `temoignage` | `{ auteur, texte }` | non |
| `aLaUne` | booléen | non (faux par défaut) |
| `brouillon` | booléen | non (faux par défaut) |
| *corps du fichier* | texte poétique de présentation du jardin | oui |

Les projets `brouillon: true` sont visibles en développement et exclus du build de production. Cela permet de construire les gabarits avec des projets fictifs sans les publier.

Pas de CMS : les projets sont ajoutés par le développeur en Markdown. Un CMS git-based (Sveltia/Decap) pourra être ajouté plus tard sans refonte si le paysagiste veut devenir autonome.

---

## 4. Architecture technique

| Brique | Choix |
|---|---|
| Framework | Astro (génération statique) |
| Contenu | Content collections Astro, schémas typés (zod) |
| Images | `astro:assets` — AVIF/WebP, `srcset`, lazy loading |
| Formulaire | Fonction serverless + envoi via Brevo |
| Anti-spam | Champ piège + Cloudflare Turnstile |
| Hébergement | Cloudflare Pages ou Netlify (à trancher au déploiement) |
| Maquette | GitHub Pages, `baptistefeldmann.github.io/palmae`, build en mode `DEMO` (brouillons visibles, bandeau « maquette », `noindex`) |
| Domaine | Suggestion : un `.re` (extension de La Réunion) |
| Statistiques de visite | Plausible / Umami (sans cookies → pas de bandeau) ou aucune |
| SEO | Balises par page, sitemap.xml, JSON-LD `LocalBusiness`, fiche Google Business Profile (hors site) |
| Fuseau horaire | `Indian/Reunion` (UTC+4) pour les dates des emails |

### Arborescence du code

```
palmae/
├── public/                     favicon, robots.txt
├── src/
│   ├── assets/                 logo, photos génériques
│   ├── config/site.ts          infos entreprise, navigation, options (voir §5)
│   ├── config/communes.ts      les 24 communes
│   ├── lib/projets.ts          lecture des projets (brouillons, seuil d'affichage)
│   ├── lib/lorem.ts            texte factice provisoire
│   ├── styles/global.css       design system
│   ├── content/
│   │   └── projets/<slug>/     index.md + photos
│   ├── content.config.ts       schémas des collections
│   ├── components/             Header, Footer, EnTetePage, Introduction,
│   │                           ListePrestations, Etapes, Faq, AppelDevis,
│   │                           CarteProjet, ProjetsLies, AvantApres, Galerie,
│   │                           PlanEsquisse, FormulaireDevis
│   ├── layouts/                BaseLayout
│   └── pages/                  index, conception, realisation, entretien,
│                               projets/[...index], projets/[slug], a-propos,
│                               devis/, devis/merci, mentions-legales,
│                               confidentialite, 404
└── functions/                  traitement du formulaire de devis
```

---

## 5. Configuration centralisée — `src/config/site.ts`

Toutes les informations métier et les points encore inconnus sont dans un seul fichier, pour les brancher plus tard sans toucher aux gabarits :

- Identité : nom, accroche, téléphone, email, adresse, SIRET, réseaux sociaux
- Zone d'intervention : libellé + communes couvertes
- Options (`null` = inconnu : rien n'est affiché, textes neutres) :
  - `servicesALaPersonne` — affiche le crédit d'impôt 50 % sur la page Entretien
  - `devisGratuit` — adapte la formulation des boutons et de la FAQ
  - `conceptionPayante` — adapte la page Conception et la FAQ

---

## 6. Direction visuelle

Dérivée du logo : sobre, éditoriale, haut de gamme.
- Titres : serif Didone contrasté (type Bodoni Moda)
- Texte : sans-serif fin (type Jost)
- Couleurs : blanc cassé, noir ; le vert vient des photos, pas de l'interface
- Grandes photos, beaucoup d'espace blanc

---

## 7. Points en attente

| Sujet | Impact | Par défaut en attendant |
|---|---|---|
| Déclaration Services à la personne | Bloc crédit d'impôt sur Entretien | Masqué |
| Devis gratuit ? | Formulations, FAQ | « Demander un devis » (neutre) |
| Conception payante ? | Page Conception, FAQ | Pas de mention de prix |
| Photos de projets | Page Projets, section accueil | 6 projets fictifs en brouillon, photos Unsplash (voir `PHOTOS-PROVISOIRES.md`) |
| Photos génériques (hero, métiers) | Toutes les pages | Photos Unsplash provisoires (voir `PHOTOS-PROVISOIRES.md`) |
| Textes des pages métier | Conception, Réalisation, Entretien | Titres réels, paragraphes en lorem ipsum (`lorem()`) |
| Portrait d'Antoine | À propos | Bloc « Portrait à venir » |
| Délai de rappel | Devis, merci | « Sous 48 heures ouvrées » (texte inventé, à valider) |
| Zone exacte (toute l'île ou un secteur) | Accueil, SEO | Toute l'île |
| Coordonnées, SIRET, assurances | Pied de page, mentions légales, À propos | Valeurs factices dans `site.ts` |
| Domaine, hébergeur | Déploiement | À décider avant mise en ligne |

---

## 8. Feuille de route

1. ~~**Socle** : initialisation Astro, design system (typographies, couleurs, espacements), layouts, header/footer~~
2. **Pages** : ~~3 pages métier, À propos~~ — reste : vraie page d'accueil, pages légales, 404
3. **Devis** : ~~formulaire 3 étapes (interface)~~ — reste : fonction d'envoi + Turnstile
4. ~~**Projets** : gabarits galerie et fiche, avec projets fictifs en brouillon~~
5. **SEO & performance** : métadonnées, JSON-LD, sitemap, audit Lighthouse
6. **Mise en ligne** : domaine, hébergement, Google Business Profile
7. **Plus tard** : premiers vrais projets, CMS si besoin, blog

---

## Annexe — Consignes photo à transmettre au paysagiste

Pour pouvoir alimenter la page Projets dès les prochains chantiers :
- Photographier **systématiquement l'avant**, avant tout début de travaux
- Noter ou repérer les points de prise de vue pour refaire **l'après sous le même angle**
- Format paysage, sans zoom numérique ; éviter le plein soleil de midi (lumière du matin ou de fin d'après-midi)
- Ajouter quelques photos verticales (affichage mobile) et des gros plans (végétaux, matériaux)
- Repasser **3 à 6 mois après** pour les plantations : la croissance est rapide en climat tropical, c'est le meilleur « après »
