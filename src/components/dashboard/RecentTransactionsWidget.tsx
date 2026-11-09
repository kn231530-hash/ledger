import React from 'react';
import { ArrowRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction } from '../../types/finance';

interface RecentTransactionsWidgetProps {
  onEditTransaction: (tx: Transaction) => void;
}

export const RecentTransactionsWidget: React.FC<RecentTransactionsWidgetProps> = ({
  onEditTransaction,
}) => {
  const { recentTransactions, accounts, formatCurrency, setActivePage } = useFinance();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest account activity</p>
        </div>
        <button
          onClick={() => setActivePage('transactions')}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {recentTransactions.map((tx) => {
          const account = accounts.find((a) => a.id === tx.accountId);
          const isIncome = tx.type === 'income';

          return (
            <div
              key={tx.id}
              onClick={() => onEditTransaction(tx)}
              className="py-3 flex items-center justify-between gap-3 group hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isIncome
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="w-4 h-4 stroke-[2.2]" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-600 transition-colors">
                    {tx.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{tx.date}</span>
                    <span>·</span>
                    <span>{tx.category}</span>
                    {account && (
                      <>
                        <span>·</span>
                        <span className="truncate">{account.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div
                  className={`text-xs font-bold tabular-nums ${
                    isIncome ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {formatCurrency(tx.amount, true)}
                </div>
                <span className="text-[10px] text-slate-400 font-medium capitalize">
                  {tx.paymentMethod}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
