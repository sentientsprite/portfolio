# Raymond King — Portfolio

A fast, modern portfolio website built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages.

## Features

- Dark minimalist design with emerald accent
- Homepage with about section and featured projects
- Projects page with GitHub API integration
- Blog and case studies powered by Markdown content collections
- Resume page with downloadable PDF
- Store section with product cards (external checkout links)
- GitHub stats and contribution graph
- Contact page with social links and feeds
- Fully responsive, minimal JavaScript

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/portfolio/](http://localhost:4321/portfolio/) in your browser.

## Customize

### Personal info

Edit [`src/config/site.ts`](src/config/site.ts):

- Name, title, bio, email
- GitHub username and social URLs

### Resume

- On-page content: [`src/data/resume.ts`](src/data/resume.ts)
- Downloadable PDF: replace [`public/resume.pdf`](public/resume.pdf)

### Projects

- GitHub repos are fetched automatically at build time
- Add screenshots, demo links, and overrides in [`src/data/projects.ts`](src/data/projects.ts)

### Blog & Case Studies

Add Markdown files to:

- [`src/content/blog/`](src/content/blog/)
- [`src/content/case-studies/`](src/content/case-studies/)

### Store

Edit product cards in [`src/data/products.ts`](src/data/products.ts).

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Create a new repo named `portfolio` (or any name you prefer).

### 2. Update Astro config

Edit [`astro.config.mjs`](astro.config.mjs):

```js
export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/portfolio', // match your repo name; omit for username.github.io repos
  // ...
});
```

- **Project site** (`username.github.io/repo-name`): set `base` to `'/repo-name'`
- **User site** (`username.github.io`): remove the `base` option entirely
- **Custom domain**: set `site` to your domain, remove `base`, add `public/CNAME`

### 3. Push to GitHub

```bash
git add .
git commit -m "Initial portfolio site"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings** → **Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**

### 5. Deploy

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs automatically on every push to `main`. Your site will be live at:

```
https://YOUR_GITHUB_USERNAME.github.io/portfolio/
```

### Optional: GitHub API rate limits

For higher API rate limits during build, the workflow already passes `GITHUB_TOKEN`. For local builds with many repos, set:

```bash
export GITHUB_TOKEN=your_personal_access_token
npm run build
```

## Project Structure

```
src/
├── config/site.ts          # Site-wide settings
├── content/                # Markdown blog & case studies
├── data/                   # Resume, projects, products data
├── components/             # Reusable UI components
├── layouts/                # Page layouts
├── lib/github.ts           # GitHub API helpers
├── pages/                  # Route pages
└── styles/global.css       # Global styles + Tailwind
```

## Build

```bash
npm run build    # Build static site to dist/
npm run preview  # Preview production build locally
```
