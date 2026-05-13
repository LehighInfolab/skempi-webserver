# SKEMPI2Mech

Structural and mechanistic annotations of SKEMPI 2.0 protein interactions.

Live site: **https://skempi2mech.vercel.app**

## Project structure

```
├── public/
│   ├── data/
│   │   └── Final_quotes.csv   # dataset (static asset, fetched at runtime)
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DataTable.js       # paginated results table
│   │   └── SearchBar.js       # field/term search form
│   ├── data/
│   │   └── dataset.js         # CSV loader and client-side search/pagination
│   ├── pages/
│   │   ├── Browse.js          # browse + search view
│   │   ├── Download.js        # CSV download
│   │   ├── Home.js
│   │   └── Statistics.js
│   └── App.js
├── vercel.json                 # SPA fallback routing
└── package.json
```

## Local development

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. The full CSV is fetched and parsed in the browser on first visit to Browse (~2 k rows); search and pagination are instant after that.

## Production build

```bash
npm run build
```

Output goes to `build/`. Vercel runs this automatically on deploy — no manual build step needed.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Create React App. Leave all settings at defaults (build command `npm run build`, output `build`).
4. Click **Deploy**.

`vercel.json` at the repo root handles client-side routing so that direct links to `/browse`, `/statistics`, etc. work correctly.

## Dataset

`public/data/Final_quotes.csv` is the authoritative copy of the dataset. It is served as a plain static file — no database required. Anyone with site access can download it, which is intentional for an open research database.

Columns: `PDB`, `Mutation`, `Mechanism`, `Citation`, `Quote` (delimiter: `|||`).
