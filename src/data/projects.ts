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
  /** When set, this project appears as a module inside the named growth system. */
  growthSystemId?: string;
  /** Short label for the module's role in the growth system flow. */
  growthSystemStage?: string;
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
    repoName: 'growth-system',
    displayName: 'Lead-to-Revenue Growth System',
    category: 'product',
    featured: true,
    demoPath: 'demos/growth-system/index.html',
    sourceUrl: '',
    description:
      'Full-stack growth infrastructure: landing page capture, lead scoring, scheduler booking, nurture automation, prospect audits, and ROI attribution — all tracked from click to revenue.',
    details:
      'This is the integrated story behind the individual demos. A business owner gets one connected system instead of disconnected tools: traffic lands on a conversion page, forms sync to the CRM with source attribution, high-intent leads book instantly through the scheduler, lower-intent leads enter automated nurture flows, sales gets scored prospect audits to prioritize outreach, and the ROI Attribution Dashboard closes the loop — tying Google Analytics, CRM revenue, and ad spend to channel-level ROI. Open the interactive showcase to walk the full customer journey, owner view, and tech stack.',
    techStack: ['Landing Pages', 'HubSpot', 'Scheduling', 'Email Automation', 'ROI Attribution'],
  },
  {
    repoName: 'landing-page-template',
    displayName: 'Wellness Landing Page',
    category: 'marketing',
    growthSystemId: 'lead-to-revenue',
    growthSystemStage: 'Capture intent',
    demoPath: 'demos/landing-page/index.html',
    description:
      'High-converting, SEO-optimized landing page for a wellness brand — built for speed and conversions.',
    details:
      'A fully responsive landing page template designed around conversion best practices: a benefit-driven hero, social proof, clear pricing, and a focused call-to-action. A/B tested copy and visuals drove a 45% lift in conversions for the original client. This is the top of the Lead-to-Revenue stack — where paid and organic traffic becomes a tracked lead.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    repoName: 'fieldsync-scheduler',
    displayName: 'FieldSync Scheduler',
    category: 'product',
    growthSystemId: 'lead-to-revenue',
    growthSystemStage: 'Book instantly',
    screenshot: 'images/projects/fieldsync-scheduler.png',
    demoPath: 'demos/fieldsync-scheduler/index.html',
    sourceUrl: '',
    description:
      'Dual-view scheduler: a customer booking form on the front, dispatch console with conflict blocking and SMS confirmation on the back.',
    details:
      'FieldSync converts interest into booked appointments. The customer view is a conversion-focused booking flow; the backend runs HubSpot sync, traffic-aware drive times, conflict checks, and technician SMS confirmation. In the full growth system, scheduler bookings are attributed back to the landing page and campaign that sourced the lead.',
    techStack: ['Node.js', 'PostgreSQL', 'HubSpot', 'Google Maps', 'Twilio'],
  },
  {
    repoName: 'email-automation',
    displayName: 'Email Automation Funnel',
    category: 'automation',
    growthSystemId: 'lead-to-revenue',
    growthSystemStage: 'Nurture automatically',
    demoPath: 'demos/email-funnel/index.html',
    description:
      'Interactive Zapier-HubSpot lead-scoring funnel that automated 80% of nurture emails.',
    details:
      'Leads who are not ready to book enter segmented nurture sequences scored on behavior. High-intent contacts route to sales; everyone else gets automated follow-up. In the integrated stack, this layer keeps pipeline warm while the scheduler handles ready-to-buy leads.',
    techStack: ['Zapier', 'HubSpot', 'Klaviyo', 'Python'],
  },
  {
    repoName: 'spryte',
    displayName: 'Spryte Lead Audit Tool',
    category: 'product',
    growthSystemId: 'lead-to-revenue',
    growthSystemStage: 'Prioritize prospects',
    demoPath: 'demos/spryte-audit/index.html',
    sourceUrl: '',
    description:
      'AI-assisted lead audit tool for turning prospect websites into scored opportunities and prioritized outreach recommendations.',
    details:
      'Spryte helps sales and marketing prioritize who to pursue. It evaluates prospect websites, surfaces gaps, and outputs a scored opportunity with outreach angles. In the growth system, it complements inbound capture by giving outbound teams the same data-driven rigor.',
    techStack: ['Next.js', 'AI Audit', 'Lead Scoring', 'SEO', 'Zod'],
  },
  {
    repoName: 'roi-attribution-dashboard',
    displayName: 'ROI Attribution Dashboard',
    category: 'product',
    growthSystemId: 'lead-to-revenue',
    growthSystemStage: 'Measure ROI',
    demoPath: 'demos/roi-attribution-dashboard/index.html',
    sourceUrl: '',
    description:
      'Channel-level ROI dashboard that unifies Google Analytics, CRM revenue, and ad spend so owners see what actually drives profit.',
    details:
      'The measurement layer of the Lead-to-Revenue stack. This dashboard pulls session and conversion data from Google Analytics, closed-won revenue from the CRM, and spend from Google Ads and Meta into one view. Owners compare ROAS, cost per lead, and attributed revenue by channel — organic, paid search, paid social, email, and direct — without juggling five separate tools. Simulated demo data; production builds wire live GA4, HubSpot, and ad platform APIs.',
    techStack: ['Google Analytics', 'HubSpot CRM', 'Google Ads', 'Meta Ads', 'Attribution'],
  },
  {
    repoName: 'feedback-board',
    displayName: 'Anonymous Feedback Board',
    category: 'product',
    featured: false,
    demoPath: 'demos/feedback-board/index.html',
    sourceUrl: '',
    description:
      'Lightweight anonymous team feedback chat — one shared thread, no names, honest signal for owners and managers.',
    details:
      'A simple tool for collecting unfiltered team feedback without attribution anxiety. Everyone posts into one running chat thread; messages are color-coded and timestamped but never linked to identity. Useful for internal retros, culture pulse checks, or client teams who want candid input. The portfolio demo seeds sample messages and persists posts in-browser; production deployments wire up shared real-time storage so the whole team sees the same board.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Real-time UX'],
  },
  {
    repoName: 'prana',
    displayName: 'Prana AI CMO Terminal',
    category: 'product',
    featured: true,
    screenshot: 'images/projects/prana-cmo-terminal.png',
    demoPath: 'demos/prana-command-center/index.html',
    sourceUrl: '',
    description:
      'AI-powered CMO command center for local businesses: audits, competitor research, SEO/GEO recommendations, content workflows, and lead-opportunity feeds.',
    details:
      'Prana brings marketing operations into one terminal-style workspace. It combines product information, competitor analysis, brand voice, AI chat, SEO/GEO recommendations, article workflows, Reddit/Hacker News opportunity feeds, and analytics into a single operating room for local growth.',
    techStack: ['AI Agents', 'Next.js', 'Tauri', 'SEO/GEO', 'Analytics'],
  },
  {
    repoName: 'zephyr',
    displayName: 'Obsidian Based Second Brain',
    category: 'product',
    featured: true,
    screenshot: 'images/projects/zephyr-pkm.jpg',
    sourceUrl: '',
    description:
      'Private AI-powered second brain with Obsidian vault structure — inbox capture, daily briefs, weekly connections, graph view, and Chief of Staff chat.',
    details:
      'Zephyr implements the Chief of Staff knowledge system: a structured vault (INBOX → CAPTURES → CONNECTIONS → PROJECTS → VELLUM), frictionless capture, one-click inbox processing, daily briefs, weekly connection synthesis, an interactive note graph, and a persistent VELLUM system-prompt editor. This is a personal tool I run locally against my Obsidian vault — not a public live demo. Visitors can leave ideas via the suggestion box on this page; I import those into `01-CAPTURES/suggestions` in the vault.',
    techStack: ['Next.js', 'AI PKM', 'Obsidian Vault', 'Graph View', 'Workflows'],
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
      'Mission Control is the infrastructure layer behind multi-agent operations. Kept off the public showroom — Prana CMO Terminal is the client-facing product.',
    techStack: ['Next.js 16', 'React 19', 'SQLite', 'WebSockets', 'Agent Ops'],
  },
  {
    repoName: 'NEMO-APP-v.1',
    displayName: 'Sales Pipeline Workspace',
    category: 'product',
    featured: false,
    hidden: true,
    description: 'Private sales pipeline and agent workspace — not shown publicly.',
    details: 'Internal tooling for sales pipeline management. Kept off the public showroom.',
    techStack: ['Next.js', 'Agents', 'Dashboard', 'Vercel'],
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
      'A client-facing SEO dashboard that turns raw analytics into a story: organic growth, keyword movement, top pages, and conversion impact. Standalone reporting tool — separate from the ROI Attribution Dashboard in the growth system.',
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
      'This site is open source. It uses Astro for static, near-zero-JS pages, Tailwind for styling, Markdown content collections for writing, and a build-time GitHub API integration for stats.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
  },
];
