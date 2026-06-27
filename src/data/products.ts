export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  checkoutUrl: string;
}

export const products: Product[] = [
  {
    id: 'seo-audit',
    name: 'SEO Audit Template',
    price: '$49',
    description:
      'A comprehensive SEO audit checklist and reporting template for agencies and freelancers.',
    image: '/images/products/seo-audit.svg',
    checkoutUrl: '#',
  },
  {
    id: 'landing-kit',
    name: 'Landing Page Starter Kit',
    price: '$79',
    description:
      'Pre-built landing page components optimized for conversions and mobile performance.',
    image: '/images/products/landing-kit.svg',
    checkoutUrl: '#',
  },
  {
    id: 'email-sequences',
    name: 'Email Nurture Sequences',
    price: '$39',
    description:
      'Ready-to-use email nurture sequence templates for e-commerce and SaaS businesses.',
    image: '/images/products/email-sequences.svg',
    checkoutUrl: '#',
  },
];
