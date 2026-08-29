import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomerRequestPage, { type CustomerRequestPageProps } from './CustomerRequestPage';

export default function RequestPageLayout(props: CustomerRequestPageProps) {
  return <div className="flex min-h-screen flex-col font-sans"><Header /><main className="flex-grow"><CustomerRequestPage {...props} /></main><Footer /></div>;
}
