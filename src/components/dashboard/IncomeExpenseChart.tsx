import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const IncomeExpenseChart: React.FC = () => {
  const { monthlyTrends, formatCurrency } = useFinance();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Determine max value for chart scaling
  const maxVal = Math.max(
    ...monthlyTrends.map((m) => Math.max(m.income, m.expense)),
    5000
  );

  const chartHeight = 180;
  const paddingX = 40;
  const chartWidth = 520;
  const barWidth = 14;
  const groupSpacing = (chartWidth - paddingX * 2) / monthlyTrends.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Income vs. Expenses</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly cash flow comparison over time</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
            <span>Expenses</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto no-scrollbar">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          className="w-full h-56 select-none"
        >
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = chartHeight - pct * chartHeight + 10;
            const gridVal = maxVal * pct;
            return (
              <g key={pct}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - 20}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray={pct === 0 ? 'none' : '3 3'}
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-400 font-mono font-medium"
                >
                  ${(gridVal / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {monthlyTrends.map((m, idx) => {
            const groupX = paddingX + idx * groupSpacing + groupSpacing / 2;
            const incomeHeight = (m.income / maxVal) * chartHeight;
            const expenseHeight = (m.expense / maxVal) * chartHeight;

            const incomeY = chartHeight - incomeHeight + 10;
            const expenseY = chartHeight - expenseHeight + 10;

            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={m.monthKey}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {/* Background hover column */}
                <rect
                  x={groupX - barWidth - 4}
                  y={10}
                  width={barWidth * 2 + 8}
                  height={chartHeight}
                  fill={isHovered ? '#F8FAFC' : 'transparent'}
                  rx="6"
                  className="transition-colors"
                />

                {/* Income Bar (Green) */}
                <rect
                  x={groupX - barWidth - 1}
                  y={incomeY}
                  width={barWidth}
                  height={incomeHeight}
                  fill="#10B981"
                  rx="3"
                  className="transition-all duration-300"
                />

                {/* Expense Bar (Slate) */}
                <rect
                  x={groupX + 1}
                  y={expenseY}
                  width={barWidth}
                  height={expenseHeight}
                  fill="#94A3B8"
                  rx="3"
                  className="transition-all duration-300"
                />

                {/* Month Label */}
                <text
                  x={groupX}
                  y={chartHeight + 28}
                  textAnchor="middle"
                  className={`text-[11px] font-semibold transition-colors ${
                    isHovered ? 'fill-slate-900 font-bold' : 'fill-slate-500'
                  }`}
                >
                  {m.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Popup */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-3.5 rounded-xl shadow-xl pointer-events-none flex items-center gap-4 z-20 animate-fadeIn"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">
                {monthlyTrends[hoveredIdx].month} {monthlyTrends[hoveredIdx].year}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-emerald-400 font-bold tabular-nums">
                  +{formatCurrency(monthlyTrends[hoveredIdx].income)}
                </span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-300 font-bold tabular-nums">
                  -{formatCurrency(monthlyTrends[hoveredIdx].expense)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
