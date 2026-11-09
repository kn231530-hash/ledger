import React from 'react';
import { Landmark, CreditCard, Wallet, ArrowUpRight, Plus } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Account } from '../../types/finance';

interface AccountsOverviewWidgetProps {
  onAddAccountClick: () => void;
}

export const AccountsOverviewWidget: React.FC<AccountsOverviewWidgetProps> = ({
  onAddAccountClick,
}) => {
  const { accounts, formatCurrency, setActivePage } = useFinance();

  const getAccountIcon = (type: Account['type']) => {
    switch (type) {
      case 'credit':
        return CreditCard;
      case 'cash':
        return Wallet;
      default:
        return Landmark;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Your Accounts</h3>
          <p className="text-xs text-slate-500 mt-0.5">Asset balances and credit lines</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddAccountClick}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Add new account"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => setActivePage('accounts')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            <span>All Accounts</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {accounts.slice(0, 3).map((acc) => {
          const Icon = getAccountIcon(acc.type);
          const isCredit = acc.type === 'credit';

          return (
            <div
              key={acc.id}
              onClick={() => setActivePage('accounts')}
              className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: acc.color || '#059669' }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate text-xs font-bold text-slate-800">
                    {acc.name}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono shrink-0">
                  {acc.accountNumberLast4 ? `••${acc.accountNumberLast4}` : acc.type}
                </span>
              </div>

              <div>
                <div
                  className={`text-base font-bold tabular-nums tracking-tight ${
                    isCredit ? 'text-slate-700' : 'text-slate-900'
                  }`}
                >
                  {formatCurrency(acc.balance)}
                </div>
                <div className="text-[10px] text-slate-400 font-medium capitalize mt-0.5">
                  {isCredit ? 'Current Balance Owed' : 'Available Balance'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
