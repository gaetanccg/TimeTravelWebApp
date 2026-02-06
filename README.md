# TimeTravel Agency

SPA vitrine pour une agence fictive de voyage temporel de luxe.
Frontend-only, zéro backend — le chatbot IA appelle l'API Anthropic directement côté client.

## Stack

| Techno        | Version                  | Rôle                                                   |
|---------------|--------------------------|--------------------------------------------------------|
| React         | 19.2                     | UI (composants fonctionnels, hooks)                    |
| Vite          | 7.2                      | Build toolchain, HMR, bundling                         |
| Tailwind CSS  | 4.1                      | Styling utility-first (v4 avec `@theme` et CSS layers) |
| Framer Motion | 12.x                     | Animations (scroll reveal, hover, transitions)         |
| Lucide React  | 0.563                    | Icônes SVG                                             |
| API Anthropic | claude-sonnet-4-20250514 | Chatbot IA conversationnel                             |

## Architecture

```
src/
├── main.jsx                 # Point d'entrée React
├── App.jsx                  # Composant racine, assemble les sections
├── index.css                # Tailwind v4 (@theme, @layer base/components), keyframes
└── components/
    ├── Header.jsx           # Nav sticky, logo glow, menu mobile responsive
    ├── Hero.jsx             # Titre animé, particules CSS, gradient animé
    ├── Destinations.jsx     # 3 cards (Paris 1889, Crétacé -65M, Florence 1504)
    ├── WhyUs.jsx            # 4 blocs features en grid responsive
    ├── Quiz.jsx             # Quiz 4 questions, scoring, résultat personnalisé
    ├── Chatbot.jsx          # Widget flottant, intégration API Anthropic
    └── Footer.jsx           # Navigation, copyright, réseaux sociaux
```

## Quickstart

```bash
# Installation
npm install

# Dev (http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview du build
npm run preview
```

**Pré-requis** : Node.js >= 18

## Design system

- **Thème sombre** : background `#0a0a0f`, surfaces `#1a1a2e`, texte `#f0f0f0`
- **Accent doré** : `#D4AF37` (CTA, bordures, highlights)
- **Typographie** : Inter (Google Fonts), sans-serif
- **Responsive** : mobile-first, breakpoints Tailwind (`sm`, `md`, `lg`)
- **Animations** : fade-in au scroll via `useInView`, hover scale/shadow, gradient animé

Les couleurs et la font sont déclarées dans `@theme` (Tailwind v4).
Les styles custom utilisent `@layer base` et `@layer components` pour respecter la cascade CSS layers.

## Chatbot IA

Le chatbot est un widget flottant (bas droite) qui communique avec l'API Anthropic via `fetch` côté client.

- **Modèle** : `claude-sonnet-4-20250514`
- **Endpoint** : `https://api.anthropic.com/v1/messages`
- **Auth** : l'utilisateur saisit sa clé API dans les settings du widget (icône engrenage)
- **Stockage** : state React uniquement, jamais persisté (ni localStorage, ni cookies)
- **System prompt** : assistant spécialisé TimeTravel Agency, répond en français, connaît les 3 destinations et leurs tarifs

Header requis pour l'appel browser-side : `anthropic-dangerous-direct-browser-access: true`.

## Quiz

Scoring simple sur 4 questions (une réponse par question). Chaque option attribue des points à une des 3 destinations (Paris / Crétacé / Florence). La destination avec le score le plus élevé est recommandée avec une explication personnalisée.

## Déploiement Vercel

Le projet est prêt pour Vercel, aucune configuration spéciale requise :

| Paramètre        | Valeur                              |
|------------------|-------------------------------------|
| Framework preset | Vite                                |
| Build command    | `npm run build`                     |
| Output directory | `dist`                              |
| Variables d'env  | Aucune (clé API saisie côté client) |

## Contributeurs

- CHOLLET Gaëtan
- FAYOLLE Quentin
- RIBES Thibault
- FENZL Romain
