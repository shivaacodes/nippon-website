import RequestPageLayout from '@/components/site/RequestPageLayout';

export const metadata = { title: 'Toyota Accessories | Nippon Toyota', description: 'Ask Nippon Toyota about genuine Toyota accessories.' };

export default function AccessoriesPage() { return <RequestPageLayout eyebrow="Finish it your way" title="Make your Toyota feel like yours." description="Ask about genuine Toyota accessories and get help choosing the right finishing touches for your model." intent="GENERIC" primaryLabel="Ask about accessories" points={['Explore accessories for your Toyota.', 'Get fitment and availability guidance.', 'Keep the enquiry with your local dealer.']} secondaryHref="/contact" secondaryLabel="Contact us" />; }
