import fallbackRaw from '../data/medium-posts.json';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: Date;
  snippet: string;
  categories: string[];
  thumbnail: string | null;
}

const FEED_URL = 'https://medium.com/feed/@raymondking.mktg';

function loadFallback(limit: number): MediumPost[] {
  return (fallbackRaw as Array<Omit<MediumPost, 'pubDate'> & { pubDate: string }>)
    .slice(0, limit)
    .map((post) => ({ ...post, pubDate: new Date(post.pubDate) }));
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

export async function fetchMediumPosts(limit = 6): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'portfolio-site' },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
    const posts: MediumPost[] = [];

    for (const item of items) {
      const title = extractTag(item, 'title');
      const link = extractTag(item, 'link');
      const pub = extractTag(item, 'pubDate');
      if (!title || !link) continue;

      const content =
        extractTag(item, 'content:encoded') ?? extractTag(item, 'description') ?? '';

      posts.push({
        title: decodeEntities(title),
        link: link.split('?')[0],
        pubDate: pub ? new Date(pub) : new Date(),
        snippet: toSnippet(content),
        categories: extractAll(item, 'category').slice(0, 3),
        thumbnail: firstImage(content),
      });
    }

    return posts
      .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
      .slice(0, limit);
  } catch {
    return loadFallback(limit);
  }
}

export async function getMediumPosts(limit = 6): Promise<MediumPost[]> {
  const live = await fetchMediumPosts(limit);
  return live.length > 0 ? live : loadFallback(limit);
}

export const mediumProfileUrl = 'https://medium.com/@raymondking.mktg';
