import React from 'react';
import { ScreenType, UserAccount, PassItem, RewardDeal, Transaction } from '../../types';
import { LayoutGrid, ArrowRight, Smartphone, Check } from 'lucide-react';
import { StatusBar } from '../StatusBar';

interface AllScreensGalleryProps {
  account: UserAccount;
  passes: PassItem[];
  rewards: RewardDeal[];
  transactions: Transaction[];
  onSelectScreen: (screen: ScreenType) => void;
}

export const AllScreensGallery: React.FC<AllScreensGalleryProps> = ({
  account,
  passes,
  rewards,
  onSelectScreen,
}) => {
  const screensMeta: { id: ScreenType; title: string; subtitle: string; highlights: string[] }[] = [
    {
      id: 'home',
      title: '1. Home Dashboard',
      subtitle: 'Balance, 5G Data Gauge & Quick Services',
      highlights: ['RM 48.50 Live Balance', '42.8GB 5G Quota Ring', 'Hotlink Points: 1,420', 'Quick Actions Grid'],
    },
    {
      id: 'passes',
      title: '2. Internet & Roaming',
      subtitle: 'Unlimited 5G, Pantas & Roaming Passes',
      highlights: ['5G Unlimited 30D RM45', 'Pantas 50GB Uncapped RM35', 'ASEAN Roaming RM25', 'Instant 1-Click Purchase'],
    },
    {
      id: 'rewards',
      title: '3. HotlinkMU Rewards',
      subtitle: 'Free Spin & Win Wheel, Barcode Vouchers',
      highlights: ['Interactive Spin Wheel', 'Tealive 1-For-1 voucher', 'PUBG / Gaming Passes', 'Real-time countdown timer'],
    },
    {
      id: 'topup',
      title: '4. Instant Top Up & Reload',
      subtitle: 'Preset amounts, payment gateways & receipts',
      highlights: ['RM10 to RM100 presets', 'Touch n Go / Maybank / Card', 'Free 5G Quota bonus', 'Instant confirmation receipt'],
    },
    {
      id: 'profile',
      title: '5. Profile & SIM Management',
      subtitle: 'eSIM QR code, PUK security code & history',
      highlights: ['Protected PUK reveal', 'eSIM QR profile modal', 'Auto-reload protection switch', 'Receipt transaction log'],
    },
    {
      id: 'importer',
      title: '6. HTML & Image Hotlinker',
      subtitle: 'Dynamic HTML Screen Importer & Parser',
      highlights: ['Extracts <img src="..."> hotlinks', 'Parses titles, lists & CTA buttons', 'Live mobile screen preview', 'Preset marketing templates'],
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-white">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
              MULTI-SCREEN SHOWCASE
            </span>
            <span className="text-xs text-neutral-400 font-semibold">• 6 Interactive Screen Views</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Hotlink App Screen Gallery</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Click on any screen below to open it inside the live interactive smartphone bezel, or test user flows, reload simulation, and the custom HTML hotlinker.
          </p>
        </div>

        <button
          onClick={() => onSelectScreen('home')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-bold text-xs text-white shadow-lg shadow-red-600/30 transition-all self-start md:self-auto shrink-0"
        >
          <Smartphone className="w-4 h-4" />
          <span>Launch Interactive Phone</span>
        </button>
      </div>

      {/* Screen Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screensMeta.map((screen) => (
          <div
            key={screen.id}
            onClick={() => onSelectScreen(screen.id)}
            className="group rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-red-600/60 p-5 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-red-500 uppercase tracking-wider">
                  {screen.id.toUpperCase()} VIEW
                </span>
                <span className="w-8 h-8 rounded-xl bg-neutral-800 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                {screen.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">{screen.subtitle}</p>

              {/* Highlights */}
              <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-2">
                {screen.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-mono">Tap to interact</span>
              <span className="font-bold text-red-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Open Screen →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
