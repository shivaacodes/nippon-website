"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { moreFromToyota, pressReleases } from '@/data/dealerContent';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function PressRelease() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Press Release Header */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900 mb-4">
            Press Release
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {pressReleases.map((release) => (
            <motion.a
              key={release.title}
              href={release.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-100 p-8 md:p-12 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden rounded-sm"
              initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="text-left md:text-center min-w-[80px]">
                  <div className="text-5xl md:text-6xl font-bold text-[#eb0a1e] tracking-tighter">{release.day}</div>
                  <div className="text-[11px] font-bold text-zinc-500 mt-2 uppercase tracking-[0.2em]">{release.monthYear}</div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-zinc-900 group-hover:text-[#eb0a1e] text-xl leading-tight mb-4 transition-colors duration-500">
                    {release.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                    {release.summary}
                  </p>
                </div>
              </div>
              <div className="absolute top-8 right-8 text-zinc-300 group-hover:text-[#eb0a1e] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* More from Toyota */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900">
            More from Toyota
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {moreFromToyota.map((item, index) => {
            const card = (
              <motion.div
                className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
                initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            );

            return item.external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
                {card}
              </a>
            ) : (
              <Link key={item.title} href={item.href} aria-label={item.title}>
                {card}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
