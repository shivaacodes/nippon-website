import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Testimonials | Nippon Toyota',
  description: 'Customer experiences from Nippon Toyota branches.',
};

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.testimonials} />
      </main>
      <Footer />
    </div>
  );
}
