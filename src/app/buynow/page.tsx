import RequestPageLayout from '@/components/site/RequestPageLayout';

export const metadata = { title: 'Buy a Toyota | Nippon Toyota', description: 'Start your Toyota purchase journey with Nippon Toyota.' };

export default function BuyNowPage() { return <RequestPageLayout eyebrow="Your next move" title="Turn a shortlist into a Toyota." description="Explore the range, ask for a tailored quote, and let our team help you move from browsing to booking." intent="GENERIC" primaryLabel="Start my enquiry" points={['Choose from the Toyota range.', 'Discuss availability and estimated pricing.', 'Get purchase support from a local team.']} secondaryHref="/#vehicles" secondaryLabel="Browse the range" />; }
