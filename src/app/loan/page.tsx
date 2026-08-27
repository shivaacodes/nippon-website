import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Apply for Loan | Nippon Toyota',
  description: 'Request Toyota finance support from Nippon Toyota.',
};

export default function LoanPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.loan} />
      </main>
      <Footer />
    </div>
  );
}
