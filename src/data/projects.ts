export type WorkCategory = 'product' | 'marketing' | 'development' | 'automation' | 'fun' | 'meta';

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
  /** Optional images shown on the work detail page (e.g. audit screenshots). */
  detailImages?: { src: string; alt: string; caption?: string }[];
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
  fun: 'Fun Projects and hobbies',
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
      'Working marketing-system demo: landing page capture, lead scoring, scheduler booking, nurture automation, prospect audits, and attribution reporting.',
    details:
      'This is the integrated story behind the individual demos. It shows how a business owner can replace disconnected tools with one connected workflow: traffic lands on a conversion page, forms sync to the CRM with source attribution, ready leads move toward booking through the scheduler, lower-intent leads enter automated nurture flows, sales gets scored prospect audits to prioritize outreach, and the attribution dashboard closes the reporting loop by tying Google Analytics, CRM revenue, and ad spend to channel-level visibility. Open the interactive showcase to walk the demo customer journey, owner view, and tech stack.',
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
      'Conversion-focused, SEO-aware landing page demo for a wellness brand — built for speed, clarity, and lead capture.',
    details:
      'A fully responsive landing page template designed around conversion best practices: a benefit-driven hero, social proof, clear pricing, and a focused call-to-action. Related case-study work showed a 45% conversion lift for a wellness landing-page redesign; this public demo uses representative content to show the pattern. This is the top of the Lead-to-Revenue stack — where paid and organic traffic becomes a tracked lead.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    metrics: [
      { value: '45%', label: 'Case-study lift' },
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
      'Interactive Zapier-HubSpot lead-scoring funnel demo for automated nurture and follow-up routing.',
    details:
      'Leads who are not ready to book enter segmented nurture sequences scored on behavior. High-intent contacts route to sales; everyone else gets automated follow-up. Related automation work has handled 80% of nurture emails in a case-study context; this demo shows the workflow pattern without exposing private client data.',
    techStack: ['Zapier', 'HubSpot', 'Klaviyo', 'Python'],
    metrics: [
      { value: '80%', label: 'Case-study automation' },
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
      'AI-assisted lead audit demo for turning prospect websites into scored opportunities and prioritized outreach recommendations.',
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
      'Channel-level attribution dashboard demo that unifies Google Analytics, CRM revenue, and ad spend into one reporting view.',
    details:
      'The measurement layer of the Lead-to-Revenue stack. This dashboard shows how session and conversion data from Google Analytics, closed-won revenue from the CRM, and spend from Google Ads and Meta can sit in one view. Owners can compare ROAS, cost per lead, and attributed revenue by channel — organic, paid search, paid social, email, and direct — without juggling five separate tools. Demo data is simulated; production builds require live access to GA4, HubSpot, and ad platform APIs.',
    techStack: ['Google Analytics', 'HubSpot CRM', 'Google Ads', 'Meta Ads', 'Attribution'],
    metrics: [
      { value: '5\u21921', label: 'Tools unified' },
      { value: 'Demo', label: 'Spend modeled' },
      { value: 'View', label: 'Channel reporting' },
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
    screenshot: 'images/projects/webdesign/accessibility-suite.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Site-wide accessibility settings: one-tap Light/Dark mode, adjustable text size, high-contrast mode, dyslexia-friendly font, link underlines, reduced motion, and color-blind filters — behind the universal-access icon, persisted per session.',
    details:
      'A drop-in accessibility layer for any site. The headline control swaps the default dark theme for a standard white-background / black-text light mode by inverting the design-token color ramp, so the entire UI flips without rewriting components. Additional controls cover low-vision (text scaling, high contrast), dyslexia (legible typeface, looser line spacing), motor/vestibular (reduced motion), and color vision (protanopia / deuteranopia / tritanopia filters via SVG color matrices). Preferences apply before first paint to avoid a flash and persist for the browser session, so each new visit starts in dark mode. Try it live — tap the neon access icon at the bottom-left of this site.',
    techStack: ['Accessibility', 'WCAG', 'Tailwind v4', 'Design Tokens', 'TypeScript'],
    metrics: [
      { value: '7', label: 'Assistive controls' },
      { value: '3', label: 'Color-vision filters' },
      { value: '0', label: 'Flash on load' },
    ],
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
    repoName: 'provable-roulette',
    displayName: 'Provable Roulette',
    category: 'fun',
    featured: true,
    demoPath: 'demos/provable-roulette/index.html',
    sourceUrl: '',
    description:
      '3D European roulette with real chip betting, provably fair spins, and dual SHA-256 validation — every result auditable in the browser.',
    details:
      'The same verifiable-randomness architecture as Provable Blackjack, applied to European single-zero roulette. Place straight, color, odd/even, high/low, dozen, and column bets with casino chips ($5–$500) from a $1,000 bankroll. Each spin layers three entropy sources — OS CSPRNG, commit-reveal server seed, and the drand public beacon — mixed via SHA-256 into a combined seed that deterministically selects the winning pocket (SHA-256 mod 37). A 3D perspective wheel animates to the verifiable result. Two on-screen validations run every round: (1) spin randomness — commitment match, seed mixing, and pocket derivation reproducibility; and (2) hash chain + proof-of-work mining bound to the full round payload including all bets and payout. Fully client-side static build.',
    techStack: ['Next.js', 'TypeScript', 'Web Crypto', 'drand', 'SHA-256 PoW'],
    metrics: [
      { value: '3', label: 'Entropy sources' },
      { value: '2', label: 'Crypto validations' },
      { value: '37', label: 'European pockets' },
    ],
  },
  {
    repoName: 'provable-blackjack',
    displayName: 'Provable Blackjack',
    category: 'fun',
    featured: false,
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
    screenshot: 'images/projects/webdesign/lighthouse-100.png',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    description:
      'The live showroom you are browsing — built with Astro and Tailwind CSS, deployed to GitHub Pages.',
    details:
      'This site is open source. It uses Astro for static, near-zero-JS pages, Tailwind for styling, Markdown content collections for writing, and a build-time GitHub API integration for stats. Heavy home-page effects (Three.js, GSAP, Lenis) load after idle and skip on mobile; component CSS is inlined to keep first paint fast.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
    metrics: [
      { value: '100', label: 'Lighthouse perf' },
      { value: '100', label: 'Accessibility' },
      { value: '0', label: 'Layout shift (CLS)' },
    ],
    detailImages: [
      {
        src: 'images/projects/webdesign/lighthouse-100.png',
        alt: 'Google Lighthouse report showing perfect 100 scores for Performance, Accessibility, Best Practices, and SEO on mobile',
        caption: 'Mobile Lighthouse audit — June 2026',
      },
    ],
  },
  {
    repoName: 'jelly-button',
    displayName: 'Jelly Button',
    category: 'meta',
    featured: false,
    screenshot: 'images/projects/webdesign/jelly-button.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'A squishy 3D gel call-to-action: glossy highlight, pushable depth base, pointer-anchored click ripple, and elastic wobble on press — honors reduced motion.',
    details:
      'Inspired by tactile jelly CTAs on high-end landing pages, this component layers a raised glossy cap over a darker “socket” so the button visibly presses down on click. A reactive ripple originates from the exact pointer position, and a spring wobble animation retriggers on rapid taps. Used as the primary CTA across project pages and the homepage hero. Try it live — click any “Let\'s Build” or “Book a build audit” jelly button on this site.',
    techStack: ['CSS', '3D UI', 'Micro-interactions', 'Astro'],
    metrics: [
      { value: '0 KB', label: 'Extra JS deps' },
      { value: 'Pure CSS', label: 'Depth + gloss' },
      { value: 'Safe', label: 'Reduced-motion' },
    ],
  },
  {
    repoName: 'speed-reader',
    displayName: 'Speed Reader',
    category: 'meta',
    featured: false,
    screenshot: 'images/projects/webdesign/speed-reader.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Spritz-style speed reading for any page: pulls all paragraph text and flashes it word-by-word at a chosen WPM, with the optimal recognition letter highlighted.',
    details:
      'Adapted from Glance/OpenSpritz (MIT). Tap the blue speed-read button to open a reader bar that harvests visible <p> copy from the page main content, preprocesses words for punctuation-aware pacing, and displays each word with the Spritz pivot letter in emerald. WPM is adjustable (200–800) and saved for the session. Pause, resume, or close with Escape. No external APIs — a self-contained reader engine. Try it live — tap the speed-read button at the top-right of any page.',
    techStack: ['Glance/OpenSpritz', 'Spritz', 'TypeScript', 'Astro'],
    metrics: [
      { value: '200–800', label: 'WPM range' },
      { value: '1 tap', label: 'On any page' },
      { value: '0', label: 'External APIs' },
    ],
  },
  {
    repoName: 'future-fox',
    displayName: 'Future.fox',
    category: 'meta',
    featured: false,
    screenshot: 'images/projects/webdesign/future-fox.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Animated green fox mascot and FAQ chatbot: runs on screen after load, tracks your mouse with its eyes, falls asleep when idle, and answers questions about the site with fuzzy intent matching.',
    details:
      'Future.fox is a persistent site guide disguised as a Firefox-style mascot. The fox runs in 3 seconds after page load, watches pointer movement with obvious eye tracking, and dozes off after 5 seconds of mouse inactivity. Opening the chat reveals an intent-matched FAQ bot filled with portfolio content — services, growth system, demos, case studies, and contact paths — plus dynamic quick-reply chips and markdown-lite responses. Conversation state persists across page navigation for the session. Try it live — tap the fox at the bottom-right of any page.',
    techStack: ['Chatbot', 'Intent Matching', 'SVG Animation', 'Session Storage', 'Astro'],
    metrics: [
      { value: 'FAQ', label: 'Intent-matched bot' },
      { value: 'Eyes', label: 'Track the cursor' },
      { value: 'Session', label: 'Context kept' },
    ],
  },
  {
    repoName: 'touch-fluid',
    displayName: 'Touch-Reactive Fluid',
    category: 'meta',
    featured: false,
    screenshot: 'images/projects/webdesign/touch-fluid.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Lightweight 2D ambient fluid behind the homepage hero — soft emerald blobs with fade trails that react strongly to touch drags on mobile and subtly to mouse movement on desktop.',
    details:
      'Inspired by WebGL fluid backgrounds but implemented as a ~150-line Canvas 2D layer — no heavy simulation, no extra dependencies. Several blobs drift with spring physics; touch and pointer movement add impulses and attraction, with a brighter cursor glow on mobile for obvious feedback. Sits between the atmospheric gradient and the Three.js neural-net canvas using screen blend mode. Respects reduced-motion settings and pauses when the tab is hidden. Try it live — drag your finger across the homepage hero on mobile.',
    techStack: ['Canvas 2D', 'Touch UX', 'Physics', 'Performance', 'TypeScript'],
    metrics: [
      { value: '~150', label: 'Lines of code' },
      { value: '0', label: 'Dependencies' },
      { value: 'Touch', label: 'Reactive on mobile' },
    ],
  },
  {
    repoName: 'magnetic-cta',
    displayName: 'Magnetic CTAs',
    category: 'meta',
    featured: false,
    screenshot: 'images/projects/webdesign/magnetic-cta.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'Primary buttons that gently lean toward your cursor as it approaches, then spring back when it leaves — a subtle "pull" that makes the key actions feel alive on desktop.',
    details:
      'A tiny pointer-tracking layer that gives the most important buttons a magnetic feel. As a fine pointer nears a target, the button translates a few pixels toward the cursor via CSS custom properties (no layout reflow), eased with a springy curve, and releases on pointer-leave. It only activates for fine pointers (mouse/trackpad), stays completely off for touch, and disables itself under reduced-motion preferences. Applied to the hero and project CTAs. Try it live — slowly move your mouse toward any green button on this site.',
    techStack: ['Pointer Events', 'CSS Variables', 'Micro-interactions', 'TypeScript'],
    metrics: [
      { value: 'Desktop', label: 'Fine-pointer only' },
      { value: '0', label: 'Layout shift' },
      { value: 'Safe', label: 'Reduced-motion' },
    ],
  },
  {
    repoName: 'neural-hero',
    displayName: '3D Neural Hero',
    category: 'meta',
    featured: false,
    screenshot: 'images/projects/webdesign/neural-hero.svg',
    demoUrl: 'https://sentientsprite.github.io/portfolio/',
    sourceUrl: '',
    description:
      'The homepage signature: a live Three.js neural network of the lead-to-revenue pipeline — gradient nodes, organic curved edges, and pulses traveling the connections.',
    details:
      'The hero is a real-time WebGL scene built with Three.js that visualizes the growth system as a neural network. Nodes use a blue→purple gradient, connections are quadratic-bezier curves rather than straight lines for an organic feel, and occasional pulses travel along the edges. The layout stays vertical on both desktop and mobile for readability, holds to content width down the page, and is paired with GSAP/Lenis scroll motion. It is the one piece intentionally exclusive to the homepage — every other page inherits the lighter atmosphere + 2D fluid instead. Try it live — it is the animation behind the homepage headline.',
    techStack: ['Three.js', 'WebGL', 'GSAP', 'Lenis', 'TypeScript'],
    metrics: [
      { value: 'WebGL', label: 'Real-time 3D' },
      { value: 'Bezier', label: 'Organic edges' },
      { value: 'Homepage', label: 'Signature hero' },
    ],
  },
];
