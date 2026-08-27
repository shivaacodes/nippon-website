"use client";

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { contactBranches, type ContactBranch } from '@/data/contactBranches';

function DetailBlock({
  icon,
  alt,
  title,
  children,
  redTitle = false,
}: {
  icon: string;
  alt: string;
  title: string;
  children: React.ReactNode;
  redTitle?: boolean;
}) {
  return (
    <div className="flex min-h-[220px] gap-7 border-b border-[#e7e7e7] px-3 py-10 md:px-8">
      <div className="relative mt-1 h-14 w-14 shrink-0">
        <Image src={icon} alt={alt} fill sizes="56px" className="object-contain" />
      </div>
      <div className="text-[#555]">
        <h3 className={`mb-5 font-display text-[18px] font-bold uppercase tracking-wide ${redTitle ? 'text-[#eb0a1e]' : 'text-[#222]'}`}>
          {title}
        </h3>
        <div className="space-y-1 text-[15px] leading-7">{children}</div>
      </div>
    </div>
  );
}

function PhoneLink({ number }: { number: string }) {
  return (
    <a href={`tel:${number.replace(/[^\d+]/g, '')}`} className="ml-2 text-[#444] transition-colors hover:text-[#eb0a1e]">
      {number}
    </a>
  );
}

function BranchDetails({ branch }: { branch: ContactBranch }) {
  return (
    <section id="adress" className="mx-auto max-w-[1180px] px-4 py-8 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <DetailBlock icon="/images/common/contact-4.png" alt="Address" title="NIPPON TOYOTA" redTitle>
          {branch.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </DetailBlock>

        <DetailBlock icon="/images/common/contact-1.png" alt="Working Hours" title="Working Hours">
          {branch.salesHours && (
            <p>
              <strong className="mr-2 text-[#222]">Sales</strong>
              <span>{branch.salesHours}</span>
            </p>
          )}
          {branch.serviceHours && (
            <p>
              <strong className="mr-2 text-[#222]">Service</strong>
              <span>{branch.serviceHours}</span>
            </p>
          )}
          <p>
            <strong className="mr-2 text-[#222]">Lunch</strong>
            <span>{branch.lunchHours}</span>
          </p>
        </DetailBlock>

        <DetailBlock icon="/images/common/contact-3.png" alt="Contact Numbers" title="Contact Numbers">
          {branch.phone.length > 0 && (
            <p>
              <strong className="mr-2 text-[#222]">Phone</strong>
              {branch.phone.map((number) => (
                <span key={number} className="block sm:inline">
                  <PhoneLink number={number} />
                </span>
              ))}
            </p>
          )}
          {branch.fax && (
            <p>
              <strong className="mr-2 text-[#222]">Fax</strong>
              <PhoneLink number={branch.fax} />
            </p>
          )}
          {branch.service.length > 0 && (
            <p>
              <strong className="mr-2 text-[#222]">Service</strong>
              {branch.service.map((number) => (
                <span key={number} className="block sm:inline">
                  <PhoneLink number={number} />
                </span>
              ))}
            </p>
          )}
          {branch.serviceHelpline && (
            <p>
              <strong className="mr-2 text-[#222]">Service Helpline</strong>
              <PhoneLink number={branch.serviceHelpline} />
            </p>
          )}
          <p>
            <strong className="mr-2 text-[#222]">Roadside Assistance</strong>
            <PhoneLink number="1800 102 5001" />
          </p>
        </DetailBlock>

        <DetailBlock icon="/images/common/contact-2.png" alt="Email" title="Email">
          <p>
            <a href={`mailto:${branch.email}`} className="break-all text-[#444] transition-colors hover:text-[#eb0a1e]">
              {branch.email}
            </a>
          </p>
        </DetailBlock>
      </div>

      <div className="py-8 text-center text-[15px] text-[#777]">
        <span>Check other branches</span>
        <a href="#branch-select" className="ml-1 font-semibold text-[#eb0a1e] hover:underline">
          here.
        </a>
      </div>
    </section>
  );
}

function SimpleCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white px-7 py-8 text-center shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.12em] text-[#222]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#666]">{text}</p>
    </div>
  );
}

export default function ContactContent() {
  const [selectedCode, setSelectedCode] = useState(contactBranches[0].code);
  const selectedBranch = useMemo(
    () => contactBranches.find((branch) => branch.code === selectedCode) ?? contactBranches[0],
    [selectedCode],
  );

  return (
    <div className="bg-white text-[#333]">
      <section className="contact-us-sec pt-12 md:pt-16">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="mx-auto w-full max-w-[331px] border-b-4 border-[#eb0a1e] pb-5 text-center">
            <h1 className="font-display text-[32px] font-bold uppercase tracking-tight text-[#333]">Our Locations</h1>
            <h5 className="mt-2 text-[14px] font-normal text-[#777]">Select Our Dealer Nearest to you</h5>
          </div>

          <div id="branch-select" className="mx-auto mt-12 max-w-[620px]">
            <select
              value={selectedCode}
              onChange={(event) => setSelectedCode(event.target.value)}
              className="h-[46px] w-full border border-[#d5d5d5] bg-white px-4 text-[14px] text-[#555] outline-none transition-colors focus:border-[#eb0a1e]"
            >
              {contactBranches.map((branch) => (
                <option key={branch.code} value={branch.code}>
                  {branch.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mt-12 w-full">
        <div className="relative h-[300px] w-full overflow-hidden bg-[#eee] md:h-[520px]">
          <Image
            key={selectedBranch.image}
            src={selectedBranch.image}
            alt={`${selectedBranch.title} showroom`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <BranchDetails branch={selectedBranch} />

      <section className="h-[430px] w-full bg-[#e9efef]">
        <iframe
          key={selectedBranch.code}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedBranch.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="bg-[#f5f5f5] px-4 pb-10 pt-14">
        <div className="mx-auto max-w-[1180px]">
          <h1 className="mb-10 text-center font-display text-[30px] font-bold uppercase text-[#333]">Contact Person</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <SimpleCard title="Sales Enquiry" text="Reach the sales desk for new vehicle enquiries, finance support and test drive requests." />
            <SimpleCard title="Service Support" text="Contact the service team for appointments, repair status and periodic maintenance help." />
            <SimpleCard title={selectedBranch.type} text={`Selected branch: ${selectedBranch.title}. Use the phone numbers above for direct assistance.`} />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] px-4 pb-16 pt-8">
        <div className="mx-auto max-w-[1180px]">
          <h1 className="mb-10 text-center font-display text-[30px] font-bold uppercase text-[#333]">Facilities</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            <SimpleCard title="Showroom" text="Toyota vehicle display and consultant support." />
            <SimpleCard title="Service" text="Scheduled service, diagnosis and maintenance." />
            <SimpleCard title="Body & Paint" text="Accident repair and paint support where available." />
            <SimpleCard title="Customer Lounge" text="Waiting area support during showroom and service visits." />
          </div>
        </div>
      </section>
    </div>
  );
}
