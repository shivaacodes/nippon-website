import RequestPageLayout from '@/components/site/RequestPageLayout';

export const metadata = { title: 'Toyota Price List | Nippon Toyota', description: 'Get Toyota model variants and estimated prices from Nippon Toyota.' };

export default function PriceListPage() { return <RequestPageLayout eyebrow="Make the numbers clear" title="See the model, variant, and price that fit." description="Compare the Toyota range and request the latest price list for your chosen model, with a quick callback from our sales team." intent="PRICE_LIST" primaryLabel="Get the price list" points={['Review model variants in one place.', 'Ask about current offers and finance.', 'Get a branch-ready callback.']} secondaryHref="/#vehicles" secondaryLabel="Compare models" />; }
