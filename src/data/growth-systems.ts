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
  /** Condensed, sales-focused pitch used on small screens. */
  salesPitch: string;
  demoPath: string;
  modules: GrowthSystemModule[];
  outcomes: { value: string; label: string }[];
}

export const growthSystems: GrowthSystem[] = [
  {
    id: 'lead-to-revenue',
    name: 'Lead-to-Revenue Growth System',
    tagline: 'From click to lead — captured, followed up with, and reported clearly.',
    pitch:
      'A working marketing-system demo for business owners who need more than a website. It shows how a conversion landing page, CRM sync, booking flow, follow-up automation, prospect audit, and attribution dashboard can fit together so leads are captured, routed, followed up with, and reported clearly.',
    salesPitch:
      'More than a website — a demoable system that shows how clicks become leads, how follow-up gets handled, and how GA4, CRM, and ad spend can feed one attribution view.',
    demoPath: 'demos/growth-system/index.html',
    modules: [
      {
        repoName: 'landing-page-template',
        role: 'capture',
        stageLabel: 'Capture intent',
        ownerBenefit: 'Conversion-focused landing pages with tracked forms and clear CTAs.',
      },
      {
        repoName: 'fieldsync-scheduler',
        role: 'convert',
        stageLabel: 'Book instantly',
        ownerBenefit: 'Self-serve scheduling that reduces friction between interest and booking.',
      },
      {
        repoName: 'email-automation',
        role: 'nurture',
        stageLabel: 'Nurture automatically',
        ownerBenefit: 'Behavior-based email flows that keep follow-up from becoming manual chasing.',
      },
      {
        repoName: 'spryte',
        role: 'prospect',
        stageLabel: 'Prioritize prospects',
        ownerBenefit: 'Lead audits and scoring that tell sales who to call first.',
      },
      {
        repoName: 'roi-attribution-dashboard',
        role: 'measure',
        stageLabel: 'Report attribution',
        ownerBenefit: 'One dashboard tying Google Analytics, CRM revenue, and ad spend to channel-level reporting.',
      },
    ],
    outcomes: [
      { value: '5', label: 'Connected demos' },
      { value: 'CRM', label: 'Sync model' },
      { value: '24/7', label: 'Follow-up flow' },
      { value: 'Demo', label: 'Attribution view' },
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
