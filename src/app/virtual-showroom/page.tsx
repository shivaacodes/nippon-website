'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import PannellumViewer from '@/components/PannellumViewer';
import showroomData from '../../../public/showroom-data.json';

type ShowroomCar = {
  id: string;
  topHeading: string;
  startingPrice: string;
  takeTour: string;
  content: Array<{ contentList: string[] }>;
};

type HotspotCar = {
  id: string;
  pitch: number;
  yaw: number;
};

const showroomCars = showroomData.hotspotdata as ShowroomCar[];

const carPositions: HotspotCar[] = [
  { id: 'fortuner', pitch: 3.5, yaw: -40 },
  { id: 'legender', pitch: 3.5, yaw: -59 },
  { id: 'hilux', pitch: 3.5, yaw: -20 },
  { id: 'camry', pitch: 1, yaw: -84 },
  { id: 'vellfire', pitch: 4, yaw: -108 },
  { id: 'urban-cruiser-hyryder', pitch: 3.5, yaw: 80 },
  { id: 'ebella', pitch: 2.6, yaw: 57 },
  { id: 'rumion', pitch: 3, yaw: 103 },
  { id: 'taisor', pitch: 2, yaw: 123 },
  { id: 'glanza', pitch: 1.4, yaw: 140 },
  { id: 'innova-crysta', pitch: 3, yaw: 15 },
  { id: 'innovacrysta', pitch: 3, yaw: 34 },
  { id: 'land-cruiser-300', pitch: 3.5, yaw: -135 },
];

function cleanPrice(price: string) {
  return price.replace('â‚¹', '\u20b9').replace('â„¢', 'TM').replace('â€', '"');
}

function tourUrl(car: ShowroomCar) {
  return `/virtual-showroom/${car.takeTour}`;
}

