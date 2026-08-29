import RequestPageLayout from '@/components/site/RequestPageLayout';

export const metadata = { title: 'Toyota Brochures | Nippon Toyota', description: 'Request Toyota brochures from Nippon Toyota.' };

export default function BrochurePage() { return <RequestPageLayout eyebrow="Know every detail" title="Take the details with you." description="Request a brochure for the Toyota you are considering and keep the important features, variants, and specifications close at hand." intent="BROCHURE" primaryLabel="Request brochure" points={['Get model features and specifications.', 'Understand available variants and colours.', 'Continue the conversation when you are ready.']} secondaryHref="/#vehicles" secondaryLabel="Explore models" />; }
