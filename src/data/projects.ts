export interface ProjectOverride {
  repoName: string;
  screenshot?: string;
  demoUrl?: string;
  featured?: boolean;
  hidden?: boolean;
  description?: string;
  techStack?: string[];
}

export const projectOverrides: ProjectOverride[] = [
  {
    repoName: 'portfolio',
    featured: true,
    description:
      'A fast, modern portfolio site built with Astro and Tailwind CSS, deployed to GitHub Pages.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
  },
  {
    repoName: 'landing-page-template',
    featured: true,
    demoUrl: '#',
    description:
      'High-converting landing page template with SEO optimization and responsive design.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    repoName: 'email-automation',
    featured: true,
    description:
      'Zapier-HubSpot integration for automated lead scoring and email nurture sequences.',
    techStack: ['Zapier', 'HubSpot', 'Python'],
  },
];
