import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Plus, 
  DollarSign, 
  Briefcase, 
  LineChart, 
  Edit2, 
  Trash2,
  PieChart as PieIcon
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction, IncomeCategory } from '../../types/finance';

interface IncomePageProps {
  onAddIncomeClick: () => void;
  onEditTransaction: (tx: Transaction) => void;
  onDeleteTransaction: (tx: Transaction) => void;
}

export const IncomePage: React.FC<IncomePageProps> = ({
  onAddIncomeClick,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const { transactions, accounts, formatCurrency, selectedMonth, incomeSourceMap } = useFinance();

  // All income transactions
  const allIncome = useMemo(() => {
    return transactions.filter((t) => t.type === 'income');
  }, [transactions]);

  // Current month income transactions
  const currentMonthIncomeTxs = useMemo(() => {
    return allIncome.filter((t) => t.date.startsWith(selectedMonth));
  }, [allIncome, selectedMonth]);

  const currentMonthTotal = useMemo(() => {
    return currentMonthIncomeTxs.reduce((sum, t) => sum + t.amount, 0);
  }, [currentMonthIncomeTxs]);

  // Top income source
  const sourceEntries = Object.entries(incomeSourceMap).sort((a, b) => b[1] - a[1]);
  const topSource = sourceEntries[0] ? sourceEntries[0][0] : 'None';
  const topSourceAmount = sourceEntries[0] ? sourceEntries[0][1] : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Income Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track all revenue streams, client consulting, and portfolio yields
          </p>
        </div>

        <button
          onClick={onAddIncomeClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Income Record</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Monthly Income
          </div>
          <div className="text-2xl font-bold text-emerald-600 tabular-nums mt-1.5">
            {formatCurrency(currentMonthTotal)}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Selected Period ({selectedMonth})
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Top Income Stream
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5 truncate">
            {topSource}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-2">
            {formatCurrency(topSourceAmount)} this month
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Income Streams
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {sourceEntries.length} sources
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Salary, Consulting, Dividends
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            All-Time Logged Income
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {formatCurrency(allIncome.reduce((s, t) => s + t.amount, 0))}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Across {allIncome.length} recorded payments
          </div>
        </div>
      </div>

      {/* Income Source Breakdown Bar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Income Sources Distribution</h3>
        <p className="text-xs text-slate-500 mb-4">Relative share of revenue for {selectedMonth}</p>

        {sourceEntries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No income entries recorded for this period.
          </div>
        ) : (
          <div className="space-y-3">
            {sourceEntries.map(([source, amount]) => {
              const pct = currentMonthTotal > 0 ? Math.round((amount / currentMonthTotal) * 100) : 0;
              return (
                <div key={source} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono">{pct}%</span>
                      <span className="font-bold text-emerald-600 tabular-nums">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Income History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Income Records History</h3>
            <p className="text-xs text-slate-500">All recorded incoming cash flow</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Source Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Deposited Into</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allIncome.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No income records found. Click "Add Income Record" to add your first revenue stream.
                  </td>
                </tr>
              ) : (
                allIncome.map((tx) => {
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
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold text-emerald-600">
                        +{formatCurrency(tx.amount)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditTransaction(tx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Edit record"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTransaction(tx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete record"
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
