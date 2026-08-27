"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DealerPageContent } from '@/data/dealerContent';
import { useLeadStore } from '@/store/useLeadStore';

type DealerInfoPageProps = {
  content: DealerPageContent;
};

export default function DealerInfoPage({ content }: DealerInfoPageProps) {
  const { openModal } = useLeadStore();

  const cta = content.ctaHref ? (
    <a
      href={content.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 bg-[#eb0a1e] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-colors hover:bg-zinc-950"
    >
      {content.ctaLabel}
      <ExternalLink size={16} />
    </a>
  ) : (
    <button
      onClick={() => openModal('', content.ctaIntent || 'GENERIC')}
      className="inline-flex items-center justify-center gap-3 bg-[#eb0a1e] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-colors hover:bg-zinc-950"
    >
      {content.ctaLabel}
      <ArrowRight size={16} />
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[440px] overflow-hidden bg-zinc-950">
        <Image
          src={content.image}
          alt={content.title}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[440px] max-w-[1400px] flex-col justify-end px-6 pb-14 md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-[#eb0a1e]"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="max-w-4xl font-druk text-5xl uppercase leading-none tracking-wide text-white md:text-7xl"
          >
            {content.title}
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-xl text-2xl font-medium leading-snug text-zinc-900 md:text-4xl">
            {content.description}
          </p>
          <div className="mt-8">{cta}</div>
        </div>

        <div className="grid gap-4 lg:col-span-7">
          {content.cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="border border-gray-100 bg-zinc-50 p-6 md:p-8"
            >
              {card.meta && (
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#eb0a1e]">
                  {card.meta}
                </p>
              )}
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 md:text-base">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-zinc-950 px-6 py-12 text-white md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Need quick help?</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Talk to Nippon Toyota</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:text-[#eb0a1e]"
          >
            Find a branch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
