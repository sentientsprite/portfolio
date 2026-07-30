/** Shared copy for the seven value offerings added to the showroom. */

export const NEMO_SCORE_URL = 'https://nemo-app-v-1.vercel.app/';
export const SPRYTE_URL = 'https://spryte-site.vercel.app/';

/**
 * Gateway CTA strategy (matches Spryte / Nemo product sites):
 * 1. Free product value first (audit or visibility score)
 * 2. Human follow-up second (consult) — no pressure to hire from the form alone
 * 3. Zephyr “Leave a suggestion” stays tertiary / sidebar, not a hero conversion path
 */
export const gatewayCtas = {
  audit: {
    id: 'audit',
    label: 'Run a free audit',
    href: SPRYTE_URL,
    external: true as const,
  },
  score: {
    id: 'score',
    label: 'Free visibility score',
    href: NEMO_SCORE_URL,
    external: true as const,
  },
  consult: {
    id: 'consult',
    label: 'Book a free consult',
    href: '/contact#intake',
    external: false as const,
  },
} as const;

export const bookingNiches = [
  {
    id: 'hvac',
    label: 'HVAC',
    business: 'Peak Peak Heating & Cooling',
    job: 'AC tune-up',
    slots: [
      { time: '9 – 11 AM', note: 'Earliest' },
      { time: '11 AM – 1 PM', note: 'Most popular' },
      { time: '1 – 3 PM', note: 'Afternoon' },
    ],
    sms: 'Visit confirmed for 11 AM – 1 PM. Tech en route — you\'ll get a reminder.',
    techA: 'Tech A',
    techB: 'Tech B',
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    business: 'Clearline Plumbing',
    job: 'Leak inspection',
    slots: [
      { time: '8 – 10 AM', note: 'Morning' },
      { time: '10 AM – 12 PM', note: 'Most popular' },
      { time: '2 – 4 PM', note: 'Afternoon' },
    ],
    sms: 'Plumber booked for 10 AM – 12 PM. You\'ll get a text when they\'re on the way.',
    techA: 'Crew A',
    techB: 'Crew B',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    business: 'Ridgecrest Wellness',
    job: 'Consult',
    slots: [
      { time: '9:00 AM', note: 'Open' },
      { time: '11:30 AM', note: 'Most popular' },
      { time: '3:00 PM', note: 'Later' },
    ],
    sms: 'Your consult is confirmed for 11:30 AM. A reminder will arrive 24 hours before.',
    techA: 'Provider A',
    techB: 'Provider B',
  },
  {
    id: 'electrical',
    label: 'Electrical',
    business: 'Brightpath Electric',
    job: 'Panel check',
    slots: [
      { time: '7 – 9 AM', note: 'Early' },
      { time: '12 – 2 PM', note: 'Most popular' },
      { time: '4 – 6 PM', note: 'Evening' },
    ],
    sms: 'Electrician confirmed for 12 – 2 PM. Drive-time checked — no double-book.',
    techA: 'Spark A',
    techB: 'Spark B',
  },
] as const;

export type BookingNicheId = (typeof bookingNiches)[number]['id'];

