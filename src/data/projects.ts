export type WorkCategory = 'product' | 'marketing' | 'development' | 'automation' | 'meta';

export interface ProjectOverride {
  repoName: string;
  displayName?: string;
  category?: WorkCategory;
  screenshot?: string;
  /** External live demo URL (full https link). */
  demoUrl?: string;
  /** Internal, self-hosted demo served from /public (e.g. 'demos/landing-page/index.html'). */
  demoPath?: string;
  /** Optional public source repository URL. Omit for private/local product work. */
  sourceUrl?: string;
  /** Longer write-up shown on the work detail page. */
  details?: string;
  featured?: boolean;
  hidden?: boolean;
  description?: string;
  techStack?: string[];
}

export const categoryLabels: Record<WorkCategory, string> = {
  product: 'Product Systems',
  marketing: 'Marketing',
  development: 'Development',
  automation: 'Automation',
  meta: 'Site',
};

export const projectOverrides: ProjectOverride[] = [
  {
    repoName: 'prana',
    displayName: 'Prana AI CMO Terminal',
    category: 'product',
    featured: true,
    screenshot: 'images/projects/prana-cmo-terminal.png',
    demoPath: 'demos/prana-command-center/index.html',
    sourceUrl: '',
    description:
      'AI-powered CMO command center for local businesses: audits, competitor research, SEO/GEO recommendations, content workflows, and lead-opportunity feeds. Demo uses Summit Valley Landscaping as an example client with simulated metrics.',
    details:
      'Prana brings marketing operations into one terminal-style workspace. It combines product information, competitor analysis, brand voice, AI chat, SEO/GEO recommendations, article workflows, Reddit/Hacker News opportunity feeds, and analytics into a single operating room for local growth. The desktop/iOS shell wraps the dashboard with Tauri, notification support, and a Mac Mini connection flow.',
    techStack: ['AI Agents', 'Next.js', 'Tauri', 'SEO/GEO', 'Analytics'],
  },
  {
    repoName: 'mission-control',
    displayName: 'Prana Mission Control',
    category: 'product',
    featured: false,
    hidden: true,
    demoPath: 'demos/mission-control/index.html',
    sourceUrl: 'https://github.com/builderz-labs/mission-control',
    description:
      'Agent orchestration dashboard for managing AI task fleets, workflows, skills, logs, costs, schedules, and quality gates.',
    details:
      'Mission Control is the infrastructure layer behind multi-agent operations. It is designed as a single pane of glass for tasks, agents, sessions, memory, logs, cost tracking, cron schedules, security, webhooks, skills, and Aegis-style quality gates. Kept off the public showroom — Prana CMO Terminal is the client-facing product.',
    techStack: ['Next.js 16', 'React 19', 'SQLite', 'WebSockets', 'Agent Ops'],
  },
  {
    repoName: 'spryte',
    displayName: 'Spryte Lead Audit Tool',
    category: 'product',
    featured: true,
    demoPath: 'demos/spryte-audit/index.html',
    sourceUrl: '',
    description:
      'AI-assisted lead audit tool for turning prospect websites into scored opportunities and prioritized outreach recommendations.',
    details:
      'Spryte fits as a lightweight prospecting and audit product: it evaluates lead websites, surfaces SEO/performance issues, and turns the result into a practical sales conversation. It supports the same positioning as Prana: growth systems that connect analysis, automation, and client acquisition.',
    techStack: ['Next.js', 'AI Audit', 'Lead Scoring', 'SEO', 'Zod'],
  },
  {
    repoName: 'NEMO-APP-v.1',
    displayName: 'Sales Pipeline Workspace',
    category: 'product',
    featured: false,
    hidden: true,
    description:
      'Private sales pipeline and agent workspace — not shown publicly.',
    details:
      'Internal tooling for sales pipeline management. Kept off the public showroom.',
    techStack: ['Next.js', 'Agents', 'Dashboard', 'Vercel'],
  },
  {
    repoName: 'landing-page-template',
    displayName: 'Wellness Landing Page',
    category: 'marketing',
    featured: false,
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
    featured: false,
    demoPath: 'demos/email-funnel/index.html',
    description:
      'Interactive Zapier-HubSpot lead-scoring funnel that automated 80% of nurture emails.',
    details:
      'A visual walkthrough of an automated lead-nurture system. Leads are scored on behavior, then routed to sales or into segmented nurture sequences. The interactive diagram lets you hover each stage to see what happens and the metrics it moved.',
    techStack: ['Zapier', 'HubSpot', 'Klaviyo', 'Python'],
  },
  {
    repoName: 'fieldsync-scheduler',
    displayName: 'FieldSync Scheduler',
    category: 'product',
    featured: true,
    screenshot: 'images/projects/fieldsync-scheduler.png',
    demoPath: 'demos/fieldsync-scheduler/index.html',
    sourceUrl: '',
    description:
      'Dual-view field-service scheduler: a high-converting customer booking form on the front, and a dispatch console with HubSpot sync, drive-time math, conflict blocking, and SMS confirmation on the back.',
    details:
      'FieldSync separates what customers see from what dispatch runs. The customer view is a conversion-focused booking flow — service type, address, and real available time windows with no CRM jargon exposed. Behind it, the backend dispatch console runs every appointment through a strict orchestration pipeline: load the customer from HubSpot, calculate traffic-aware drive time via Google Maps, pass five conflict checks (shift hours, job overlaps, drive-block collisions), then atomically write to PostgreSQL and SMS the technician. Customer bookings flow into the audit log and technician timeline automatically. Switch tabs to see both sides of the same system.',
    techStack: ['Node.js', 'PostgreSQL', 'HubSpot', 'Google Maps', 'Twilio'],
  },
  {
    repoName: 'seo-dashboard',
    displayName: 'SEO Performance Dashboard',
    category: 'marketing',
    featured: false,
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
