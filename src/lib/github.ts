import { site } from '../config/site';
import { projectOverrides, type WorkCategory } from '../data/projects';
import { slugify } from './url';

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  topics: string[];
}

export interface MergedProject {
  name: string;
  slug: string;
  displayName: string;
  category: WorkCategory;
  description: string;
  details: string | null;
  htmlUrl: string | null;
  demoUrl: string | null;
  demoPath: string | null;
  stars: number;
  language: string | null;
  screenshot: string | null;
  techStack: string[];
  featured: boolean;
  sortOrder: number;
  growthSystemId: string | null;
  growthSystemStage: string | null;
  metrics: { value: string; label: string }[];
  detailImages: { src: string; alt: string; caption?: string }[];
}

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  topLanguages: { language: string; count: number }[];
  recentRepos: { name: string; pushedAt: string }[];
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-site',
  };
  if (import.meta.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchGitHub<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const data = await fetchGitHub<GitHubRepo[]>(
    `https://api.github.com/users/${site.githubUsername}/repos?sort=updated&per_page=100`,
  );
  return data ?? [];
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const repos = await fetchRepos();

  const languageCounts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
    }
  }

  const topLanguages = Object.entries(languageCounts)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    publicRepos: repos.length,
    totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    topLanguages,
    recentRepos: repos.slice(0, 5).map((r) => ({
      name: r.name,
      pushedAt: r.pushed_at,
    })),
  };
}

export async function getMergedProjects(): Promise<MergedProject[]> {
  const repos = await fetchRepos();
  const repoMap = new Map(repos.map((repo) => [repo.name, repo]));

  // The Work page is an intentional showroom, not a raw GitHub repo dump.
  // Repos only appear when they have a curated override with a strong demo,
  // case-study angle, or explicit reason to be shown.
  const merged: MergedProject[] = projectOverrides
    .filter((override) => !override.hidden)
    .map((override, sortOrder) => {
      const repo = repoMap.get(override.repoName);

      return {
        name: override.repoName,
        slug: slugify(override.repoName),
        displayName: override.displayName ?? override.repoName,
        category: override.category ?? 'development',
        description:
          override.description ?? repo?.description ?? 'Curated project.',
        details: override.details ?? null,
        htmlUrl:
          override.sourceUrl === undefined
            ? repo?.html_url ?? `https://github.com/${site.githubUsername}/${override.repoName}`
            : override.sourceUrl || null,
        demoUrl: override.demoUrl ?? repo?.homepage ?? null,
        demoPath: override.demoPath ?? null,
        stars: repo?.stargazers_count ?? 0,
        language: repo?.language ?? override.techStack?.[0] ?? null,
        screenshot: override.screenshot ?? null,
        techStack: override.techStack ?? (repo?.language ? [repo.language] : []),
        featured: override.featured ?? false,
        sortOrder,
        growthSystemId: override.growthSystemId ?? null,
        growthSystemStage: override.growthSystemStage ?? null,
        metrics: override.metrics ?? [],
        detailImages: override.detailImages ?? [],
      };
    });

  const categoryOrder: WorkCategory[] = ['product', 'marketing', 'development', 'automation', 'fun', 'meta'];

  return merged.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.sortOrder - b.sortOrder;
  });
}

export function getContributionGraphUrl(): string {
  return `https://ghchart.rshah.org/${site.githubUsername}`;
}
