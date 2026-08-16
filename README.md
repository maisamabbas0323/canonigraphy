
# CANINOGRAPHY — THE LIVING DIGITAL ARCHIVE

An elegant, visually quiet, and premium digital museum archive, cartography atlas, and genetic constellation indexing the historical, geographic, and biological evolution of Earth's canine species.

---

## About

Caninography is a curated digital archive and research-focused platform that documents the evolution, geography, and genetics of domestic and wild canid species. The project combines high-fidelity imagery, structured metadata, geospatial mapping, and interactive phylogenetic visualizations to support scholars, curators, and enthusiasts.

This repository contains the front-end editorial interface, static assets, and build tooling used to produce the Caninography publication and exploratory visualizations.

---

## Design Philosophy & Tokens

This platform is structured around a premium dark editorial aesthetic inspired by high-end museum catalogs, scientific taxonomy databases, and cinematic digital publications.

### Palette
- Background: Absolute Dark `#050505` to `#070707`
- Surfaces: Near-Black Panel `#0D0D0D`
- Borders: Thin separators `rgba(255,255,255,0.05)`
- Typography Primary: Soft Warm-White `#F5F5F2`
- Typography Secondary: Graphite `#8C8C87`
- Accents: Warm gold (used sparingly for highlights)

### Type
- Display: Serif Display (e.g., `Playfair Display`, `Cormorant Garamond`)
- Metadata & Controls: Monospace and minimal Sans-serif

---

## Key Sections (Structural Portals)

- Vol I — Central Registry (Archive): authoritative visual index of breeds and lineages
- Vol II — Cartography (World Atlas): geospatial exploration with node-based mapping
- Vol III — Territory & Biome (Origins): ecological and regional context
- Vol IV — Genetic Matrix (Constellation): interactive phylogenetic node-link visualizations

---

## Features

- Structured breed records with metadata (origin, purpose, era)
- Interactive geography with coordinate-based nodes
- Responsive phylogenetic visualizations rendered to `<canvas>`
- Search, sort, filter, and curated collections
- High-resolution imagery and editorial layout for publication-quality presentation

---

## Technology

- Front-end: modern JavaScript framework (React / Vue / Svelte — see package.json for current choice)
- Build: Vite / Webpack / Rollup (see project config)
- Styling: CSS Modules / Tailwind / Sass (see source styles)
- Mapping: Vector-based map layer(s) and custom canvas renderer for the genetic matrix

Refer to package.json and project config files for the exact dependencies and versions.

---

## Installation

Prerequisites
- Node.js >= 16 (Node 18+ recommended)
- npm >= 8 or yarn / pnpm

Clone the repository

```bash
git clone https://github.com/maisamabbas0323/canonigraphy.git
cd canonigraphy
```

Install dependencies

```bash
npm install
# or
# yarn install
# pnpm install
```

Environment
- If the project uses environment variables, copy or create an `.env` from the example (if provided):

```bash
cp .env.example .env
```

---

## Running Locally

Start the development server (defaults to port 3000)

```bash
npm run dev
```

Visit http://localhost:3000 to view the app in development mode.

---

## Build for Production

Compile production assets and optimize static bundles

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

---

## Testing & Linting

If tests or linters are configured, run:

```bash
npm test
npm run lint
```

Add or update scripts in package.json if these commands are not present.

---

## Content & Data

Data Model (high level)
- Breeds: canonical records with fields such as `name`, `aliases`, `origin`, `coordinates`, `era`, `purpose`, `images`, and `genetic_markers`.
- Regions/Biomes: grouped geographic and ecological metadata for contextualizing origins.
- Genetic links: edge lists describing phylogenetic relationships used by the Genetic Matrix visualization.

Adding new records
- Add structured JSON or markdown files under the `data/` or `content/` directory (see repository structure).
- Provide metadata and associate media in the `static/` or `assets/` directory.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository and create a feature branch: `git checkout -b feat/describe-breed`
2. Implement changes with clear commits
3. Run tests and linters locally
4. Open a pull request describing the change and linking related issues

Guidelines
- Follow the existing code and styling conventions
- Keep commit messages concise and descriptive
- Include examples or screenshots for UI changes

---

## Project Structure (example)

- src/ — application source code
- public/ or static/ — static assets and images
- data/ or content/ — structured records for breeds and regions
- scripts/ — utilities and build helpers
- package.json — scripts and dependency declarations

Adjust to match the actual repo layout.

---

## License

MIT LICENSE 

---

## Contact & Acknowledgements

Repository: https://github.com/maisamabbas0323/canonigraphy

2026. Manufactured for scholarly & visual exploration.
