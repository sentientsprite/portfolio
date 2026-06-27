# Portfolio Ship

Add or update a project in the showroom and publish to GitHub Pages.

Steps:
1. Edit `src/data/projects.ts` — add/update the `projectOverrides` entry with
   `displayName`, `category`, `description`, `techStack`, and a demo target
   (`demoPath` for internal, `demoUrl` for external public demos). Use
   `sourceUrl: ''` for private/local work.
2. DEMO SAFETY: if using `demoUrl`, confirm it is a public, browser-safe URL.
   Never link a tunnel, local dev server, or app wired to private data.
3. (Optional) add it to the homepage `showcaseOrder` in `src/pages/index.astro`.
4. Run `npm run build` — must pass.
5. Show the user the diff and proposed commit message; commit only on approval.
6. Push to `main` (this triggers the GitHub Pages production deploy).
7. After the Pages build, verify the live URLs:
   - `https://sentientsprite.github.io/portfolio/work/<slug>/`
   - homepage showcase if added.
8. Report the live links.
