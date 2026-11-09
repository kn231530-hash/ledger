import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  Landmark, 
  CreditCard, 
  TrendingUp, 
  Plus, 
  Edit2, 
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  Filter
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Account, Transaction } from '../../types/finance';

interface AccountsPageProps {
  onAddAccountClick: () => void;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (account: Account) => void;
  onEditTransaction: (tx: Transaction) => void;
}

export const AccountsPage: React.FC<AccountsPageProps> = ({
  onAddAccountClick,
  onEditAccount,
  onDeleteAccount,
  onEditTransaction,
}) => {
  const { accounts, transactions, formatCurrency, totalBalance } = useFinance();
  const [selectedAccountId, setSelectedAccountId] = useState<string>('all');

  const selectedAccount = useMemo(() => {
    return accounts.find((a) => a.id === selectedAccountId);
  }, [accounts, selectedAccountId]);

  // Filter transactions for selected account
  const accountTransactions = useMemo(() => {
    if (selectedAccountId === 'all') return transactions;
    return transactions.filter((t) => t.accountId === selectedAccountId);
  }, [transactions, selectedAccountId]);

  const getAccountIcon = (type: Account['type']) => {
    switch (type) {
      case 'credit':
        return CreditCard;
      case 'investment':
        return TrendingUp;
      case 'cash':
        return Wallet;
      default:
        return Landmark;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Accounts & Wallets</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your depository accounts, credit cards, brokerage and cash
          </p>
        </div>

        <button
          onClick={onAddAccountClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Account</span>
        </button>
      </div>

      {/* Net Worth Summary Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Consolidated Liquid Net Worth
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums mt-1">
            {formatCurrency(totalBalance)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Aggregated across {accounts.length} connected financial accounts
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedAccountId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedAccountId === 'all'
                ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Show All Accounts
          </button>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => {
          const Icon = getAccountIcon(acc.type);
          const isSelected = selectedAccountId === acc.id;
          const isCredit = acc.type === 'credit';

          // Inflows & outflows for this account
          const accTxs = transactions.filter((t) => t.accountId === acc.id);
          const totalIn = accTxs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
          const totalOut = accTxs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

          return (
            <div
              key={acc.id}
              onClick={() => setSelectedAccountId(acc.id)}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: acc.color || '#059669' }}
                    >
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{acc.name}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <span className="capitalize">{acc.type}</span>
                        {acc.accountNumberLast4 && (
                          <>
                            <span>·</span>
                            <span className="font-mono">•••• {acc.accountNumberLast4}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onEditAccount(acc)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      title="Edit account"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {accounts.length > 1 && (
                      <button
                        onClick={() => onDeleteAccount(acc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete account"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div
                    className={`text-2xl font-bold tabular-nums tracking-tight ${
                      isCredit ? 'text-slate-700' : 'text-slate-900'
                    }`}
                  >
                    {formatCurrency(acc.balance)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isCredit ? 'Current Owed Balance' : 'Available Balance'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px]">
                  In: <strong className="text-emerald-600 tabular-nums">+{formatCurrency(totalIn)}</strong>
                </span>
                <span className="text-[11px]">
                  Out: <strong className="text-slate-800 tabular-nums">-{formatCurrency(totalOut)}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Transactions History Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {selectedAccount ? `${selectedAccount.name} Transaction History` : 'All Account Transactions'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {accountTransactions.length} activity records
            </p>
          </div>
          {selectedAccountId !== 'all' && (
            <button
              onClick={() => setSelectedAccountId('all')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accountTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No transactions associated with this account.
                  </td>
                </tr>
              ) : (
                accountTransactions.map((tx) => {
                  const isIncome = tx.type === 'income';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{tx.title}</div>
                        {tx.notes && <div className="text-[11px] text-slate-400 mt-0.5">{tx.notes}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">{tx.category}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 capitalize">
                        {tx.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold">
                        <span className={isIncome ? 'text-emerald-600' : 'text-slate-900'}>
                          {formatCurrency(tx.amount, true)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onEditTransaction(tx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Edit transaction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
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
