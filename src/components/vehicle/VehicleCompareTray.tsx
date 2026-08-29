"use client";

import Link from 'next/link';
import { X, ArrowUpRight } from 'lucide-react';
import type { VehicleSummary } from '@/lib/vehicleTypes';

type VehicleCompareTrayProps = {
  vehicles: VehicleSummary[];
  selectedSlugs: string[];
  onRemove: (slug: string) => void;
  onClear: () => void;
};

export default function VehicleCompareTray({ vehicles, selectedSlugs, onRemove, onClear }: VehicleCompareTrayProps) {
  const selected = selectedSlugs.map((slug) => vehicles.find((vehicle) => vehicle.slug === slug)).filter((vehicle): vehicle is VehicleSummary => Boolean(vehicle));
  if (selected.length === 0) return null;

  const facts = [
    { label: 'Starting price', get: (vehicle: VehicleSummary) => vehicle.basePrice },
    { label: 'Fuel', get: (vehicle: VehicleSummary) => Array.from(new Set(vehicle.variants.map((variant) => variant.fuel))).join(' / ') },
    { label: 'Transmission', get: (vehicle: VehicleSummary) => Array.from(new Set(vehicle.variants.map((variant) => variant.transmission))).join(' / ') },
    { label: 'Seating', get: (vehicle: VehicleSummary) => vehicle.specs.find((spec) => spec.label.toLowerCase() === 'seating')?.value ?? 'See details' },
  ];

  return (
    <section className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-black/10 bg-[#161616] text-white" aria-label="Compare selected vehicles">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Compare selected</p><p className="mt-1 text-sm text-white/70">Choose up to three cars that fit your shortlist.</p></div>
        <button type="button" onClick={onClear} className="text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white">Clear</button>
      </div>
      <div className="overflow-x-auto"><div className="min-w-[680px] p-5 sm:p-6"><div className="grid grid-cols-[130px_repeat(3,minmax(160px,1fr))] gap-4"><div />
        {selected.map((vehicle) => <div key={vehicle.slug} className="relative border-b border-white/10 pb-4"><button type="button" onClick={() => onRemove(vehicle.slug)} className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white hover:text-white" aria-label={`Remove ${vehicle.name} from comparison`}><X size={13} /></button><p className="pr-8 text-lg font-semibold">{vehicle.name}</p><Link href={`/virtual-showroom/${vehicle.slug}`} className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.1em] text-[#ff5360] hover:text-white">Open model <ArrowUpRight size={13} /></Link></div>)}
        {Array.from({ length: 3 - selected.length }).map((_, index) => <div key={`empty-${index}`} className="border-b border-dashed border-white/15 pb-4 text-sm text-white/35">Add another car</div>)}
        {facts.map((fact) => <div key={fact.label} className="contents"><p className="border-b border-white/10 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white/45">{fact.label}</p>{selected.map((vehicle) => <p key={`${vehicle.slug}-${fact.label}`} className="border-b border-white/10 py-4 text-sm text-white/80">{fact.get(vehicle)}</p>)}{Array.from({ length: 3 - selected.length }).map((_, index) => <p key={`${fact.label}-empty-${index}`} className="border-b border-white/10 py-4 text-sm text-white/25">-</p>)}</div>)}
      </div></div></div>
    </section>
  );
}

