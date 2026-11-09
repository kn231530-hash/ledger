import React, { useState } from 'react';
import { Zap, Check, ChevronRight, Globe, Flame, Shield, Filter } from 'lucide-react';
import { PassItem, PassCategory } from '../../types';

interface PassesScreenProps {
  passes: PassItem[];
  onSelectPass: (pass: PassItem) => void;
}

export const PassesScreen: React.FC<PassesScreenProps> = ({ passes, onSelectPass }) => {
  const [selectedCategory, setSelectedCategory] = useState<PassCategory | 'all'>('all');

  const categories: { id: PassCategory | 'all'; label: string; icon?: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Passes' },
    { id: '5g_unlimited', label: '5G Unlimited' },
    { id: 'pantas', label: 'Pantas High-Speed' },
    { id: 'streaming', label: 'Stream & Game' },
    { id: 'roaming', label: 'Roaming' },
    { id: 'booster', label: 'Turbo Booster' },
  ];

  const filteredPasses = selectedCategory === 'all'
    ? passes
    : passes.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-4 pb-20 text-white">
      {/* Header */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-500 fill-red-500" />
              Internet & Roaming Passes
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Uncapped 5G speeds with zero contracts on Malaysia's No. 1 Network
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-max pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Passes List */}
      <div className="px-4 space-y-3.5">
        {filteredPasses.map((pass) => (
          <div
            key={pass.id}
            className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-lg hover:border-neutral-700 transition-all flex flex-col"
          >
            {/* Card Header with Hotlinked Image preview banner */}
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={pass.imageUrl}
                alt={pass.name}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {pass.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {pass.badge}
                  </span>
                )}
                {pass.isPopular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Flame className="w-3 h-3 fill-current" /> TOP PICK
                  </span>
                )}
              </div>

              <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-base font-bold text-white drop-shadow-sm">{pass.name}</h3>
                  <p className="text-xs text-neutral-300 font-medium">{pass.quotaLabel}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white leading-none">
                    RM {pass.price}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{pass.period}</div>
                </div>
              </div>
            </div>

            {/* Perks & Features */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Speed:</span>
                  <span className="font-semibold text-emerald-400">{pass.speed}</span>
                </div>
                {pass.hotspotLabel && (
                  <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-800/80">
                    <span className="text-neutral-400">Hotspot Sharing:</span>
                    <span className="font-semibold text-white">{pass.hotspotLabel}</span>
                  </div>
                )}
                <div className="pt-1.5 space-y-1">
                  {pass.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectPass(pass)}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-600/30"
                >
                  <span>Subscribe for RM {pass.price}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5G Coverage Promise Notice */}
      <div className="px-4">
        <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-red-500 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-white">97% Nationwide 5G & 4G Coverage</div>
            <div className="text-neutral-400 text-[11px] mt-0.5">
              High speed connectivity with low ping across peninsular and east Malaysia.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
