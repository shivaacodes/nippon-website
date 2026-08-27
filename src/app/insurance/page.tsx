import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Apply for Insurance | Nippon Toyota',
  description: 'Request Toyota insurance support from Nippon Toyota.',
};

export default function InsurancePage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.insurance} />
      </main>
      <Footer />
    </div>
  );
}
