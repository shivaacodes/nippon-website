import RequestPageLayout from '@/components/site/RequestPageLayout';

export const metadata = { title: 'Exchange Your Car | Nippon Toyota', description: 'Explore Toyota exchange support with Nippon Toyota.' };

export default function ExchangePage() { return <RequestPageLayout eyebrow="Make room for what is next" title="Bring your current car into the conversation." description="Tell us about your current car and the Toyota you are considering. Our team will help you understand the next steps." intent="EXCHANGE" primaryLabel="Start an exchange enquiry" points={['Share your current car details.', 'Discuss an upgrade or exchange path.', 'Get a callback from the local sales team.']} secondaryHref="/#vehicles" secondaryLabel="Browse Toyotas" />; }
