import React, { useState } from 'react';
import { Gift, Sparkles, Trophy, Store, ChevronRight, Check, Disc3 } from 'lucide-react';
import { RewardDeal, UserAccount } from '../../types';

interface RewardsScreenProps {
  account: UserAccount;
  rewards: RewardDeal[];
  onClaimDeal: (deal: RewardDeal) => void;
  onSpinWin: (prize: string, pointsChange: number) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  account,
  rewards,
  onClaimDeal,
  onSpinWin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDeg, setSpinDeg] = useState(0);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);

  const prizes = [
    { label: '5GB 5G Data', points: 0, color: '#DC2626' },
    { label: '100 Points', points: 100, color: '#D97706' },
    { label: 'RM 3 Reload', points: 0, color: '#059669' },
    { label: '10GB Weekend', points: 0, color: '#2563EB' },
    { label: 'Free Drink', points: 0, color: '#7C3AED' },
    { label: '250 Points', points: 250, color: '#DB2777' },
  ];

  const handleSpin = () => {
    if (isSpinning || hasSpunToday) return;
    setIsSpinning(true);
    setSpinResult(null);

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const segmentAngle = 360 / prizes.length;
    // Calculate final rotation
    const targetDeg = extraRounds * 360 + (360 - prizeIndex * segmentAngle - segmentAngle / 2);

    setSpinDeg(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpunToday(true);
      const wonPrize = prizes[prizeIndex];
      setSpinResult(wonPrize.label);
      onSpinWin(wonPrize.label, wonPrize.points);
    }, 3800);
  };

  const categories = [
    { id: 'all', label: 'All Deals' },
    { id: 'fnb', label: 'Food & Drinks' },
    { id: 'gaming', label: 'Gaming & Esports' },
    { id: 'entertainment', label: 'Movies & Fun' },
    { id: 'shopping', label: 'Shopping' },
  ];

  const filteredRewards = selectedCategory === 'all'
    ? rewards
    : rewards.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-4 pb-20 text-white">
      {/* Header */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Gift className="w-5 h-5 text-red-500 fill-red-500" />
              HotlinkMU & Rewards
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Personalized perks, free daily spins, and lifestyle discounts
            </p>
          </div>
        </div>
      </div>

      {/* Points & Member Status Banner */}
      <div className="px-4">
        <div className="rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-red-950/60 border border-neutral-800 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>GOLD MEMBER</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {account.points.toLocaleString()} <span className="text-xs font-normal text-neutral-400">Points</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                Earn 1 pt for every RM1 reloaded
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                Level 2 of 4
              </span>
              <div className="w-24 h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
                <div className="w-3/5 h-full bg-amber-400 rounded-full" />
              </div>
              <div className="text-[10px] text-neutral-500 mt-1">580 pts to Platinum</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Spin & Win Minigame */}
      <div className="px-4">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-4 shadow-xl text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Daily Free Spin & Win
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400 mb-3">
            Spin the wheel once a day to win free data, reload cash, and bonus points!
          </p>

          {/* Wheel Graphic Container */}
          <div className="relative w-48 h-48 mx-auto my-2 flex items-center justify-center">
            {/* Pointer arrow on top */}
            <div className="absolute -top-2 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-white drop-shadow-md" />

            {/* Rotating Wheel */}
            <div
              className="w-full h-full rounded-full border-4 border-neutral-700 shadow-2xl relative overflow-hidden transition-transform duration-[3800ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
              style={{
                transform: `rotate(${spinDeg}deg)`,
                background: 'conic-gradient(#DC2626 0deg 60deg, #D97706 60deg 120deg, #059669 120deg 180deg, #2563EB 180deg 240deg, #7C3AED 240deg 300deg, #DB2777 300deg 360deg)',
              }}
            >
              {prizes.map((p, idx) => {
                const angle = idx * 60 + 30;
                return (
                  <div
                    key={idx}
                    className="absolute w-full h-full text-center text-[9px] font-black text-white uppercase drop-shadow-md select-none"
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <div className="pt-2">{p.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Center Cap button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning || hasSpunToday}
              className={`absolute z-10 w-14 h-14 rounded-full border-2 border-white shadow-xl flex flex-col items-center justify-center font-black transition-all ${
                hasSpunToday
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-white text-neutral-950 hover:scale-105 active:scale-95'
              }`}
            >
              <Disc3 className={`w-4 h-4 text-red-600 ${isSpinning ? 'animate-spin' : ''}`} />
              <span className="text-[9px] leading-tight">
                {hasSpunToday ? 'CLAIMED' : isSpinning ? '...' : 'SPIN'}
              </span>
            </button>
          </div>

          {/* Spin Result Banner */}
          {spinResult && (
            <div className="mt-3 p-3 rounded-2xl bg-red-600/20 border border-red-500/40 text-xs text-white animate-fadeIn">
              <span className="font-extrabold text-amber-300">Congratulations!</span> You won{' '}
              <strong className="text-white underline">{spinResult}</strong>! Added to your account.
            </div>
          )}

          {!hasSpunToday && !isSpinning && (
            <div className="text-[10px] text-amber-400 font-semibold mt-2">
              Tap SPIN to play your free daily turn!
            </div>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-max pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
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

      {/* Deals List */}
      <div className="px-4 space-y-3.5">
        {filteredRewards.map((deal) => {
          const canAfford = account.points >= deal.pointsCost;
          return (
            <div
              key={deal.id}
              className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-lg hover:border-neutral-700 transition-all flex flex-col"
            >
              {/* Hotlinked Image Header */}
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={deal.imageUrl}
                  alt={deal.merchant}
                  className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {deal.discountBadge}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300">
                      <Store className="w-3 h-3 text-red-500" />
                      <span>{deal.merchant}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight drop-shadow-sm mt-0.5">
                      {deal.title}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-amber-400">
                      {deal.pointsCost} <span className="text-[10px] text-neutral-400 font-normal">pts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deal Info & Action */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="text-xs text-neutral-400">
                  <p className="line-clamp-1">{deal.description}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Valid till {deal.expiryDate}</p>
                </div>

                <button
                  onClick={() => onClaimDeal(deal)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-1 ${
                    canAfford
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30 active:scale-95'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                  }`}
                >
                  <span>Claim</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
