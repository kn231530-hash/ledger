import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Account, AccountType } from '../../types/finance';
import { useFinance } from '../../context/FinanceContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountToEdit?: Account | null;
}

const ACCOUNT_TYPES: { type: AccountType; label: string; defaultColor: string }[] = [
  { type: 'checking', label: 'Checking Account', defaultColor: '#059669' },
  { type: 'savings', label: 'High-Yield Savings', defaultColor: '#10B981' },
  { type: 'credit', label: 'Credit Card', defaultColor: '#64748B' },
  { type: 'investment', label: 'Investment / Brokerage', defaultColor: '#0284C7' },
  { type: 'cash', label: 'Cash Wallet', defaultColor: '#D97706' },
];

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  accountToEdit,
}) => {
  const { addAccount, updateAccount, userProfile } = useFinance();

  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>('checking');
  const [balance, setBalance] = useState('');
  const [institution, setInstitution] = useState('');
  const [accountNumberLast4, setAccountNumberLast4] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accountToEdit) {
      setName(accountToEdit.name);
      setType(accountToEdit.type);
      setBalance(accountToEdit.balance.toString());
      setInstitution(accountToEdit.institution || '');
      setAccountNumberLast4(accountToEdit.accountNumberLast4 || '');
    } else {
      setName('');
      setType('checking');
      setBalance('');
      setInstitution('');
      setAccountNumberLast4('');
    }
    setError(null);
  }, [accountToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide an account name.');
      return;
    }

    const numBalance = parseFloat(balance);
    if (isNaN(numBalance)) {
      setError('Please enter a valid balance.');
      return;
    }

    const selectedTypeConfig = ACCOUNT_TYPES.find((t) => t.type === type);
    const color = selectedTypeConfig?.defaultColor || '#059669';

    if (accountToEdit) {
      updateAccount(accountToEdit.id, {
        name: name.trim(),
        type,
        balance: numBalance,
        institution: institution.trim() || undefined,
        accountNumberLast4: accountNumberLast4.trim() || undefined,
        color,
      });
    } else {
      addAccount({
        name: name.trim(),
        type,
        balance: numBalance,
        currency: userProfile.currencyCode || 'USD',
        institution: institution.trim() || undefined,
        accountNumberLast4: accountNumberLast4.trim() || undefined,
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
            {accountToEdit ? 'Edit Account' : 'Add New Account'}
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
              Account Name
            </label>
            <input
              type="text"
              placeholder="e.g. Main Checking, High-Yield Savings..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-sm font-medium text-slate-900 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Account Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AccountType)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 outline-none bg-white cursor-pointer"
              >
                {ACCOUNT_TYPES.map((t) => (
                  <option key={t.type} value={t.type}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Current Balance
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                  {userProfile.currency}
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-sm font-bold text-slate-900 outline-none tabular-nums"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Financial Institution
              </label>
              <input
                type="text"
                placeholder="e.g. Chase, Vanguard, Fidelity"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Last 4 Digits (Optional)
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="e.g. 4821"
                value={accountNumberLast4}
                onChange={(e) => setAccountNumberLast4(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-medium text-slate-900 outline-none"
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
              <span>{accountToEdit ? 'Save Changes' : 'Create Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
