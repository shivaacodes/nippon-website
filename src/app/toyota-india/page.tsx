import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Toyota India | Nippon Toyota',
  description: 'Connect from Nippon Toyota to Toyota Bharat resources.',
};

export default function ToyotaIndiaPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages['toyota-india']} />
      </main>
      <Footer />
    </div>
  );
}
