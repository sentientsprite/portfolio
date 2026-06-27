const rawBase = import.meta.env.BASE_URL;

/**
 * Join the configured site base with a path, producing a correct URL
 * regardless of whether BASE_URL has a trailing slash.
 *
 * withBase('/')          -> '/portfolio/'
 * withBase('/projects')  -> '/portfolio/projects'
 * withBase('projects')   -> '/portfolio/projects'
 */
export function withBase(path = ''): string {
  const base = rawBase.replace(/\/$/, '');
  if (path === '' || path === '/') return `${base}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Resolve a project's embeddable demo URL.
 * Internal demos (demoPath, served from /public) are prefixed with the base.
 * External demos (demoUrl) are returned as-is. Placeholder '#' yields null.
 */
export function resolveDemoUrl(opts: {
  demoPath?: string | null;
  demoUrl?: string | null;
}): string | null {
  if (opts.demoPath) return withBase(opts.demoPath);
  if (opts.demoUrl && opts.demoUrl !== '#') return opts.demoUrl;
  return null;
}

/** Turn a repo/display name into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
