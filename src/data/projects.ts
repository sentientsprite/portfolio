export type WorkCategory = 'marketing' | 'development' | 'automation' | 'meta';

export interface ProjectOverride {
  repoName: string;
  displayName?: string;
  category?: WorkCategory;
  screenshot?: string;
  /** External live demo URL (full https link). */
  demoUrl?: string;
  /** Internal, self-hosted demo served from /public (e.g. 'demos/landing-page/index.html'). */
  demoPath?: string;
  /** Longer write-up shown on the work detail page. */
  details?: string;
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
    displayName: 'Wellness Landing Page',
    category: 'marketing',
    featured: true,
    demoPath: 'demos/landing-page/index.html',
    description:
      'High-converting, SEO-optimized landing page for a wellness brand — built for speed and conversions.',
    details:
      'A fully responsive landing page template designed around conversion best practices: a benefit-driven hero, social proof, clear pricing, and a focused call-to-action. A/B tested copy and visuals drove a 45% lift in conversions for the original client. Explore the live demo to scroll through the full experience.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    repoName: 'email-automation',
    displayName: 'Email Automation Funnel',
    category: 'automation',
    featured: true,
    demoPath: 'demos/email-funnel/index.html',
    description:
      'Interactive Zapier-HubSpot lead-scoring funnel that automated 80% of nurture emails.',
    details:
      'A visual walkthrough of an automated lead-nurture system. Leads are scored on behavior, then routed to sales or into segmented nurture sequences. The interactive diagram lets you hover each stage to see what happens and the metrics it moved.',
    techStack: ['Zapier', 'HubSpot', 'Klaviyo', 'Python'],
  },
  {
    repoName: 'seo-dashboard',
    displayName: 'SEO Performance Dashboard',
    category: 'marketing',
    featured: true,
    demoPath: 'demos/seo-dashboard/index.html',
    description:
      'A clean reporting dashboard surfacing organic traffic, rankings, and conversion trends.',
    details:
      'A client-facing SEO dashboard that turns raw analytics into a story: organic growth, keyword movement, top pages, and conversion impact. Explore the live demo to interact with the metric cards and charts.',
    techStack: ['Analytics', 'SEMrush', 'Data Viz'],
  },
  {
    repoName: 'portfolio',
    displayName: 'This Website',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    description:
      'The live showroom you are browsing — built with Astro and Tailwind CSS, deployed to GitHub Pages.',
    details:
      'This site is open source. It uses Astro for static, near-zero-JS pages, Tailwind for styling, Markdown content collections for writing, and a build-time GitHub API integration for stats. Deployed automatically to GitHub Pages on every push.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
  },
];
