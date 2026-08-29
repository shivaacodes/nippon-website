import RequestPageLayout from '@/components/site/RequestPageLayout';

export const metadata = { title: 'Book a Test Drive | Nippon Toyota', description: 'Book a Toyota test drive with Nippon Toyota in Kerala.' };

export default function TestDrivePage() { return <RequestPageLayout eyebrow="Drive it first" title="The right Toyota should feel right." description="Choose a model, tell us where you are, and we will arrange a test drive at a convenient Nippon Toyota location." intent="TEST_DRIVE" primaryLabel="Book a test drive" points={['Pick the model you want to experience.', 'Choose a convenient branch or callback.', 'Drive with a Toyota specialist beside you.']} secondaryHref="/" secondaryLabel="Explore models" />; }
