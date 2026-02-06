# TimeTravel Agency

Webapp pour une agence fictive de voyage temporel de luxe.

## Stack technique

- **React** (Vite)
- **Tailwind CSS** v4
- **Framer Motion** — animations au scroll, hover, transitions
- **Lucide React** — icônes
- **API Anthropic** — chatbot IA (appel côté client)

## Fonctionnalités

- **Header** sticky avec navigation et logo lumineux
- **Hero** avec gradient animé et particules dorées
- **3 Destinations** interactives (Paris 1889, Crétacé -65M, Florence 1504) avec animations au scroll
- **Section "Pourquoi nous choisir"** — 4 blocs en grid responsive
- **Quiz de recommandation** — 4 questions avec scoring et résultat personnalisé
- **Chatbot IA** — widget flottant connecté à l'API Anthropic (clé API saisie par l'utilisateur, non persistée)
- **Footer** avec navigation et liens réseaux sociaux

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build production

```bash
npm run build
```

## Déploiement Vercel

Le projet est prêt pour un déploiement sur Vercel :

1. Connecter le repo sur [vercel.com](https://vercel.com)
2. Framework preset : **Vite**
3. Build command : `npm run build`
4. Output directory : `dist`

## Chatbot

Le chatbot utilise l'API Anthropic directement côté client. L'utilisateur doit saisir sa clé API dans les paramètres du widget (icône engrenage). La clé est stockée uniquement en mémoire React et n'est jamais persistée.

## Contribution

- CHOLLET Gaëtan
- FAYOLLE Quentin
- RIBES Thibault
- FENZL Romain
