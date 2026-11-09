import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Budget, ExpenseCategory } from '../../types/finance';
import { useFinance } from '../../context/FinanceContext';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetToEdit?: Budget | null;
}

const EXPENSE_CATEGORIES: { category: ExpenseCategory; defaultColor: string }[] = [
  { category: 'Housing & Rent', defaultColor: '#3B82F6' },
  { category: 'Food & Dining', defaultColor: '#10B981' },
  { category: 'Groceries', defaultColor: '#059669' },
  { category: 'Transportation', defaultColor: '#F59E0B' },
  { category: 'Utilities', defaultColor: '#6366F1' },
  { category: 'Entertainment', defaultColor: '#EC4899' },
  { category: 'Shopping', defaultColor: '#8B5CF6' },
  { category: 'Healthcare', defaultColor: '#14B8A6' },
  { category: 'Travel', defaultColor: '#F97316' },
  { category: 'Personal', defaultColor: '#64748B' },
  { category: 'Other Expense', defaultColor: '#94A3B8' },
];

export const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  budgetToEdit,
}) => {
  const { addBudget, updateBudget, budgets, userProfile } = useFinance();

  const [category, setCategory] = useState<ExpenseCategory>('Food & Dining');
  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (budgetToEdit) {
      setCategory(budgetToEdit.category);
      setMonthlyLimit(budgetToEdit.monthlyLimit.toString());
    } else {
      // Pick first unbudgeted category if available
      const existingCategories = new Set(budgets.map((b) => b.category));
      const available = EXPENSE_CATEGORIES.find((c) => !existingCategories.has(c.category));
      setCategory(available ? available.category : 'Food & Dining');
      setMonthlyLimit('');
    }
    setError(null);
  }, [budgetToEdit, isOpen, budgets]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numLimit = parseFloat(monthlyLimit);
    if (isNaN(numLimit) || numLimit <= 0) {
      setError('Please enter a valid monthly spending limit.');
      return;
    }

    const catConfig = EXPENSE_CATEGORIES.find((c) => c.category === category);
    const color = catConfig?.defaultColor || '#10B981';

    if (budgetToEdit) {
      updateBudget(budgetToEdit.id, {
        category,
        monthlyLimit: numLimit,
        color,
      });
    } else {
      addBudget({
        category,
        monthlyLimit: numLimit,
        color,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            {budgetToEdit ? 'Edit Category Budget' : 'Set Category Budget'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
              Expense Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 outline-none bg-white cursor-pointer"
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c.category} value={c.category}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
              Monthly Spending Limit ({userProfile.currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                {userProfile.currency}
              </span>
              <input
                type="number"
                step="1"
                min="1"
                placeholder="500"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-sm font-bold text-slate-900 outline-none tabular-nums"
                required
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{budgetToEdit ? 'Save Budget' : 'Set Budget'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
