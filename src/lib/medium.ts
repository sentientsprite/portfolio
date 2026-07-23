import fallbackRaw from '../data/medium-posts.json';

export interface MediumPost {
  title: string;
  link: string;
  slug: string;
  pubDate: Date;
  snippet: string;
  categories: string[];
  thumbnail: string | null;
  /** Sanitized HTML body from Medium RSS `content:encoded`. */
  contentHtml: string;
}

type FallbackPost = Omit<MediumPost, 'pubDate'> & { pubDate: string };

const FEED_URL = 'https://medium.com/feed/@raymondking.mktg';

function loadFallback(limit?: number): MediumPost[] {
  const rows = fallbackRaw as FallbackPost[];
  const sliced = typeof limit === 'number' ? rows.slice(0, limit) : rows;
  return sliced.map((post) => ({
    ...post,
    slug: post.slug || slugFromLink(post.link),
    contentHtml: post.contentHtml ?? '',
    pubDate: new Date(post.pubDate),
  }));
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripCdata(value: string): string {
  const match = value.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (match ? match[1] : value).trim();
}

function extractTag(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = block.match(re);
  return match ? stripCdata(match[1]) : null;
}

function extractAll(block: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'gi');
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    out.push(stripCdata(m[1]));
  }
  return out;
}

function toSnippet(html: string, max = 180): string {
  const text = decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function firstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : null;
}

export function slugFromLink(link: string): string {
  const path = link.split('?')[0].replace(/\/$/, '');
  const part = path.split('/').pop() || 'post';
  return part
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Strip scripts/iframes/handlers from Medium HTML before rendering. */
export function sanitizeMediumHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}

function parseFeed(xml: string, limit?: number): MediumPost[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  const posts: MediumPost[] = [];

  for (const item of items) {
    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link');
    const pub = extractTag(item, 'pubDate');
    if (!title || !link) continue;

    const content =
      extractTag(item, 'content:encoded') ?? extractTag(item, 'description') ?? '';
    const cleanLink = link.split('?')[0];

    posts.push({
      title: decodeEntities(title),
      link: cleanLink,
      slug: slugFromLink(cleanLink),
      pubDate: pub ? new Date(pub) : new Date(),
      snippet: toSnippet(content),
      categories: extractAll(item, 'category').slice(0, 3),
      thumbnail: firstImage(content),
      contentHtml: sanitizeMediumHtml(content),
    });
  }

  const sorted = posts.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

/** Prefer live RSS; fall back to cached JSON when the feed is empty or unreachable. */
function mergeWithFallback(live: MediumPost[], limit?: number): MediumPost[] {
  const fallback = loadFallback();
  const bySlug = new Map<string, MediumPost>();

  for (const post of fallback) bySlug.set(post.slug, post);
  for (const post of live) {
    const prev = bySlug.get(post.slug);
    // Keep cached body if live feed somehow returns empty content.
    bySlug.set(post.slug, {
      ...post,
      contentHtml: post.contentHtml || prev?.contentHtml || '',
    });
  }

  const merged = [...bySlug.values()].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );
  return typeof limit === 'number' ? merged.slice(0, limit) : merged;
}

export async function fetchMediumPosts(limit?: number): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'portfolio-site' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml, limit);
  } catch {
    return [];
  }
}

export async function getMediumPosts(limit = 6): Promise<MediumPost[]> {
  const live = await fetchMediumPosts();
  if (live.length === 0) return loadFallback(limit);
  return mergeWithFallback(live, limit);
}

export async function getAllMediumPosts(): Promise<MediumPost[]> {
  const live = await fetchMediumPosts();
  if (live.length === 0) return loadFallback();
  return mergeWithFallback(live);
}

export async function getMediumPostBySlug(slug: string): Promise<MediumPost | undefined> {
  const posts = await getAllMediumPosts();
  return posts.find((p) => p.slug === slug);
}

export const mediumProfileUrl = 'https://medium.com/@raymondking.mktg';
