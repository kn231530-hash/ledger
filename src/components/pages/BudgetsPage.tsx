import React from 'react';
import { 
  PieChart, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Edit2, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Budget } from '../../types/finance';

interface BudgetsPageProps {
  onAddBudgetClick: () => void;
  onEditBudget: (budget: Budget) => void;
  onDeleteBudget: (budget: Budget) => void;
}

export const BudgetsPage: React.FC<BudgetsPageProps> = ({
  onAddBudgetClick,
  onEditBudget,
  onDeleteBudget,
}) => {
  const { budgetUsageList, formatCurrency, selectedMonth } = useFinance();

  const totalBudgetLimit = budgetUsageList.reduce((sum, b) => sum + b.budget.monthlyLimit, 0);
  const totalBudgetSpent = budgetUsageList.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = Math.max(0, totalBudgetLimit - totalBudgetSpent);
  const overallPercent = totalBudgetLimit > 0 ? Math.round((totalBudgetSpent / totalBudgetLimit) * 100) : 0;

  const exceededCount = budgetUsageList.filter((b) => b.status === 'exceeded').length;
  const warningCount = budgetUsageList.filter((b) => b.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Budget Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Set target limits by category to guard against overspending
          </p>
        </div>

        <button
          onClick={onAddBudgetClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create New Budget</span>
        </button>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Monthly Budget Utilization ({selectedMonth})
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {formatCurrency(totalBudgetSpent)}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                / {formatCurrency(totalBudgetLimit)} Limit
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-500">Remaining Budget</div>
              <div className="text-base font-bold text-emerald-600 tabular-nums">
                {formatCurrency(totalRemaining)}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800">
              {overallPercent}%
            </div>
          </div>
        </div>

        {/* Big Overall Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              overallPercent >= 100
                ? 'bg-rose-500'
                : overallPercent >= 80
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(overallPercent, 100)}%` }}
          />
        </div>

        {/* Status flags */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium pt-1">
          {exceededCount > 0 ? (
            <span className="text-rose-600 flex items-center gap-1 font-bold">
              <AlertTriangle className="w-4 h-4" /> {exceededCount} {exceededCount === 1 ? 'category exceeds' : 'categories exceed'} limit
            </span>
          ) : (
            <span className="text-emerald-600 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> All categories within budget bounds
            </span>
          )}

          {warningCount > 0 && (
            <span className="text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {warningCount} {warningCount === 1 ? 'category nearing' : 'categories nearing'} limit (&gt;80%)
            </span>
          )}
        </div>
      </div>

      {/* Category Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetUsageList.map((item) => {
          const { budget, spent, remaining, percentUsed, status } = item;
          const isExceeded = status === 'exceeded';
          const isWarning = status === 'warning';

          return (
            <div
              key={budget.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                isExceeded
                  ? 'border-rose-300 ring-1 ring-rose-300'
                  : isWarning
                  ? 'border-amber-300'
                  : 'border-slate-200/90'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: budget.color || '#10B981' }}
                    />
                    <h3 className="text-sm font-bold text-slate-900">{budget.category}</h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditBudget(budget)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                      title="Edit budget limit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteBudget(budget)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete budget"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Amounts */}
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {formatCurrency(spent)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium ml-1">
                      of {formatCurrency(budget.monthlyLimit)}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold font-mono ${
                      isExceeded ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-slate-600'
                    }`}
                  >
                    {percentUsed}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isExceeded
                        ? 'bg-rose-500'
                        : isWarning
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  />
                </div>
              </div>

              {/* Footer status */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {isExceeded ? (
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Exceeded by {formatCurrency(spent - budget.monthlyLimit)}
                  </span>
                ) : (
                  <span className="text-slate-500">
                    Remaining: <strong className="text-slate-800">{formatCurrency(remaining)}</strong>
                  </span>
                )}

                <span className="text-[11px] text-slate-400 font-medium capitalize">
                  Monthly limit
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
