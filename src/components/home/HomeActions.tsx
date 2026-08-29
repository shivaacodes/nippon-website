"use client";

import { ArrowRight, CalendarDays, Repeat2, Tag } from 'lucide-react';
import Link from 'next/link';
import { useLeadStore } from '@/store/useLeadStore';

const actions = [
  { label: 'Book a test drive', detail: 'Feel the difference in person', icon: CalendarDays, intent: 'TEST_DRIVE' as const },
  { label: 'Get a price list', detail: 'See variants and estimated pricing', icon: Tag, intent: 'PRICE_LIST' as const },
  { label: 'Exchange your car', detail: 'Make your next move easier', icon: Repeat2, intent: 'EXCHANGE' as const },
];

export default function HomeActions() {
  const { openModal } = useLeadStore();

  return (
    <section className="border-y border-black/10 bg-white px-5 py-6 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3">
        {actions.map(({ label, detail, icon: Icon, intent }) => (
          <button
            key={label}
            type="button"
            onClick={() => openModal('', intent)}
            className="group flex min-h-20 items-center justify-between rounded-[var(--radius-control)] border border-black/10 bg-[#f4f4f1] px-5 py-4 text-left transition-colors hover:border-[#e30613] hover:bg-white"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-white transition-colors group-hover:bg-[#e30613]"><Icon size={18} /></span>
              <span><span className="block text-sm font-bold text-[#161616]">{label}</span><span className="mt-1 block text-xs text-black/55">{detail}</span></span>
            </span>
            <ArrowRight size={17} className="shrink-0 text-black/35 transition-transform group-hover:translate-x-1 group-hover:text-[#e30613]" />
          </button>
        ))}
      </div>
      <div className="mx-auto mt-4 max-w-7xl text-center text-xs text-black/45">
        Prefer to browse first? <Link href="/virtual-showroom" className="font-bold text-[#161616] underline decoration-black/25 underline-offset-4 hover:text-[#e30613]">Enter the virtual showroom</Link>
      </div>
    </section>
  );
}
