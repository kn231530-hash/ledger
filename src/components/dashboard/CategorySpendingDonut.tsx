import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { ExpenseCategory } from '../../types/finance';

const CATEGORY_COLORS: Record<string, string> = {
  'Housing & Rent': '#3B82F6', // Blue
  'Food & Dining': '#10B981', // Emerald
  'Groceries': '#059669', // Dark Emerald
  'Transportation': '#F59E0B', // Amber
  'Utilities': '#6366F1', // Indigo
  'Entertainment': '#EC4899', // Pink
  'Shopping': '#8B5CF6', // Purple
  'Healthcare': '#14B8A6', // Teal
  'Travel': '#F97316', // Orange
  'Personal': '#64748B', // Slate
  'Other Expense': '#94A3B8', // Gray
};

export const CategorySpendingDonut: React.FC = () => {
  const { categorySpendingMap, currentMonthExpenses, formatCurrency } = useFinance();

  const entries = Object.entries(categorySpendingMap)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);

  if (entries.length === 0 || currentMonthExpenses === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Spending by Category</h3>
          <p className="text-xs text-slate-500 mt-0.5">Distribution of current expenses</p>
        </div>
        <div className="py-12 text-center text-xs text-slate-400">
          No expenses recorded for this month yet.
        </div>
      </div>
    );
  }

  // Calculate SVG Donut strokes
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  const donutSegments = entries.map(([category, amount]) => {
    const percent = (amount / currentMonthExpenses) * 100;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += percent;

    return {
      category: category as ExpenseCategory,
      amount,
      percent: Math.round(percent),
      color: CATEGORY_COLORS[category] || '#94A3B8',
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Spending Breakdown</h3>
            <p className="text-xs text-slate-500 mt-0.5">Top expense categories this month</p>
          </div>
          <span className="text-xs font-bold text-slate-900 tabular-nums">
            {formatCurrency(currentMonthExpenses)}
          </span>
        </div>

        {/* Donut Chart */}
        <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="18"
            />
            {/* Colored Segment arcs */}
            {donutSegments.map((seg) => (
              <circle
                key={seg.category}
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth="18"
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 hover:opacity-80"
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total Spent
            </span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              {formatCurrency(currentMonthExpenses)}
            </span>
          </div>
        </div>
      </div>

      {/* Categories Legend List */}
      <div className="space-y-2 mt-2 pt-3 border-t border-slate-100 max-h-48 overflow-y-auto no-scrollbar">
        {donutSegments.slice(0, 4).map((item) => (
          <div key={item.category} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate pr-2">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-slate-700 truncate">{item.category}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 font-mono text-[11px]">{item.percent}%</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatCurrency(item.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
