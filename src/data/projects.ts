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
  /**
   * Representative outcome metrics (value + short label). Framed as typical/
   * representative results, not guaranteed client figures.
   */
  metrics?: { value: string; label: string }[];
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
  meta: 'Web Design',
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
    metrics: [
      { value: '45%', label: 'Conversion lift' },
      { value: '<1s', label: 'Load time' },
      { value: '100%', label: 'Mobile responsive' },
    ],
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
    metrics: [
      { value: '30%', label: 'Fewer no-shows' },
      { value: '24/7', label: 'Self-serve booking' },
      { value: '0', label: 'Double-bookings' },
    ],
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
    metrics: [
      { value: '80%', label: 'Follow-up automated' },
      { value: '24/7', label: 'Always-on nurture' },
      { value: '5 hrs/wk', label: 'Manual work saved' },
    ],
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
    metrics: [
      { value: '10x', label: 'Faster prospect audits' },
      { value: '100%', label: 'Prospects scored' },
      { value: '1 click', label: 'Outreach angles' },
    ],
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
    metrics: [
      { value: '5\u21921', label: 'Tools unified' },
      { value: '100%', label: 'Spend attributed' },
      { value: 'Live', label: 'Channel ROI' },
    ],
  },
  {
    repoName: 'feedback-board',
    displayName: 'Anonymous Feedback Board',
    category: 'product',
    featured: false,
    screenshot: 'images/projects/feedback-board.png',
    demoPath: 'demos/feedback-board/index.html',
    sourceUrl: '',
    description:
      'Lightweight anonymous team feedback chat — one shared thread, no names, honest signal for owners and managers.',
    details:
      'A simple tool for collecting unfiltered team feedback without attribution anxiety. Everyone posts into one running chat thread; messages are color-coded and timestamped but never linked to identity. Useful for internal retros, culture pulse checks, or client teams who want candid input. The portfolio demo seeds sample messages and persists posts in-browser; production deployments wire up shared real-time storage so the whole team sees the same board.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Real-time UX'],
  },
  {
    repoName: 'accessibility-suite',
    displayName: 'Accessibility Suite',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Site-wide accessibility settings: one-tap Light/Dark mode, adjustable text size, high-contrast mode, dyslexia-friendly font, link underlines, reduced motion, and color-blind filters — behind the universal-access icon, persisted per session.',
    details:
      'A drop-in accessibility layer for any site. The headline control swaps the default dark theme for a standard white-background / black-text light mode by inverting the design-token color ramp, so the entire UI flips without rewriting components. Additional controls cover low-vision (text scaling, high contrast), dyslexia (legible typeface, looser line spacing), motor/vestibular (reduced motion), and color vision (protanopia / deuteranopia / tritanopia filters via SVG color matrices). Preferences apply before first paint to avoid a flash and persist for the browser session, so each new visit starts in dark mode. Try it live — tap the neon access icon at the bottom-left of this site.',
    techStack: ['Accessibility', 'WCAG', 'Tailwind v4', 'Design Tokens', 'TypeScript'],
  },
  {
    repoName: 'crypto-keypair-demo',
    displayName: 'Bitcoin Keypair Demo',
    category: 'development',
    featured: true,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'A floating "₿" widget that generates a real Bitcoin keypair entirely in your browser — private key (WIF), compressed public key, and P2PKH address — with copy and blur-to-reveal controls. No server, no funds, throwaway keys.',
    details:
      'A client-side demonstration of Bitcoin key generation built on the yours-bitcoin library (moneybutton/yours-bitcoin). Tapping the neon ₿ icon beside the chat mascot lazy-loads the crypto library from a CDN only on demand — keeping it (and its dependency tree) out of the main site bundle — then generates a fresh random private key and derives the matching compressed public key and Base58Check P2PKH address. The private key is shown as WIF behind a blur-to-reveal control, with one-tap copy on every field and an explicit demo-only safety warning. Everything runs locally in the browser with no network calls beyond loading the library and no funds at risk. Try it live — tap the ₿ icon at the bottom-right of this site.',
    techStack: ['Bitcoin', 'yours-bitcoin', 'ECDSA', 'Base58Check', 'Web Crypto', 'TypeScript'],
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
    metrics: [
      { value: '1', label: 'Unified CMO terminal' },
      { value: '10x', label: 'Faster content workflows' },
      { value: 'Live', label: 'Opportunity feeds' },
    ],
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
      'Zephyr implements the Chief of Staff knowledge system: a structured vault (INBOX → CAPTURES → CONNECTIONS → PROJECTS → VELLUM), frictionless capture, one-click inbox processing, daily briefs, weekly connection synthesis, an interactive note graph, and a persistent VELLUM system-prompt editor. Zephyr (via Obsidian) is a private tool I use locally — not a public app. If you have an idea, pattern, suggestion, or question for me, drop it in the suggestion box at the bottom of the home page.',
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
    repoName: 'provable-blackjack',
    displayName: 'Provable Blackjack',
    category: 'development',
    featured: true,
    demoPath: 'demos/provable-blackjack/index.html',
    sourceUrl: '',
    description:
      'Verifiably fair blackjack: every deal is provably random and every hand is bound to a SHA-256 hash chain with proof-of-work — double-validated, fully transparent, in the browser.',
    details:
      'A from-scratch demonstration of verifiable randomness applied to a casino game. Each round layers three entropy sources — the browser/OS CSPRNG (crypto.getRandomValues), a pre-committed server seed revealed after play (commit-reveal), and the drand distributed BLS randomness beacon — mixed via SHA-256 into a single combined seed that drives a deterministic Fisher-Yates shuffle. The app then runs two independent, on-screen cryptographic validations: (1) the deal is provably fair — the revealed seed matches its commitment and re-running the shuffle reproduces the exact deck order; and (2) the hand is mined — a SHA-256 hash chain over the full round payload is brute-forced for a proof-of-work nonce meeting a difficulty target, then re-verified. Both checks show live VERIFIED / FAILED badges so anyone can audit that the cards were truly random and the work was real. Fully client-side static build embedded in this site.',
    techStack: ['Next.js', 'TypeScript', 'Web Crypto', 'drand', 'SHA-256 PoW'],
    metrics: [
      { value: '3', label: 'Entropy sources' },
      { value: '2', label: 'Crypto validations' },
      { value: '100%', label: 'Client-side verifiable' },
    ],
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
  {
    repoName: 'jelly-button',
    displayName: 'Jelly Button',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'A squishy 3D gel call-to-action: glossy highlight, pushable depth base, pointer-anchored click ripple, and elastic wobble on press — honors reduced motion.',
    details:
      'Inspired by tactile jelly CTAs on high-end landing pages, this component layers a raised glossy cap over a darker “socket” so the button visibly presses down on click. A reactive ripple originates from the exact pointer position, and a spring wobble animation retriggers on rapid taps. Used as the primary CTA across project pages and the homepage hero. Try it live — click any “Let\'s Build” or “Book a build audit” jelly button on this site.',
    techStack: ['CSS', '3D UI', 'Micro-interactions', 'Astro'],
  },
  {
    repoName: 'speed-reader',
    displayName: 'Speed Reader',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Spritz-style speed reading for any page: pulls all paragraph text and flashes it word-by-word at a chosen WPM, with the optimal recognition letter highlighted.',
    details:
      'Adapted from Glance/OpenSpritz (MIT). Tap the blue S icon to open a reader bar that harvests visible <p> copy from the page main content, preprocesses words for punctuation-aware pacing, and displays each word with the Spritz pivot letter in emerald. WPM is adjustable (200–800) and saved for the session. Pause, resume, or close with Escape. No external APIs — a self-contained reader engine. Try it live — tap the S icon at the bottom-left of any page.',
    techStack: ['Glance/OpenSpritz', 'Spritz', 'TypeScript', 'Astro'],
  },
  {
    repoName: 'future-fox',
    displayName: 'Future.fox',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Animated green fox mascot and FAQ chatbot: runs on screen after load, tracks your mouse with its eyes, falls asleep when idle, and answers questions about the site with fuzzy intent matching.',
    details:
      'Future.fox is a persistent site guide disguised as a Firefox-style mascot. The fox runs in 3 seconds after page load, watches pointer movement with obvious eye tracking, and dozes off after 5 seconds of mouse inactivity. Opening the chat reveals an intent-matched FAQ bot filled with portfolio content — services, growth system, demos, case studies, and contact paths — plus dynamic quick-reply chips and markdown-lite responses. Conversation state persists across page navigation for the session. Try it live — tap the fox at the bottom-right of any page.',
    techStack: ['Chatbot', 'Intent Matching', 'SVG Animation', 'Session Storage', 'Astro'],
  },
  {
    repoName: 'touch-fluid',
    displayName: 'Touch-Reactive Fluid',
    category: 'meta',
    featured: false,
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Lightweight 2D ambient fluid behind the homepage hero — soft emerald blobs with fade trails that react strongly to touch drags on mobile and subtly to mouse movement on desktop.',
    details:
      'Inspired by WebGL fluid backgrounds but implemented as a ~150-line Canvas 2D layer — no heavy simulation, no extra dependencies. Several blobs drift with spring physics; touch and pointer movement add impulses and attraction, with a brighter cursor glow on mobile for obvious feedback. Sits between the atmospheric gradient and the Three.js neural-net canvas using screen blend mode. Respects reduced-motion settings and pauses when the tab is hidden. Try it live — drag your finger across the homepage hero on mobile.',
    techStack: ['Canvas 2D', 'Touch UX', 'Physics', 'Performance', 'TypeScript'],
  },
];
