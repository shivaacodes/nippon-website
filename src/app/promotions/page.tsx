import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Promotions | Nippon Toyota',
  description: 'Explore current Nippon Toyota offers and campaigns.',
};

export default function PromotionsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.promotions} />
      </main>
      <Footer />
    </div>
  );
}
