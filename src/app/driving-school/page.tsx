import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealerInfoPage from '@/components/DealerInfoPage';
import { dealerPages } from '@/data/dealerContent';

export const metadata = {
  title: 'Driving School | Nippon Toyota',
  description: 'Driving school and road safety training support from Nippon Toyota.',
};

export default function DrivingSchoolPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <DealerInfoPage content={dealerPages['driving-school']} />
      </main>
      <Footer />
    </div>
  );
}
