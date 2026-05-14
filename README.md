# SKEMPI2Mech

Structural and mechanistic annotations of SKEMPI 2.0 protein interactions.

Live site: **https://lehighinfolab.github.io/skempi-webserver**

## Project structure

```
├── public/
│   ├── data/
│   │   └── Final_quotes.csv   # dataset (static asset, fetched at runtime)
│   ├── 404.html               # GitHub Pages SPA routing fallback
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
└── package.json
```

## Local development

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. The full CSV is fetched and parsed in the browser on first visit to Browse (~2 k rows); search and pagination are instant after that.

## Deploying to GitHub Pages

### First-time setup

1. **Create the GitHub repo** (e.g. `lehighinfolab/skempi-webserver`).

2. **If the repo name differs** from `skempi-webserver`, update two places before deploying:
   - `"homepage"` in `package.json` → `https://<org>.github.io/<repo-name>`
   - `basename` in `src/App.js` → `"/<repo-name>"`

3. **Install dependencies** (includes `gh-pages`):
   ```bash
   npm install
   ```

4. **Push your code** to the `main` branch:
   ```bash
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/lehighinfolab/skempi-webserver.git
   git push -u origin main
   ```

5. **Deploy** (builds the app and pushes to the `gh-pages` branch):
   ```bash
   npm run deploy
   ```

6. **Enable GitHub Pages** in the repo settings:
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `gh-pages` / folder: `/ (root)`
   - Click **Save**

The site will be live at `https://lehighinfolab.github.io/skempi-webserver` within a minute or two.

### Subsequent deployments

Any time you update the code, run:

```bash
npm run deploy
```

This rebuilds and pushes to `gh-pages`. The `main` branch is not deployed automatically — only the output of `npm run deploy` goes live.

## How client-side routing works on GitHub Pages

GitHub Pages serves static files and returns a 404 for any path it doesn't recognize (e.g. `/skempi-webserver/browse`). Two files work together to fix this:

- `public/404.html` — GitHub Pages serves this on any unmatched path; it immediately redirects back to `index.html` while encoding the original path in the query string.
- `public/index.html` — contains a script that reads the encoded path and restores it with `history.replaceState` before React loads, so React Router sees the correct URL.

## Dataset

`public/data/Final_quotes.csv` is the authoritative copy of the dataset. It is served as a plain static file — no database required. Anyone with site access can download it, which is intentional for an open research database.

Columns: `PDB`, `Mutation`, `Mechanism`, `Citation`, `Quote` (delimiter: `|||`).
