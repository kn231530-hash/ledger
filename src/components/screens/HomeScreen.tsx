import React from 'react';
import { 
  Zap, 
  Plus, 
  ArrowUpRight, 
  Gift, 
  Globe2, 
  Share2, 
  PhoneCall, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Wifi
} from 'lucide-react';
import { UserAccount, PassItem, ScreenType } from '../../types';

interface HomeScreenProps {
  account: UserAccount;
  onNavigate: (screen: ScreenType) => void;
  onSelectPass: (pass: PassItem) => void;
  featuredPass: PassItem;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  account,
  onNavigate,
  onSelectPass,
  featuredPass,
}) => {
  const percentage = Math.round((account.remainingQuotaGb / account.totalQuotaGb) * 100);
  const hotspotPercent = Math.round((account.hotspotRemainingGb / account.hotspotTotalGb) * 100);

  const quickActions = [
    {
      id: 'reload',
      label: 'Top Up',
      sublabel: 'Earn bonus',
      icon: Plus,
      color: 'bg-red-600 text-white',
      onClick: () => onNavigate('topup'),
    },
    {
      id: 'passes',
      label: 'Internet',
      sublabel: '5G Passes',
      icon: Zap,
      color: 'bg-neutral-800 text-red-500 hover:bg-neutral-700',
      onClick: () => onNavigate('passes'),
    },
    {
      id: 'hotlinkmu',
      label: 'HotlinkMU',
      sublabel: 'Daily Perks',
      icon: Gift,
      color: 'bg-neutral-800 text-amber-400 hover:bg-neutral-700',
      onClick: () => onNavigate('rewards'),
    },
    {
      id: 'roaming',
      label: 'Roaming',
      sublabel: 'ASEAN / World',
      icon: Globe2,
      color: 'bg-neutral-800 text-blue-400 hover:bg-neutral-700',
      onClick: () => onNavigate('passes'),
    },
    {
      id: 'share',
      label: 'Share Credit',
      sublabel: 'To Friends',
      icon: Share2,
      color: 'bg-neutral-800 text-emerald-400 hover:bg-neutral-700',
      onClick: () => onNavigate('topup'),
    },
    {
      id: 'importer',
      label: 'HTML Screens',
      sublabel: 'Custom Importer',
      icon: ArrowUpRight,
      color: 'bg-neutral-800 text-purple-400 hover:bg-neutral-700',
      onClick: () => onNavigate('importer'),
    },
  ];

  return (
    <div className="space-y-4 pb-20 text-white">
      {/* Top Greeting Header */}
      <div className="flex items-center justify-between px-5 pt-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={account.avatarUrl}
              alt={account.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-red-500 shadow-md"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white">{account.name}</span>
              <span className="px-1.5 py-0.2 text-[9px] font-black bg-red-600/30 text-red-400 border border-red-500/40 rounded">
                PREPAID
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono">{account.phone}</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs hover:border-neutral-700 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
          <span className="font-semibold text-[11px]">Active</span>
        </button>
      </div>

      {/* Main Account Balance Card */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-neutral-950 p-5 shadow-xl shadow-red-950/40 border border-red-500/30">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-red-100/80 flex items-center gap-1">
                Credit Balance
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold text-red-100">RM</span>
                <span className="text-3xl font-black tracking-tight text-white">
                  {account.balance.toFixed(2)}
                </span>
              </div>
              <div className="text-[11px] text-red-100/70 mt-1 flex items-center gap-1">
                <span>Valid until</span>
                <span className="font-bold text-white">{account.validityDate}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('topup')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-bold text-xs shadow-lg hover:bg-neutral-100 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-red-600 stroke-[3]" />
              <span>Top Up</span>
            </button>
          </div>

          {/* Quick Points & Plan Row */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/90 relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                <strong className="text-white font-extrabold">{account.points.toLocaleString()}</strong> Hotlink Points
              </span>
            </div>
            <button
              onClick={() => onNavigate('rewards')}
              className="text-[11px] font-bold text-amber-200 hover:text-white flex items-center gap-0.5 underline underline-offset-2"
            >
              <span>Redeem</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 5G High-Speed Data Gauge Card */}
      <div className="px-4">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-black text-xs border border-red-500/30">
                5G
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">High-Speed 5G Quota</h3>
                <p className="text-[11px] text-neutral-400">All-Access Internet</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-black border border-emerald-500/30 flex items-center gap-1">
              <Wifi className="w-3 h-3" /> ACTIVE
            </span>
          </div>

          {/* Big Progress Display */}
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-2xl font-black text-white">{account.remainingQuotaGb}</span>
              <span className="text-sm text-neutral-400 font-bold ml-1">/ {account.totalQuotaGb} GB</span>
            </div>
            <span className="text-xs font-bold text-red-400 font-mono">{percentage}% Remaining</span>
          </div>

          {/* Glowing Progress Bar */}
          <div className="w-full h-3.5 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-700 shadow-sm shadow-red-500/50"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Sub-Quotas Grid (Hotspot + Unlimited Social) */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-neutral-800/80 text-xs">
            <div className="bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Hotspot Sharing</div>
              <div className="font-bold text-white mt-0.5">
                {account.hotspotRemainingGb} GB <span className="text-[10px] text-neutral-400">/ {account.hotspotTotalGb}GB</span>
              </div>
              <div className="w-full h-1 bg-neutral-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${hotspotPercent}%` }} />
              </div>
            </div>

            <div className="bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Social & Stream</div>
              <div className="font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <span>UNLIMITED</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">HD</span>
              </div>
              <div className="text-[10px] text-neutral-400 mt-1">YouTube, TikTok, Netflix</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="px-4">
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
          Quick Services
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all text-center group active:scale-95"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                  {action.label}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {action.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HotlinkMU Featured Promo Banner */}
      <div className="px-4">
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-lg group cursor-pointer"
             onClick={() => onNavigate('rewards')}>
          <div className="h-36 w-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
              alt="HotlinkMU Gaming & Food"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" /> HOTLINKMU EXCLUSIVE
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <h4 className="text-base font-bold text-white drop-shadow-md">Daily Rewards & Free Spins</h4>
                <p className="text-xs text-neutral-300 drop-shadow-xs">Claim food vouchers, gaming passes & reload credits</p>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-white text-neutral-950 text-xs font-bold shrink-0">
                Play
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Pass Card */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Recommended For You
          </div>
          <button
            onClick={() => onNavigate('passes')}
            className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-4 hover:border-red-900/50 transition-all flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-neutral-700">
              <img
                src={featuredPass.imageUrl}
                alt={featuredPass.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">{featuredPass.name}</span>
                <span className="text-[9px] font-black bg-amber-500/20 text-amber-300 px-1 rounded">
                  5G
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">{featuredPass.quotaLabel}</p>
              <div className="text-xs font-extrabold text-red-500 mt-0.5">
                RM {featuredPass.price} <span className="text-[10px] text-neutral-400 font-normal">/ {featuredPass.period}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectPass(featuredPass)}
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shrink-0 transition-colors shadow-md shadow-red-600/30"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
