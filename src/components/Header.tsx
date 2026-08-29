"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import SearchOverlay from './site/SearchOverlay';
import { searchIndex } from '@/data/searchIndex';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const base = "flex items-center transition-colors group";
    const isActive = pathname === path;
    return `${base} ${isActive ? 'text-[var(--toyota-red)]' : 'hover:text-[var(--toyota-red)]'}`;
  };

  const moreDropdownItems = [
    { label: 'Apply for Loan', href: '/loan' },
    { label: 'Apply for Insurance', href: '/insurance' },
    { label: 'Promotions', href: '/promotions' },
    { label: 'Whats New', href: '/whats-new' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Events', href: '/events' },
    { label: 'Driving School', href: '/driving-school' },
    { label: 'Certified Used Cars', href: '/used-cars' },
    { label: 'Careers', href: '/careers' },
    { label: 'Toyota India', href: '/toyota-india' },
  ];

  return (
    <>
    <motion.header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#f4f4f1]/92 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] w-full items-center justify-between px-5 sm:px-8">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image 
                src="/nippon-toyota.png" 
                alt="Toyota Logo" 
                width={200} 
                height={40} 
                className="object-contain h-8 w-auto"
                style={{ width: "auto" }}
                priority
              />
              <span className="ml-3 hidden font-display text-sm font-black tracking-[0.12em] text-black sm:block">NIPPON TOYOTA</span>
            </div>
          </Link>
        </div>

        {/* Middle: Navigation */}
        <nav className="hidden items-center gap-7 text-[10px] font-display font-bold tracking-[0.16em] text-[#222] lg:flex xl:gap-9">
          <Link href="/virtual-showroom" className={getLinkClass('/virtual-showroom')}>
            VIRTUAL SHOWROOM
          </Link>
          <div className="relative group/service py-2">
            <Link href="/service" className={getLinkClass('/service')}>
              SERVICE <ChevronDown size={14} strokeWidth={2.5} className="ml-1 text-gray-500 group-hover/service:text-[var(--toyota-red)] transition-transform duration-300 group-hover/service:-rotate-180" />
            </Link>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/service:opacity-100 group-hover/service:pointer-events-auto transition-all duration-300 z-50 transform translate-y-2 group-hover/service:translate-y-0">
              <div className="bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 w-[240px] rounded-2xl border border-gray-100 flex flex-col font-sans normal-case tracking-normal">
                <Link 
                  href="/service" 
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 flex justify-between items-center"
                >
                  Service Corner
                </Link>
                <Link 
                  href="/i-connect" 
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 flex justify-between items-center"
                >
                  Toyota i-Connect
                </Link>
              </div>
            </div>
          </div>
          <Link href="/t-care" className={getLinkClass('/t-care')}>
            T-CARE
          </Link>
          <Link href="/used-cars" className={getLinkClass('/used-cars')}>
            USED CARS
          </Link>
          <Link href="/about" className={getLinkClass('/about')}>
            ABOUT US
          </Link>
          <Link href="/contact" className={getLinkClass('/contact')}>
            CONTACT US
          </Link>
          
          {/* MORE Dropdown */}
          <div className="relative group/more py-2">
            <div className={`cursor-pointer ${getLinkClass('/more')}`}>
              MORE <ChevronDown size={14} strokeWidth={2.5} className="ml-1 text-gray-500 group-hover/more:text-[var(--toyota-red)] transition-transform duration-300 group-hover/more:-rotate-180" />
            </div>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/more:opacity-100 group-hover/more:pointer-events-auto transition-all duration-300 z-50 transform translate-y-2 group-hover/more:translate-y-0">
              <div className="bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 w-[240px] rounded-2xl border border-gray-100 flex flex-col font-sans normal-case tracking-normal">
                {moreDropdownItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className="w-full px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 flex justify-between items-center group/item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right: Search */}
        <div className="flex items-center">
          <div className="hidden lg:block h-6 w-px bg-gray-300 mr-6"></div>
          <motion.button type="button" onClick={() => setIsSearchOpen(true)} className="hidden items-center text-[11px] font-bold tracking-widest text-[var(--toyota-red)] transition-opacity hover:opacity-80 md:flex" whileTap={{ scale: 0.98 }}>
            <Search size={18} strokeWidth={2.5} className="mr-2" />
            SEARCH
          </motion.button>
          
          {/* Mobile Menu Toggle */}
          <button type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 ml-4 text-gray-800 hover:text-[var(--toyota-red)] transition-colors relative z-[60]"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-white h-[100dvh] w-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-lg font-display font-bold text-[#222] tracking-widest">
                <Link href="/virtual-showroom" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/virtual-showroom')}>
                VIRTUAL SHOWROOM
              </Link>
              <div>
                <Link href="/service" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/service')}>
                  SERVICE
                </Link>
                <div className="mt-4 flex flex-col space-y-4 font-sans font-medium text-base tracking-normal normal-case">
                  <Link href="/service" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-[var(--toyota-red)] transition-colors">
                    Service Corner
                  </Link>
                  <Link href="/i-connect" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-[var(--toyota-red)] transition-colors">
                    Toyota i-Connect
                  </Link>
                </div>
              </div>
              <Link href="/t-care" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/t-care')}>
                T-CARE
              </Link>
              <Link href="/used-cars" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/used-cars')}>
                USED CARS
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/about')}>
                ABOUT US
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/contact')}>
                CONTACT US
              </Link>
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <span className="text-gray-400 text-xs tracking-[0.2em]">MORE OPTIONS</span>
                <div className="flex flex-col space-y-4 mt-4 font-sans font-medium text-base tracking-normal">
                  {moreDropdownItems.map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-[var(--toyota-red)] transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronRight size={16} className="text-gray-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
            
            <div className="mt-auto pt-8">
              <button type="button" onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }} className="flex w-full items-center justify-center rounded-[var(--radius-control)] bg-black/5 py-4 text-sm font-bold tracking-widest text-[var(--toyota-red)]">
                <Search size={18} strokeWidth={2.5} className="mr-2" />
                SEARCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
    {isSearchOpen && <SearchOverlay open documents={searchIndex} onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
