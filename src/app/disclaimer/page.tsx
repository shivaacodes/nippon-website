import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Disclaimer | Nippon Toyota', description: 'Nippon Toyota website disclaimer and pricing information.' };

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f1] font-sans text-[#161616]">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-grow flex-col px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e30613]">Important information</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.07em] sm:text-7xl">Website disclaimer</h1>
        <div className="mt-12 space-y-6 text-base leading-8 text-black/65">
          <p>Prices, specifications, colours, features, availability, finance terms, and delivery timelines shown on this website are indicative and may change without notice.</p>
          <p>Final pricing and vehicle availability are confirmed by Nippon Toyota at the time of enquiry or purchase. Images and illustrations are for representation and may show optional equipment.</p>
          <p>For the latest information, please contact your preferred Nippon Toyota branch before making a purchase decision.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