export const moduleQuiz = {
  title: 'Which module do you need?',
  subtitle: 'Five quick questions. Get a pointed recommendation — then open the matching demo or book a consult.',
  questions: [
    {
      id: 'pain',
      prompt: 'Where does it hurt most right now?',
      options: [
        { id: 'traffic', label: 'Traffic doesn’t convert', tags: ['capture'] },
        { id: 'booking', label: 'People inquire but don’t book', tags: ['convert'] },
        { id: 'followup', label: 'Follow-up is manual / inconsistent', tags: ['nurture'] },
        { id: 'priority', label: 'Sales doesn’t know who to call first', tags: ['prospect'] },
        { id: 'reporting', label: 'I can’t tell which channel works', tags: ['measure'] },
      ],
    },
    {
      id: 'traffic',
      prompt: 'How do most leads find you?',
      options: [
        { id: 'ads', label: 'Paid ads / search', tags: ['capture', 'measure'] },
        { id: 'local', label: 'Google Business / local search', tags: ['capture', 'prospect'] },
        { id: 'referral', label: 'Referrals / word of mouth', tags: ['convert', 'nurture'] },
        { id: 'mixed', label: 'A mix — hard to say', tags: ['measure', 'capture'] },
      ],
    },
    {
      id: 'booking',
      prompt: 'How do appointments get on the calendar?',
      options: [
        { id: 'phone', label: 'Mostly phone / back-and-forth', tags: ['convert'] },
        { id: 'form', label: 'Form → someone books them later', tags: ['convert', 'nurture'] },
        { id: 'self', label: 'Self-serve scheduler already', tags: ['nurture', 'measure'] },
        { id: 'none', label: 'We don’t really book appointments', tags: ['capture', 'prospect'] },
      ],
    },
    {
      id: 'followup',
      prompt: 'What happens after someone doesn’t buy/book immediately?',
      options: [
        { id: 'manual', label: 'Someone remembers to email/call', tags: ['nurture'] },
        { id: 'none', label: 'Often nothing', tags: ['nurture', 'convert'] },
        { id: 'auto', label: 'Automated sequences already', tags: ['measure', 'prospect'] },
        { id: 'crm', label: 'CRM tasks — still hit-or-miss', tags: ['nurture', 'prospect'] },
      ],
    },
    {
      id: 'reporting',
      prompt: 'Can you answer “what did we spend vs what we booked” this month?',
      options: [
        { id: 'no', label: 'Not really', tags: ['measure'] },
        { id: 'spread', label: 'Only in spreadsheets / gut feel', tags: ['measure'] },
        { id: 'partial', label: 'Ads tools say one thing, CRM another', tags: ['measure', 'capture'] },
        { id: 'yes', label: 'Pretty clearly', tags: ['prospect', 'convert'] },
      ],
    },
  ],
  results: {
    capture: {
      stage: 'Capture intent',
      product: 'Wellness Landing Page',
      href: '/work/landing-page-template',
      demo: '/demos/landing-page/index.html',
      blurb: 'Tighten the page that turns traffic into a tracked lead — clear offer, form, and source attribution.',
    },
    convert: {
      stage: 'Book instantly',
      product: 'FieldSync Scheduler',
      href: '/work/fieldsync-scheduler',
      demo: '/demos/fieldsync-scheduler/index.html',
      blurb: 'Close the gap between interest and a booked slot — with conflict checks and confirmation.',
    },
    nurture: {
      stage: 'Nurture automatically',
      product: 'Email Automation Funnel',
      href: '/work/email-automation',
      demo: '/demos/email-funnel/index.html',
      blurb: 'Stop relying on memory. Route ready leads to sales and keep everyone else in a scored sequence.',
    },
    prospect: {
      stage: 'Prioritize prospects',
      product: 'Spryte Lead Audit Tool',
      href: '/work/spryte',
      demo: 'https://spryte-site.vercel.app/',
      blurb: 'Score who to pursue first so outreach time goes to the highest-likelihood opportunities.',
    },
    measure: {
      stage: 'Report attribution',
      product: 'ROI Attribution Dashboard',
      href: '/work/roi-attribution-dashboard',
      demo: '/demos/roi-attribution-dashboard/index.html',
      blurb: 'Put GA4, CRM revenue, and ad spend in one owner-facing view so channel decisions get clearer.',
    },
  },
} as const;

export const pricingBands = [
  {
    id: 'conversion-site',
    name: 'Conversion site',
    eyebrow: 'Band 1',
    range: 'Typical starting point',
    timeline: '2–4 weeks',
    summary: 'A fast, focused site or landing system built around one primary action: inquire, book, or buy.',
    includes: [
      'Conversion-focused page(s) + mobile layout',
      'Tracked form / CTA wiring',
      'Basic analytics events',
      'Launch checklist + handoff notes',
    ],
    notIncludes: ['Full CRM automation', 'Multi-channel attribution dashboard'],
    bestFor: 'Owners who need a clearer front door before stacking automation.',
    cta: 'Start with a site',
    featured: false,
  },
  {
    id: 'growth-slice',
    name: 'Growth stack slice',
    eyebrow: 'Band 2',
    range: 'Most common engagement',
    timeline: '4–8 weeks',
    summary: 'One painful gap in the funnel — booking, nurture, scoring, or reporting — connected to what you already run.',
    includes: [
      'Scoped module (scheduler, nurture, audit, or reporting)',
      'CRM / tool integration where access allows',
      'Owner walkthrough of the new flow',
      'Demo-quality documentation',
    ],
    notIncludes: 'Full five-module rebuild in one pass',
    bestFor: 'Businesses that already get traffic but lose leads after the click.',
    cta: 'Fix the bottleneck',
    featured: true as boolean,
  },
  {
    id: 'full-system',
    name: 'Lead-to-revenue system',
    eyebrow: 'Band 3',
    range: 'Fuller build',
    timeline: '8–14 weeks',
    summary: 'Connected capture → book/nurture → prioritize → report loop, tailored to your tools and niche.',
    includes: [
      'Multi-module system design + implementation',
      'Source attribution through the stack',
      'Owner outcomes view (leads, bookings, channel clarity)',
      'Training + iteration window after launch',
    ],
    notIncludes: 'Guaranteed ROAS or lead volume (traffic & offer still matter)',
    bestFor: 'Operators ready to replace disconnected tools with one inspectable workflow.',
    cta: 'Scope a full system',
    featured: false,
  },
] as const;

