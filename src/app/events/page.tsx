import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Events | Nippon Toyota',
  description: 'Nippon Toyota events, roadshows, and customer programs.',
};

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.events} />
      </main>
      <Footer />
    </div>
  );
}
