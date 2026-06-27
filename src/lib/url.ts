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
