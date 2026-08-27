import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Feedback | Nippon Toyota',
  description: 'Share sales, service, or ownership feedback with Nippon Toyota.',
};

export default function FeedbackPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.feedback} />
      </main>
      <Footer />
    </div>
  );
}
