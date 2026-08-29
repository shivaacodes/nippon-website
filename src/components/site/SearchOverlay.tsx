"use client";

import Link from 'next/link';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { searchDocuments, type SearchResult } from '@/lib/siteSearch';

type SearchOverlayProps = {
  open: boolean;
  documents: SearchResult[];
  onClose: () => void;
};

export default function SearchOverlay({ open, documents, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchDocuments(documents, query), [documents, query]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-[#f4f4f1] text-[#161616]" role="dialog" aria-modal="true" aria-label="Search Nippon Toyota">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 py-5 sm:px-8 sm:py-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/50">Search Nippon Toyota</p>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white" aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        <label className="mt-12 flex items-center gap-4 border-b-2 border-black py-4">
          <Search size={26} aria-hidden="true" />
          <span className="sr-only">Search models, services, and pages</span>
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-2xl outline-none placeholder:text-black/35 sm:text-4xl" placeholder="Try Fortuner, service, hybrid..." />
        </label>

        <div className="mt-10 grid gap-2">
          {results.map((result) => (
            <Link key={result.href} href={result.href} onClick={onClose} className="group flex items-center justify-between border-b border-black/10 py-5 transition-colors hover:border-[#e30613]">
              <span>
                <span className="block text-lg font-semibold">{result.title}</span>
                <span className="mt-1 block max-w-2xl text-sm text-black/55">{result.description}</span>
              </span>
              <ArrowUpRight size={20} className="shrink-0 text-black/35 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e30613]" />
            </Link>
          ))}
          {results.length === 0 && <p className="border-b border-black/10 py-6 text-black/55">No matching models or pages. Try a different search.</p>}
        </div>
      </div>
    </div>
  );
}