export const consultClips = [
  {
    id: 'agenda',
    title: 'What we cover in the free hour',
    duration: '2 min read',
    summary: 'Bottleneck first, then tools, then the smallest next build that would move booked leads.',
    beats: [
      'Where leads enter today (ads, GBP, referrals, site)',
      'What happens after the form or call',
      'Whether booking, nurture, or reporting is the real gap',
      'A clear next step — not a 40-page proposal',
    ],
  },
  {
    id: 'prep',
    title: 'What to bring (optional)',
    duration: '1 min read',
    summary: 'You don’t need a deck. A few links and honest numbers help.',
    beats: [
      'Current website or landing URL',
      'CRM or inbox you use for leads (even if messy)',
      'Rough monthly ad/organic spend if known',
      'One recent lead that went wrong — and why',
    ],
  },
  {
    id: 'fit',
    title: 'When I’m a fit (and when I’m not)',
    duration: '2 min read',
    summary: 'Best for owners who want systems they can inspect — not vanity redesigns.',
    beats: [
      'Fit: home services, local, wellness, B2B with a real booking/inquiry flow',
      'Fit: willing to connect tools (CRM, forms, calendar, analytics)',
      'Not a fit: “just make it pretty” with no conversion goal',
      'Not a fit: guaranteed ranking or lead-volume promises',
    ],
  },
  {
    id: 'after',
    title: 'What happens after the call',
    duration: '1 min read',
    summary: 'You leave with a written next step — whether we work together or not.',
    beats: [
      'Short recap email with the bottleneck named',
      'Recommended band (site / slice / full system) if useful',
      'Links to the demos that match your gap',
      'No obligation to continue',
    ],
  },
] as const;

export const stackNodes = [
  {
    id: 'traffic',
    label: 'Traffic',
    detail: 'SEO, Ads, GBP, referrals',
    failure: 'Spend without a tracked landing destination.',
    fix: 'Capture intent',
    href: '/work/landing-page-template',
  },
  {
    id: 'landing',
    label: 'Landing',
    detail: 'Offer + form + CTA',
    failure: 'Vague pages, untracked forms, weak primary action.',
    fix: 'Conversion landing',
    href: '/work/landing-page-template',
  },
  {
    id: 'crm',
    label: 'CRM',
    detail: 'Source + score',
    failure: 'Leads sit in inbox; no source or score.',
    fix: 'Sync + score',
    href: '/work/growth-system',
  },
  {
    id: 'scheduler',
    label: 'Scheduler',
    detail: 'Book + confirm',
    failure: 'Phone tag and double-books.',
    fix: 'FieldSync',
    href: '/work/fieldsync-scheduler',
  },
  {
    id: 'nurture',
    label: 'Email / SMS',
    detail: 'Follow-up loops',
    failure: 'No touch after the first inquiry.',
    fix: 'Automation funnel',
    href: '/work/email-automation',
  },
  {
    id: 'attribution',
    label: 'Attribution',
    detail: 'Spend → booked',
    failure: 'Five tools, no owner view.',
    fix: 'ROI dashboard',
    href: '/work/roi-attribution-dashboard',
  },
] as const;

export const ownerTools = [
  {
    href: '/checklist',
    title: 'Lead-leak checklist',
    body: 'Printable one-pager: find where inquiries die.',
    external: false,
  },
  {
    href: SPRYTE_URL,
    title: 'Run a free audit',
    body: 'Spryte — paste a site URL, get a scored homepage audit and honest next step.',
    external: true,
  },
  {
    href: '/quiz',
    title: 'Module quiz',
    body: 'Five questions → the demo that matches your bottleneck.',
    external: false,
  },
  {
    href: '/booking-preview',
    title: 'Booking by niche',
    body: 'FieldSync loop dressed as HVAC, plumbing, wellness, or electrical.',
    external: false,
  },
  {
    href: NEMO_SCORE_URL,
    title: 'Free visibility score',
    body: 'Nemo Local — GBP-style local visibility score for home services.',
    external: true,
  },
  {
    href: '/consult',
    title: 'Consult roadmap',
    body: 'Exactly what the free hour covers — before you book.',
    external: false,
  },
  {
    href: '/pricing',
    title: 'Engagement bands',
    body: 'Site · stack slice · full system — clear scopes.',
    external: false,
  },
] as const;

export const checklistDownloadHref = '/downloads/lead-leak-checklist.html';
