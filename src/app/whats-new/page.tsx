import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: "What's New | Nippon Toyota",
  description: 'Toyota and Nippon Toyota updates, announcements, and launches.',
};

export default function WhatsNewPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages['whats-new']} />
      </main>
      <Footer />
    </div>
  );
}
