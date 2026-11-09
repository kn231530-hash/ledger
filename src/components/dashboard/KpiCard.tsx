import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  amount: string;
  trendText?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: React.FC<{ className?: string }>;
  accentColor?: 'emerald' | 'rose' | 'blue' | 'slate';
  subtitle?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  amount,
  trendText,
  trendDirection,
  icon: Icon,
  accentColor = 'emerald',
  subtitle,
}) => {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    blue: 'bg-sky-50 text-sky-600 border-sky-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {title}
          </span>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5 tracking-tight">
            {amount}
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[accentColor]} shrink-0`}>
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      {(trendText || subtitle) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {trendText && (
            <div className="flex items-center gap-1 font-semibold">
              {trendDirection === 'up' && (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              )}
              {trendDirection === 'down' && (
                <TrendingDown className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
              )}
              <span className={trendDirection === 'up' ? 'text-emerald-700' : trendDirection === 'down' ? 'text-rose-700' : 'text-slate-600'}>
                {trendText}
              </span>
            </div>
          )}
          {subtitle && (
            <span className="text-slate-400 font-medium ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
