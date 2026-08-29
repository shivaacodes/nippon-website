"use client";

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useLeadStore, type LeadIntent } from '@/store/useLeadStore';

export type CustomerRequestPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  intent: LeadIntent;
  primaryLabel: string;
  points: string[];
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CustomerRequestPage({ eyebrow, title, description, intent, primaryLabel, points, secondaryHref, secondaryLabel }: CustomerRequestPageProps) {
  const { openModal } = useLeadStore();

  return (
    <div className="bg-[#f4f4f1] text-[#161616]">
      <section className="border-b border-black/10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e30613]">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-7xl">{title}</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/60">{description}</p>
        </div>
      </section>
      <section className="px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {points.map((point) => <div key={point} className="rounded-[var(--radius-card)] border border-black/10 bg-white p-6"><CheckCircle2 size={18} className="text-[#e30613]" /><p className="mt-8 text-lg font-semibold leading-6">{point}</p></div>)}
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 rounded-[var(--radius-card)] bg-[#171717] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div><p className="text-xl font-bold">Ready when you are.</p><p className="mt-2 text-sm text-white/60">Share a few details and a Nippon Toyota specialist will take it from there.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => openModal('', intent)} className="inline-flex h-12 items-center justify-center gap-3 rounded-[var(--radius-control)] bg-[#e30613] px-5 text-xs font-bold uppercase tracking-[0.13em] text-white hover:bg-[#b90612]">{primaryLabel} <ArrowRight size={16} /></button>{secondaryHref && <Link href={secondaryHref} className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.13em] text-white hover:bg-white/10">{secondaryLabel}</Link>}</div>
        </div>
      </section>
    </div>
  );
}
