"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { carDetails } from '@/data/carDetails';
import { useLeadStore } from '@/store/useLeadStore';
import { filterVehicles } from '@/lib/vehicleFilters';
import type { VehicleFilter, VehicleSummary } from '@/lib/vehicleTypes';
import VehicleCompareTray from './VehicleCompareTray';

const vehicles = Object.values(carDetails) as VehicleSummary[];
const categoryFilters = [
  { value: 'cars', label: 'Compact cars' },
  { value: 'suv', label: 'SUVs' },
  { value: 'mpv', label: 'MPVs' },
  { value: 'hybrid', label: 'Hybrids' },
  { value: 'ev', label: 'EVs' },
];
const defaultFilter: VehicleFilter = { categories: [], fuelTypes: [], query: '' };

export default function VehicleDiscovery() {
  const { openModal } = useLeadStore();
  const [filter, setFilter] = useState<VehicleFilter>(defaultFilter);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const filtered = useMemo(() => filterVehicles(vehicles, filter), [filter]);

  const toggleCategory = (category: string) => {
    setFilter((current) => ({ ...current, categories: current.categories.includes(category) ? current.categories.filter((item) => item !== category) : [...current.categories, category] }));
  };

  const toggleCompare = (slug: string) => {
    setSelectedSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current);
  };

  return (
    <section id="vehicles" className="bg-[#f4f4f1] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-black/10 pb-10 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e30613]">Find your fit</p><h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#161616] sm:text-6xl">Choose your next Toyota.</h2><p className="mt-4 max-w-xl text-base leading-7 text-black/60">Start with what matters to you. Shortlist the cars that match your life, then explore them up close.</p></div><button type="button" onClick={() => setShowFilters((value) => !value)} className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-black/15 px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#161616] transition-colors hover:border-black hover:bg-white lg:hidden"><SlidersHorizontal size={16} /> Filter models</button></div>
        <div className={`${showFilters ? 'block' : 'hidden'} mt-6 lg:block`}><div className="flex flex-wrap gap-2">{categoryFilters.map((category) => { const active = filter.categories.includes(category.value); return <button type="button" key={category.value} onClick={() => toggleCategory(category.value)} className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-colors ${active ? 'border-[#e30613] bg-[#e30613] text-white' : 'border-black/15 bg-transparent text-black/65 hover:border-black hover:text-black'}`}>{active && <Check size={13} className="mr-1 inline" />}{category.label}</button>; })}<label className="ml-auto flex min-w-[240px] flex-1 items-center gap-2 border-b border-black/20 py-2 text-black/45 md:max-w-sm"><Search size={16} /><span className="sr-only">Search models</span><input value={filter.query} onChange={(event) => setFilter((current) => ({ ...current, query: event.target.value }))} placeholder="Search the range" className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40" /></label></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-black/50"><span>{filtered.length} models</span><button type="button" onClick={() => setFilter(defaultFilter)} className="font-bold uppercase tracking-[0.12em] text-black/60 hover:text-[#e30613]">Reset filters</button></div></div>
        {filtered.length === 0 ? <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-black/20 px-6 py-14 text-center"><h3 className="text-xl font-semibold">No models match that search.</h3><p className="mt-2 text-sm text-black/55">Reset the filters to see the full Toyota range.</p><button type="button" onClick={() => setFilter(defaultFilter)} className="mt-6 rounded-[var(--radius-control)] bg-[#161616] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">Show all models</button></div> : <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((vehicle, index) => { const selected = selectedSlugs.includes(vehicle.slug); return <article key={vehicle.slug} className={`group relative overflow-hidden rounded-[var(--radius-card)] border bg-white ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''} ${selected ? 'border-[#e30613]' : 'border-black/10'}`}><div className={`relative ${index === 0 ? 'h-[300px] sm:h-[390px]' : 'h-[240px]'}`}><Image src={vehicle.image} alt={vehicle.fullName} fill sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'} className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" /><button type="button" onClick={() => toggleCompare(vehicle.slug)} className={`absolute right-4 top-4 flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] ${selected ? 'border-[#e30613] bg-[#e30613] text-white' : 'border-black/15 bg-white/85 text-black/65 hover:border-black'}`}><span className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected ? 'border-white' : 'border-black/25'}`}>{selected && <Check size={11} />}</span>{selected ? 'Added' : 'Compare'}</button></div><div className="border-t border-black/10 p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-black/40">{vehicle.category[0]}</p><h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">{vehicle.name}</h3></div><p className="text-right text-sm font-semibold text-black/70">{vehicle.basePrice}</p></div><div className="mt-5 flex items-center justify-between gap-4"><Link href={`/virtual-showroom/${vehicle.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#e30613] hover:text-[#b90612]">Explore model <ArrowRight size={15} /></Link><button type="button" onClick={() => openModal(vehicle.name, 'TEST_DRIVE')} className="text-xs font-bold uppercase tracking-[0.12em] text-black/55 hover:text-black">Test drive</button></div></div></article>; })}</div>}
        <VehicleCompareTray vehicles={vehicles} selectedSlugs={selectedSlugs} onRemove={(slug) => setSelectedSlugs((current) => current.filter((item) => item !== slug))} onClear={() => setSelectedSlugs([])} />
      </div>
    </section>
  );
}

