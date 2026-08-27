import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Careers | Nippon Toyota',
  description: 'Register interest in career opportunities at Nippon Toyota.',
};

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages.careers} />
      </main>
      <Footer />
    </div>
  );
}
