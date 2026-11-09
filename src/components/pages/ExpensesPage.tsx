import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, 
  Plus, 
  DollarSign, 
  ShoppingBag, 
  PieChart as PieIcon,
  Edit2, 
  Trash2,
  Calendar
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction } from '../../types/finance';

interface ExpensesPageProps {
  onAddExpenseClick: () => void;
  onEditTransaction: (tx: Transaction) => void;
  onDeleteTransaction: (tx: Transaction) => void;
}

export const ExpensesPage: React.FC<ExpensesPageProps> = ({
  onAddExpenseClick,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const { transactions, accounts, formatCurrency, selectedMonth, categorySpendingMap } = useFinance();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // All expense transactions
  const allExpenses = useMemo(() => {
    return transactions.filter((t) => t.type === 'expense');
  }, [transactions]);

  // Current month expense transactions
  const currentMonthExpensesTxs = useMemo(() => {
    return allExpenses.filter((t) => t.date.startsWith(selectedMonth));
  }, [allExpenses, selectedMonth]);

  const currentMonthTotal = useMemo(() => {
    return currentMonthExpensesTxs.reduce((sum, t) => sum + t.amount, 0);
  }, [currentMonthExpensesTxs]);

  // Category breakdown
  const categoryEntries = Object.entries(categorySpendingMap)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);

  const topExpenseCategory = categoryEntries[0] ? categoryEntries[0][0] : 'None';
  const topExpenseAmount = categoryEntries[0] ? categoryEntries[0][1] : 0;

  // Filtered expense table
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'all') return allExpenses;
    return allExpenses.filter((t) => t.category === selectedCategory);
  }, [allExpenses, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Expense Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor living costs, subscriptions, and discretionary outflows
          </p>
        </div>

        <button
          onClick={onAddExpenseClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Expense Record</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Monthly Expenses
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {formatCurrency(currentMonthTotal)}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Selected Period ({selectedMonth})
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Highest Expense Category
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5 truncate">
            {topExpenseCategory}
          </div>
          <div className="text-xs text-rose-600 font-semibold mt-2">
            {formatCurrency(topExpenseAmount)} this month
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Daily Average Spend
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {formatCurrency(currentMonthTotal / 30)}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Estimated daily burn rate
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Logged Expenses
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {formatCurrency(allExpenses.reduce((s, t) => s + t.amount, 0))}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Across {allExpenses.length} transactions
          </div>
        </div>
      </div>

      {/* Highest Spending Categories Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Highest Spending Categories</h3>
        <p className="text-xs text-slate-500 mb-4">Breakdown of outflows for {selectedMonth}</p>

        {categoryEntries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No expenses recorded for this month.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryEntries.map(([category, amount]) => {
              const pct = currentMonthTotal > 0 ? Math.round((amount / currentMonthTotal) * 100) : 0;
              return (
                <div key={category} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">{pct}%</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-800 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Expense History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Expense History</h3>
            <p className="text-xs text-slate-500">Chronological ledger of payments</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 outline-none bg-white cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categoryEntries.map(([c]) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payee / Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Paid From</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No expense records found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((tx) => {
                  const account = accounts.find((a) => a.id === tx.accountId);
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{tx.title}</div>
                        {tx.notes && (
                          <div className="text-[11px] text-slate-400 mt-0.5">{tx.notes}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">{tx.category}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {account ? account.name : 'Unknown Account'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 capitalize">
                        {tx.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold text-slate-900">
                        -{formatCurrency(tx.amount)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditTransaction(tx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Edit expense"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTransaction(tx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete expense"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
