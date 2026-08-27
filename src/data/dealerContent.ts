import type { LeadIntent } from '@/store/useLeadStore';

export type DealerPageKey =
  | 'loan'
  | 'insurance'
  | 'promotions'
  | 'whats-new'
  | 'feedback'
  | 'testimonials'
  | 'events'
  | 'driving-school'
  | 'careers'
  | 'toyota-india';

export type DealerPageContent = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaIntent?: LeadIntent;
  ctaHref?: string;
  cards: Array<{
    title: string;
    description: string;
    meta?: string;
  }>;
};

export const moreFromToyota = [
  {
    title: 'Toyota U-Trust',
    image: '/u-trust.png',
    href: '/used-cars',
    external: false,
  },
  {
    title: "What's New",
    image: '/whats-new.png',
    href: '/whats-new',
    external: false,
  },
  {
    title: 'Toyota Financial Services',
    image: '/toyota-financial-service.png',
    href: '/loan',
    external: false,
  },
  {
    title: 'Events',
    image: '/events.png',
    href: '/events',
    external: false,
  },
];

export const pressReleases = [
  {
    day: '18',
    monthYear: 'Aug 2026',
    title: 'Toyota Kirloskar Motor concludes Environment Month 2026',
    summary: 'Toyota Kirloskar Motor shared its Environment Month activity and resource recycling work.',
    href: 'https://www.toyotabharat.com/news/',
  },
  {
    day: '17',
    monthYear: 'Aug 2026',
    title: 'Toyota Kirloskar Motor supports education infrastructure',
    summary: 'Toyota Kirloskar Motor announced work on an education infrastructure project in Karnataka.',
    href: 'https://www.toyotabharat.com/news/',
  },
];

