"use client";

import { PhoneCall, CalendarDays } from 'lucide-react';

type MobileActionBarProps = {
  modelName?: string;
  onEnquire: () => void;
  onTestDrive: () => void;
};

export default function MobileActionBar({ modelName, onEnquire, onTestDrive }: MobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#f4f4f1]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <button type="button" onClick={onEnquire} className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[#161616] px-3 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition-transform active:scale-[0.98]">
          <PhoneCall size={15} />
          <span>{modelName ? 'Enquire' : 'Talk to us'}</span>
        </button>
        <button type="button" onClick={onTestDrive} className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--toyota-red)] px-3 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition-transform active:scale-[0.98]">
          <CalendarDays size={15} />
          <span>Test drive</span>
        </button>
      </div>
    </div>
  );
}

