export type WorkCategory = 'marketing' | 'development' | 'automation' | 'meta';

export interface ProjectOverride {
  repoName: string;
  displayName?: string;
  category?: WorkCategory;
  screenshot?: string;
  demoUrl?: string;
  featured?: boolean;
  hidden?: boolean;
  description?: string;
  techStack?: string[];
}

export const categoryLabels: Record<WorkCategory, string> = {
  marketing: 'Marketing',
  development: 'Development',
  automation: 'Automation',
  meta: 'Site',
};

export const projectOverrides: ProjectOverride[] = [
  {
    repoName: 'landing-page-template',
    displayName: 'Landing Page Template',
    category: 'marketing',
    featured: true,
    demoUrl: '#',
    description:
      'High-converting landing page template with SEO optimization and responsive design.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    repoName: 'email-automation',
    displayName: 'Email Automation Funnel',
    category: 'automation',
    featured: true,
    description:
      'Zapier-HubSpot integration for automated lead scoring and email nurture sequences.',
    techStack: ['Zapier', 'HubSpot', 'Python'],
  },
  {
    repoName: 'portfolio',
    displayName: 'This Website',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    description:
      'The live showroom you are browsing — built with Astro and Tailwind CSS, deployed to GitHub Pages.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
  },
];