export const dealerPages: Record<DealerPageKey, DealerPageContent> = {
  loan: {
    title: 'Apply for Loan',
    eyebrow: 'Toyota Finance',
    description: 'Request finance support for a new Toyota with model, branch, and callback details.',
    image: '/toyota-financial-service.png',
    ctaLabel: 'Request Loan Callback',
    ctaIntent: 'LOAN',
    cards: [
      { title: 'New car finance', description: 'Get a callback for Toyota model finance options and documentation.', meta: 'Sales support' },
      { title: 'EMI discussion', description: 'Ask the dealership team to explain suitable payment options.', meta: 'Callback based' },
      { title: 'Branch handoff', description: 'Route the enquiry to the nearest Nippon Toyota sales desk.', meta: 'Kerala network' },
    ],
  },
  insurance: {
    title: 'Apply for Insurance',
    eyebrow: 'Toyota Insurance',
    description: 'Request insurance assistance for a new Toyota, renewal, or ownership support.',
    image: '/t-care.png',
    ctaLabel: 'Request Insurance Callback',
    ctaIntent: 'INSURANCE',
    cards: [
      { title: 'New vehicle cover', description: 'Get help with insurance during a new Toyota purchase.', meta: 'New cars' },
      { title: 'Renewal support', description: 'Ask the team to call about policy renewal and inspection needs.', meta: 'Existing owners' },
      { title: 'Claim guidance', description: 'Connect with the dealership for next steps after an incident.', meta: 'Support' },
    ],
  },
  promotions: {
    title: 'Promotions',
    eyebrow: 'Current Offers',
    description: 'See active dealership campaigns and request a callback before choosing a model.',
    image: '/whats-new.png',
    ctaLabel: 'Ask About Offers',
    ctaIntent: 'PROMOTION',
    cards: [
      { title: 'Model campaigns', description: 'Check current model-specific dealership offers.', meta: 'Updated by sales team' },
      { title: 'Exchange benefits', description: 'Ask about upgrade bonuses when trading in your current car.', meta: 'U-Trust' },
      { title: 'Finance bundles', description: 'Combine finance, insurance, and accessories support in one callback.', meta: 'Sales desk' },
    ],
  },
  'whats-new': {
    title: "What's New",
    eyebrow: 'Toyota Updates',
    description: 'A quick hub for new Toyota launches, dealer updates, and recent announcements.',
    image: '/whats-new.jpg',
    ctaLabel: 'Book a Test Drive',
    ctaIntent: 'TEST_DRIVE',
    cards: [
      { title: 'Urban Cruiser eBella', description: 'Follow launch interest and register for dealer updates.', meta: 'New model' },
      { title: 'Toyota news', description: 'Read the latest national Toyota announcements.', meta: 'Toyota Bharat' },
      { title: 'Dealer updates', description: 'Track Nippon Toyota events, campaigns, and ownership programs.', meta: 'Kerala' },
    ],
  },
  feedback: {
    title: 'Feedback',
    eyebrow: 'Talk to Nippon Toyota',
    description: 'Send sales, service, or ownership feedback to the dealership team.',
    image: '/nippon-towers.jpg',
    ctaLabel: 'Send Feedback',
    ctaIntent: 'FEEDBACK',
    cards: [
      { title: 'Sales experience', description: 'Share showroom, booking, delivery, or sales support feedback.', meta: 'Sales' },
      { title: 'Service experience', description: 'Tell the team about repair, maintenance, or service advisor support.', meta: 'Service' },
      { title: 'General enquiry', description: 'Request a callback for anything not covered elsewhere.', meta: 'Support' },
    ],
  },
  testimonials: {
    title: 'Testimonials',
    eyebrow: 'Customer Stories',
    description: 'Highlight recent customer experiences across Nippon Toyota branches.',
    image: '/nippon-towers.jpg',
    ctaLabel: 'Share Your Experience',
    ctaIntent: 'FEEDBACK',
    cards: [
      { title: 'Delivery support', description: 'Customers value clear timelines and guided vehicle handovers.', meta: 'Sales' },
      { title: 'Service care', description: 'Owners rely on transparent maintenance support and Toyota genuine parts.', meta: 'Service' },
      { title: 'Used car exchange', description: 'U-Trust support helps customers upgrade with a simpler valuation process.', meta: 'U-Trust' },
    ],
  },
  events: {
    title: 'Events',
    eyebrow: 'Nippon Toyota',
    description: 'Dealer events, roadshows, customer meets, and Toyota community programs.',
    image: '/events.png',
    ctaLabel: 'Ask About Events',
    ctaIntent: 'GENERIC',
    cards: [
      { title: 'Customer meets', description: 'Ownership and service camps across dealership locations.', meta: 'Branches' },
      { title: 'Launch events', description: 'Model previews and showroom launch activity.', meta: 'New cars' },
      { title: 'Social contribution', description: 'Community and road safety programs linked to Toyota values.', meta: 'Kerala' },
    ],
  },
  'driving-school': {
    title: 'Driving School',
    eyebrow: 'Toyota Training',
    description: 'Learn safer driving habits with dealership-backed training support.',
    image: '/driving-school.png',
    ctaLabel: 'Request Training Callback',
    ctaIntent: 'GENERIC',
    cards: [
      { title: 'Beginner training', description: 'Structured support for new drivers.', meta: 'Training' },
      { title: 'Road safety', description: 'Practical sessions focused on safer everyday driving.', meta: 'Safety' },
      { title: 'Toyota environment', description: 'Learn around Toyota vehicles and dealership guidance.', meta: 'Dealer support' },
    ],
  },
  careers: {
    title: 'Careers',
    eyebrow: 'Work With Us',
    description: 'Register interest for showroom, service, customer care, and back-office roles.',
    image: '/nippon-towers.jpg',
    ctaLabel: 'Submit Career Enquiry',
    ctaIntent: 'CAREERS',
    cards: [
      { title: 'Sales consultant', description: 'Customer-facing Toyota sales and showroom support.', meta: 'Sales' },
      { title: 'Service advisor', description: 'Coordinate service jobs, customer updates, and workshop handoffs.', meta: 'Service' },
      { title: 'Technician roles', description: 'Workshop roles for trained automotive technicians.', meta: 'Workshop' },
    ],
  },
  'toyota-india': {
    title: 'Toyota India',
    eyebrow: 'Toyota Bharat',
    description: 'Visit Toyota Bharat for national product, brand, and ownership information.',
    image: '/toyota-cars.png',
    ctaLabel: 'Open Toyota Bharat',
    ctaHref: 'https://www.toyotabharat.com/',
    cards: [
      { title: 'Toyota models', description: 'Explore Toyota India product information and official updates.', meta: 'External site' },
      { title: 'News', description: 'Read announcements from Toyota Kirloskar Motor.', meta: 'Toyota Bharat' },
      { title: 'Ownership', description: 'Find official ownership and brand resources.', meta: 'Toyota India' },
    ],
  },
};
