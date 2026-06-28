import { site } from '../../config/site';
import { growthSystems } from '../../data/growth-systems';
import { projectOverrides } from '../../data/projects';
import { products } from '../../data/products';
import { withBase } from '../url';

export interface ChatLink {
  label: string;
  href: string;
}

export interface ChatIntent {
  id: string;
  /** Short label used for suggestion chips when this intent is a close match. */
  label?: string;
  /** Words/phrases that boost match score (lowercase). */
  keywords: string[];
  /** Natural-language example questions used for fuzzy matching. */
  questions?: string[];
  response: string;
  links?: ChatLink[];
  quickReplies?: string[];
  /** Opens the in-chat lead capture form after this reply. */
  leadCapture?: boolean;
}

export interface ChatbotConfig {
  ownerName: string;
  botName: string;
  email: string;
  greeting: string;
  fallback: string;
  quickStart: string[];
  intents: ChatIntent[];
}

/** Build FAQ intents from the same data that powers the public site. */
export function buildChatbotConfig(): ChatbotConfig {
  const growth = growthSystems[0];
  const featured = projectOverrides.filter((p) => p.featured && !p.hidden);
  const growthModules = growth.modules
    .map((m) => {
      const p = projectOverrides.find((x) => x.repoName === m.repoName);
      return p ? `• ${m.stageLabel}: ${p.displayName}` : null;
    })
    .filter(Boolean)
    .join('\n');

  const projectList = featured
    .map((p) => `• ${p.displayName} — ${p.description}`)
    .join('\n');

  const skills = site.skills.join(', ');

  const productList = products
    .map((p) => `• ${p.name} (${p.price}) — ${p.description}`)
    .join('\n');

  return {
    ownerName: site.name,
    botName: 'Future.fox',
    email: site.email,
    greeting: `Hey, I'm **Future.fox** — Raymond's AI guide. I can walk you through his services, the Lead-to-Revenue growth system, live demos, case study results, or how to start a project. What are you looking for?`,
    fallback: `I didn't quite catch that — but here are a few things I can help with. Pick one below, or email Raymond directly at ${site.email}.`,
    quickStart: [
      'What does Raymond do?',
      'Lead-to-Revenue system',
      'See live demos',
      'Start a project',
    ],
    intents: [
      {
        id: 'about',
        label: 'About Raymond',
        keywords: [
          'who',
          'about',
          'raymond',
          'background',
          'bio',
          'consultant',
          'you',
          'yourself',
          'introduce',
        ],
        questions: [
          'who is raymond',
          'what does raymond do',
          'tell me about yourself',
          'what is your background',
        ],
        response: `${site.name} is a ${site.title}. ${site.bio}\n\nCore skills: ${skills}.`,
        links: [
          { label: 'Overview', href: withBase('/overview') },
          { label: 'Resume', href: withBase('/resume') },
          { label: 'About on home', href: withBase('/#about') },
        ],
        quickReplies: ['Services', 'Case study results', 'Start a project'],
      },
      {
        id: 'services',
        label: 'Services',
        keywords: [
          'service',
          'services',
          'offer',
          'offering',
          'help',
          'do for',
          'specializ',
          'expertise',
          'hire for',
        ],
        questions: [
          'what services do you offer',
          'what can you help with',
          'what do you specialize in',
        ],
        response: `Raymond builds AI-assisted growth systems for business owners who need more leads, cleaner follow-up, booked appointments, and ROI visibility. Typical engagements cover:\n\n• Lead-to-revenue systems — landing page, CRM capture, scheduler, nurture, and ROI dashboard\n• Conversion websites — fast pages built around inquiry, booking, purchase, or qualified lead capture\n• AI-assisted automation — forms, CRM updates, lead scoring, reminders, and handoffs\n• CRM and follow-up — email/SMS nurture, lead routing, appointment reminders, and pipeline hygiene\n• Analytics and ROI tracking — dashboards that connect traffic, ad spend, leads, bookings, and CRM revenue\n• Interactive tools and demos — practical proof-of-concepts for founders and business owners`,
        links: [
          { label: 'Services section', href: withBase('/#services') },
          { label: 'Work showroom', href: withBase('/work') },
        ],
        quickReplies: ['Lead-to-Revenue system', 'Start a project'],
      },
      {
        id: 'growth-system',
        label: 'Growth system',
        keywords: [
          'growth system',
          'lead-to-revenue',
          'lead to revenue',
          'pipeline',
          'funnel',
          'stack',
          'integrated',
          'full stack',
          'infrastructure',
          'crm',
          'attribution',
          'roi dashboard',
        ],
        questions: [
          'what is the lead to revenue system',
          'how does the growth system work',
          'tell me about the funnel',
        ],
        response: `${growth.name}: ${growth.tagline}\n\n${growth.pitch}\n\nThe five connected modules:\n${growthModules}\n\nTypical outcomes: ${growth.outcomes.map((o) => `${o.value} ${o.label}`).join(' · ')}.`,
        links: [
          { label: 'Explore growth system', href: withBase('/work/growth-system') },
          { label: 'Interactive showcase', href: withBase(growth.demoPath) },
        ],
        quickReplies: ['FieldSync Scheduler', 'Spryte audits', 'Start a project'],
      },
      {
        id: 'fieldsync',
        label: 'FieldSync Scheduler',
        keywords: [
          'fieldsync',
          'scheduler',
          'booking',
          'appointment',
          'calendar',
          'dispatch',
          'field service',
          'schedule',
        ],
        response: `FieldSync Scheduler is a dual-view field-service booking system. Customers get a high-converting booking form; operators get a dispatch console with HubSpot sync, drive-time math, conflict blocking, and SMS confirmation. It's the "Book instantly" layer in the Lead-to-Revenue stack.`,
        links: [
          { label: 'Live demo', href: withBase('/demos/fieldsync-scheduler/index.html') },
          { label: 'Work detail', href: withBase('/work/fieldsync-scheduler') },
        ],
        quickReplies: ['Growth system', 'Start a project'],
      },
      {
        id: 'spryte',
        label: 'Spryte audits',
        keywords: ['spryte', 'audit', 'lead audit', 'prospect', 'outreach', 'scoring'],
        response: `Spryte Lead Audit Tool uses AI to turn prospect websites into scored opportunities with prioritized outreach recommendations. Sales and marketing teams use it to decide who to pursue first — the "Prioritize prospects" step in the growth system.`,
        links: [
          { label: 'Live demo', href: withBase('/demos/spryte-audit/index.html') },
          { label: 'Work detail', href: withBase('/work/spryte') },
        ],
        quickReplies: ['Prana AI', 'Start a project'],
      },
      {
        id: 'prana',
        label: 'Prana AI',
        keywords: [
          'prana',
          'cmo',
          'command center',
          'terminal',
          'ai cmo',
          'local business',
          'competitor',
          'geo',
        ],
        response: `Prana AI CMO Terminal is an AI-powered marketing command center for local businesses. It combines audits, competitor research, SEO/GEO recommendations, content workflows, lead-opportunity feeds, and analytics in one workspace — like a CMO operating room.`,
        links: [
          { label: 'Live demo', href: withBase('/demos/prana-command-center/index.html') },
          { label: 'Work detail', href: withBase('/work/prana') },
        ],
        quickReplies: ['Second brain app', 'Start a project'],
      },
      {
        id: 'zephyr',
        label: 'Second brain app',
        keywords: [
          'zephyr',
          'second brain',
          'obsidian',
          'pkm',
          'knowledge',
          'vault',
          'vellum',
        ],
        response: `Obsidian Based Second Brain (Zephyr) is my private AI knowledge system with an Obsidian-style vault: inbox capture, daily briefs, weekly connections, a graph view, and Chief of Staff chat. Zephyr (via Obsidian) is a private tool I use locally — not a public app. If you have an idea, pattern, suggestion, or question for me, drop it in the suggestion box at the bottom of the home page.`,
        links: [
          { label: 'Leave a suggestion', href: withBase('/#suggest') },
          { label: 'Work detail', href: withBase('/work/zephyr') },
        ],
        quickReplies: ['Prana AI', 'Start a project'],
      },
      {
        id: 'roi',
        label: 'ROI dashboard',
        keywords: [
          'roi',
          'attribution',
          'dashboard',
          'analytics',
          'google analytics',
          'ga4',
          'ad spend',
          'roas',
          'measure',
        ],
        response: `The ROI Attribution Dashboard is the measurement layer of the growth stack. It unifies Google Analytics session data, CRM closed-won revenue, and Google/Meta ad spend into one channel-level ROI view — so owners see what actually drives profit instead of juggling five tools.`,
        links: [
          { label: 'Live demo', href: withBase('/demos/roi-attribution-dashboard/index.html') },
          { label: 'Work detail', href: withBase('/work/roi-attribution-dashboard') },
        ],
        quickReplies: ['Growth system', 'SEO dashboard'],
      },
      {
        id: 'demos',
        label: 'See live demos',
        keywords: [
          'demo',
          'demos',
          'showcase',
          'work',
          'portfolio',
          'project',
          'products',
          'build',
          'built',
          'live',
        ],
        questions: [
          'show me live demos',
          'can i see your work',
          'what have you built',
        ],
        response: `Raymond's showroom includes interactive demos you can open right now:\n\n${projectList}`,
        links: [
          { label: 'All work', href: withBase('/work') },
          { label: 'Home showcase', href: withBase('/#showcase') },
        ],
        quickReplies: ['Growth system', 'Prana AI', 'Start a project'],
      },
      {
        id: 'case-studies',
        label: 'Case study results',
        keywords: [
          'case study',
          'case studies',
          'results',
          'proof',
          'outcome',
          'conversion',
          'lift',
          'roi result',
          'testimonial',
        ],
        questions: [
          'what results have you driven',
          'show me case studies',
          'do you have proof',
        ],
        response: `Selected measurable outcomes:\n\n• E-commerce landing redesign — 45% conversion lift, 28% bounce reduction (wellness brand)\n• Email automation funnel — 80% of nurture emails automated, 35% engagement boost\n• Google Ads overhaul — 3× ROAS within 90 days for a tech startup\n• Epicvue campaigns — 300% conversion surge in peak season, $10k/mo ad budget → 400+ B2B leads\n\nRaymond focuses on systems that compound — not campaigns that fade.`,
        links: [
          { label: 'Case studies', href: withBase('/case-studies') },
          { label: 'Stats on home', href: withBase('/#services') },
        ],
        quickReplies: ['Services', 'Start a project'],
      },
      {
        id: 'seo',
        label: 'SEO & ads',
        keywords: [
          'seo',
          'sem',
          'search',
          'ranking',
          'organic',
          'google ads',
          'ppc',
          'ads',
          'marketing',
        ],
        response: `SEO & SEM are core to Raymond's practice. He's Google Ads and Google Analytics certified (renewed 2025), SEMrush-certified, and has driven results like 120% organic traffic growth, 30% ranking improvements, and managed $5k–$20k/mo ad budgets. He also builds SEO dashboards and GEO recommendations for AI-search visibility.`,
        links: [
          { label: 'SEO dashboard demo', href: withBase('/demos/seo-dashboard/index.html') },
          { label: 'Resume', href: withBase('/resume') },
        ],
        quickReplies: ['Growth system', 'Start a project'],
      },
      {
        id: 'automation',
        label: 'Automation',
        keywords: [
          'automation',
          'automate',
          'zapier',
          'hubspot',
          'email',
          'nurture',
          'workflow',
          'klaviyo',
          'sms',
        ],
        response: `Automation is how Raymond keeps pipelines running 24/7. Examples include Zapier–HubSpot lead scoring, behavior-based nurture sequences (80% automated in a B2B case study), FieldSync SMS confirmations, and Python scripts that cut manual work by 60% for freelance clients.`,
        links: [
          { label: 'Email funnel demo', href: withBase('/demos/email-funnel/index.html') },
          { label: 'Email case study', href: withBase('/case-studies/automated-email-funnel') },
        ],
        quickReplies: ['Growth system', 'Start a project'],
      },
      {
        id: 'store',
        label: 'Store & products',
        keywords: ['store', 'template', 'kit', 'buy', 'purchase', 'product', 'download'],
        response: `The store lists digital products Raymond offers:\n\n${productList}\n\nFor custom builds and growth systems, most clients start with a project conversation rather than an off-the-shelf purchase.`,
        links: [{ label: 'Visit store', href: withBase('/store') }],
        quickReplies: ['Start a project', 'Services'],
      },
      {
        id: 'resume',
        label: 'Resume & experience',
        keywords: [
          'resume',
          'experience',
          'job',
          'career',
          'work history',
          'education',
          'certification',
          'degree',
        ],
        response: `Raymond holds a BA in Business & Marketing from Westminster College (2021). Recent roles include freelance consultant (2025–present), Digital Marketing Specialist at Groove/Epicvue (2024–2025), and Digital Marketing Director at RidgeCrest Herbals (2021–2023). Certifications: Google Ads, Google Analytics, HubSpot Inbound, SEMrush SEO, Klaviyo Email.`,
        links: [{ label: 'Full resume', href: withBase('/resume') }],
        quickReplies: ['Services', 'Start a project'],
      },
      {
        id: 'contact',
        label: 'Contact',
        keywords: [
          'contact',
          'email',
          'reach',
          'talk',
          'call',
          'meet',
          'hello',
          'message',
        ],
        response: `The fastest way to reach Raymond is email at ${site.email}. He works with small businesses and startups on websites, funnels, and growth systems. Share what you're building and he'll bring strategy, code, and automation.`,
        links: [
          { label: 'Contact page', href: withBase('/contact') },
          { label: `Email ${site.email}`, href: `mailto:${site.email}` },
        ],
        quickReplies: ['Start a project'],
        leadCapture: true,
      },
      {
        id: 'hire',
        label: 'Start a project',
        keywords: [
          'hire',
          'project',
          'start',
          'work together',
          'quote',
          'budget',
          'pricing',
          'cost',
          'rate',
          'engagement',
          'need help',
          'looking for',
        ],
        questions: [
          'how do i get started',
          'how much does it cost',
          'i want to hire you',
          'how do we work together',
        ],
        response: `Raymond takes on projects spanning landing pages, full growth stacks, automation, and AI product builds. Typical engagements blend strategy + implementation — not just advice. Tell him what problem you're solving (traffic, leads, bookings, attribution, etc.) and he'll scope the right system.`,
        links: [
          { label: 'Contact page', href: withBase('/contact') },
          { label: 'View work', href: withBase('/work') },
        ],
        quickReplies: ['Share my project details'],
        leadCapture: true,
      },
      {
        id: 'nav',
        keywords: [
          'where',
          'find',
          'page',
          'navigate',
          'blog',
          'home',
          'overview',
        ],
        response: `Site map:\n\n• Home — 3D studio landing with services & showcase\n• Overview — classic portfolio summary\n• Work — full showroom + Lead-to-Revenue system\n• Case Studies — measurable outcomes\n• Resume — experience & certifications\n• Store — digital products\n• Blog — articles (when published)\n• Contact — email & social links`,
        links: [
          { label: 'Home', href: withBase('/') },
          { label: 'Work', href: withBase('/work') },
          { label: 'Contact', href: withBase('/contact') },
        ],
      },
      {
        id: 'greeting',
        label: 'Say hi',
        keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'sup', 'yo'],
        response: `Hey! I'm **Future.fox**, the AI guide for ${site.name}'s portfolio. Ask me about services, the Lead-to-Revenue growth system, live demos, case study numbers, or how to start a project.`,
        quickReplies: ['What does Raymond do?', 'Lead-to-Revenue system', 'Start a project'],
      },
      {
        id: 'thanks',
        keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'helpful', 'great'],
        response: `You're welcome! If you want to go deeper on a specific demo or start a project, just say the word — or email ${site.email} anytime.`,
        quickReplies: ['Start a project', 'See live demos'],
      },
    ],
  };
}