export default function VirtualShowroom() {
  const [entered, setEntered] = useState(false);
  const [tutorialStep, setTutorialStep] = useState<0 | 1 | 2>(0);
  const [activeTab, setActiveTab] = useState('CARS');
  const [activeCar, setActiveCar] = useState<ShowroomCar | null>(null);

  const viewerConfig = useMemo(() => ({
    default: {
      firstScene: 'cars',
      author: '',
      sceneFadeDuration: 0,
      autoLoad: true,
      showControls: false,
    },
    scenes: {
      cars: {
        title: 'CARS',
        type: 'multires',
        showControls: false,
        autoRotate: -1,
        hfov: 70,
        minHfov: 70,
        maxHfov: 70,
        multiResMaxHfov: 70,
        multiResMinHfov: 70,
        maxLevel: 1,
        pitch: 0,
        yaw: 2,
        compass: false,
        multiRes: {
          basePath: 'https://static3.toyotabharat.com/assets/toyota-360/interior',
          shtHash: '5*~payWCt7ayofWCj[a}WBV[jtWBayaxofj[axj[WBj[j[fQj@j[ayjtj[a}fkjZfQj[j[fkj[',
          path: '/%l/%s%y_%x',
          fallbackPath: '/fallback/%s',
          extension: 'jpg',
          tileResolution: 512,
          maxLevel: 4,
          cubeResolution: 2544,
        },
        hotSpots: carPositions.flatMap(({ id, pitch, yaw }) => {
          const car = showroomCars.find((item) => item.id === id);
          if (!car) return [];
          return [
            {
              pitch,
              yaw,
              type: 'info',
              cssClass: `${id}-info nippon-info-hotspot`,
              scale: true,
              clickHandlerFunc: () => setActiveCar(car),
            },
            {
              pitch,
              yaw: yaw + 7,
              type: 'info',
              cssClass: `${id}-url nippon-tour-hotspot`,
              scale: true,
              clickHandlerFunc: () => {
                window.location.href = tourUrl(car);
              },
            },
          ];
        }),
      },
    },
  }), []);

  const moveTo = (tab: string, yaw: number) => {
    setActiveTab(tab);
    window.virtualShowroomViewer?.setYaw?.(yaw);
  };

  const stepInside = () => {
    setEntered(true);
    setTutorialStep(1);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black font-sans text-white">
      <link rel="stylesheet" href="https://static3.toyotabharat.com/assets/toyota-360/css/showroom.css" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body { overflow: hidden; }
            .pnlm-container { background: #000 !important; }
            .pnlm-tooltip { display: none !important; }
            .nippon-info-hotspot {
              width: 32px !important;
              height: 32px !important;
              border: 4px solid #ed1b2f !important;
              border-radius: 999px !important;
              background: #fff !important;
              box-shadow: 0 2px 12px rgba(0,0,0,.3) !important;
            }
            .nippon-info-hotspot::after {
              content: 'i';
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ed1b2f;
              font: 900 22px Georgia, serif;
              font-style: italic;
              line-height: 1;
            }
            .nippon-tour-hotspot {
              width: 234px !important;
              height: 38px !important;
              border-radius: 0 !important;
              background: #ed1b2f !important;
              box-shadow: 0 2px 12px rgba(0,0,0,.24) !important;
            }
            .nippon-tour-hotspot::after {
              content: 'VIEW 360° TOUR & CONFIGURE  »';
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: center;
              color: #fff;
              font: 800 13px Arial, sans-serif;
              white-space: nowrap;
            }
            .nippon-info-hotspot:hover,
            .nippon-tour-hotspot:hover { transform: scale(1.04); }
          `,
        }}
      />

      {entered && (
        <PannellumViewer config={viewerConfig} id="panorama" className="h-full w-full" />
      )}

      {!entered && (
        <section className="absolute inset-0 z-30 bg-black">
          <Image
            src="/assets/toyota-360/images/one3d-entrance-static.jpg"
            alt="Toyota Virtual Showroom"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-[6%] left-1/2 w-[min(92vw,450px)] -translate-x-1/2 text-left md:bottom-[9%]">
            <h1 className="font-serif text-[31px] font-bold leading-none text-white">Hello!</h1>
            <p className="mt-6 text-[18px] font-semibold text-white">Welcome to the Toyota Virtual Showroom.</p>
            <button
              type="button"
              onClick={stepInside}
              className="mt-7 h-[58px] w-full bg-[#ed1b2f] font-serif text-[14px] font-bold uppercase text-white transition-colors hover:bg-[#c90013]"
            >
              STEP INSIDE
            </button>
          </div>
        </section>
      )}

      {entered && tutorialStep === 1 && (
        <div className="absolute left-1/2 top-1/2 z-20 w-[330px] -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-4 text-black shadow-2xl">
          <h2 className="text-[18px] font-black"><span className="mr-2">1/2.</span> Explore Showroom</h2>
          <p className="mt-3 text-[16px] leading-6">Drag left/right to rotate & explore the showroom.</p>
          <div className="mt-3 flex justify-end gap-5 text-[15px] font-bold text-[#ed1b2f]">
            <button type="button" onClick={() => setTutorialStep(0)}>SKIP</button>
            <button type="button" onClick={() => setTutorialStep(2)}>NEXT</button>
          </div>
        </div>
      )}

      {entered && tutorialStep === 2 && (
        <div className="absolute bottom-[110px] left-1/2 z-20 w-[330px] -translate-x-1/2 bg-white px-4 py-4 text-black shadow-2xl">
          <h2 className="text-[18px] font-black"><span className="mr-2">2/2.</span> Tab Bar</h2>
          <p className="mt-3 text-[16px] leading-6">Or tap on these tabs to quickly view a preferred Car category.</p>
          <div className="mt-3 flex justify-end gap-5 text-[15px] font-bold text-[#ed1b2f]">
            <button type="button" onClick={() => setTutorialStep(1)}>REPEAT</button>
            <button type="button" onClick={() => setTutorialStep(0)}>DONE</button>
          </div>
        </div>
      )}

      {entered && (
        <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 bg-white px-5 py-3 text-black shadow-xl">
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold">Move to:</span>
            <div className="flex overflow-hidden border border-[#ddd]">
              {[
                ['CARS', 28],
                ['MPV', 84],
                ['SUV', -116],
              ].map(([tab, yaw]) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => moveTo(String(tab), Number(yaw))}
                  className={`px-7 py-3 text-[13px] font-bold ${activeTab === tab ? 'bg-[#ed1b2f] text-white' : 'bg-white text-black'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeCar && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 px-4">
          <div className="relative w-full max-w-[520px] bg-white px-8 py-9 text-black shadow-2xl">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActiveCar(null)}
              className="absolute right-5 top-4 text-3xl leading-none text-black"
            >
              x
            </button>
            <h2 className="text-[26px] font-black uppercase">{activeCar.topHeading}</h2>
            <p className="mt-3 text-[16px] font-bold">Starting Price: {cleanPrice(activeCar.startingPrice)}</p>
            <h3 className="mt-7 text-[15px] font-black uppercase">Top Highlights</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-6 text-[#444]">
              {activeCar.content[0]?.contentList.map((feature) => (
                <li key={feature}>{feature.replace('â„¢', 'TM').replace('â€', '"')}</li>
              ))}
            </ul>
            <a
              href={tourUrl(activeCar)}
              className="mt-7 inline-flex bg-[#ed1b2f] px-8 py-4 text-[13px] font-black uppercase text-white hover:bg-[#c90013]"
            >
              TAKE 360° TOUR
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
