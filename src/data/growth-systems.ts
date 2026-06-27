export type GrowthSystemRole =
  | 'capture'
  | 'convert'
  | 'nurture'
  | 'prospect'
  | 'measure';

export interface GrowthSystemModule {
  repoName: string;
  role: GrowthSystemRole;
  stageLabel: string;
  ownerBenefit: string;
}

export interface GrowthSystem {
  id: string;
  name: string;
  tagline: string;
  pitch: string;
  demoPath: string;
  modules: GrowthSystemModule[];
  outcomes: { value: string; label: string }[];
}

export const growthSystems: GrowthSystem[] = [
  {
    id: 'lead-to-revenue',
    name: 'Lead-to-Revenue Growth System',
    tagline: 'From click to customer — tracked, automated, and measurable.',
    pitch:
      'A full-stack growth stack for business owners who need more than a website. Capture intent on a conversion landing page, score and route leads automatically, book appointments without phone tag, nurture prospects who are not ready yet, and audit new opportunities with data — all connected through CRM sync and attribution tracking.',
    demoPath: 'demos/growth-system/index.html',
    modules: [
      {
        repoName: 'landing-page-template',
        role: 'capture',
        stageLabel: 'Capture intent',
        ownerBenefit: 'High-converting landing pages with tracked forms and clear CTAs.',
      },
      {
        repoName: 'fieldsync-scheduler',
        role: 'convert',
        stageLabel: 'Book instantly',
        ownerBenefit: 'Self-serve scheduling that reduces drop-off and fills the calendar.',
      },
      {
        repoName: 'email-automation',
        role: 'nurture',
        stageLabel: 'Nurture automatically',
        ownerBenefit: 'Behavior-based email flows that follow up 24/7 without manual chasing.',
      },
      {
        repoName: 'spryte',
        role: 'prospect',
        stageLabel: 'Prioritize prospects',
        ownerBenefit: 'Lead audits and scoring that tell sales who to call first.',
      },
    ],
    outcomes: [
      { value: '45%', label: 'Conversion lift' },
      { value: '80%', label: 'Follow-up automated' },
      { value: '40%', label: 'Faster response' },
      { value: '100%', label: 'Attribution tracked' },
    ],
  },
];

export const growthSystemById = Object.fromEntries(
  growthSystems.map((system) => [system.id, system]),
) as Record<string, GrowthSystem>;

export const growthSystemRoleLabels: Record<GrowthSystemRole, string> = {
  capture: 'Capture',
  convert: 'Convert',
  nurture: 'Nurture',
  prospect: 'Prospect',
  measure: 'Measure',
};
