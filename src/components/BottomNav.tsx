import React from 'react';
import { Home, Zap, Gift, PlusCircle, User, Code2 } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unclaimedRewardsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  unclaimedRewardsCount = 2,
}) => {
  const navItems: { id: ScreenType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'passes', label: 'Passes', icon: Zap },
    { id: 'rewards', label: 'HotlinkMU', icon: Gift },
    { id: 'topup', label: 'Reload', icon: PlusCircle },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'importer', label: 'HTML Screens', icon: Code2 },
  ];

  return (
    <div className="relative border-t border-neutral-800/80 bg-neutral-950/95 backdrop-blur-md px-2 py-2 select-none z-20">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          const isImporter = item.id === 'importer';

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-red-500 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'group-hover:scale-105'
                  }`}
                />
                {item.id === 'rewards' && unclaimedRewardsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {unclaimedRewardsCount}
                  </span>
                )}
                {isImporter && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-black text-[8px] font-black px-1 rounded-full uppercase tracking-tighter shadow-xs">
                    New
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold text-red-500' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-0.5 shadow-sm shadow-red-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
