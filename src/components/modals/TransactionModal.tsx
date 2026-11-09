import React, { useState, useEffect } from 'react';
import { X, Check, DollarSign } from 'lucide-react';
import { 
  Transaction, 
  TransactionType, 
  IncomeCategory, 
  ExpenseCategory, 
  TransactionCategory 
} from '../../types/finance';
import { useFinance } from '../../context/FinanceContext';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

const INCOME_CATEGORIES: IncomeCategory[] = [
  'Salary',
  'Freelance',
  'Investments',
  'Rental',
  'Bonus',
  'Other Income',
];

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Housing & Rent',
  'Food & Dining',
  'Groceries',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Travel',
  'Personal',
  'Other Expense',
];

const PAYMENT_METHODS = [
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Direct Deposit',
  'Cash',
  'Apple Pay',
  'Wire Transfer',
  'Auto Debit',
];

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  transactionToEdit,
}) => {
  const { accounts, addTransaction, updateTransaction, userProfile } = useFinance();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [accountId, setAccountId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Populate fields when editing
  useEffect(() => {
    if (transactionToEdit) {
      setTitle(transactionToEdit.title);
      setAmount(transactionToEdit.amount.toString());
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
      setAccountId(transactionToEdit.accountId);
      setPaymentMethod(transactionToEdit.paymentMethod);
      setNotes(transactionToEdit.notes || '');
    } else {
      setTitle('');
      setAmount('');
      setType('expense');
      setCategory('Food & Dining');
      setDate(new Date().toISOString().slice(0, 10));
      setAccountId(accounts[0]?.id || '');
      setPaymentMethod('Credit Card');
      setNotes('');
    }
    setError(null);
  }, [transactionToEdit, isOpen, accounts]);

  // Adjust default category when type toggles
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === 'income') {
      setCategory('Salary');
      setPaymentMethod('Direct Deposit');
    } else {
      setCategory('Food & Dining');
      setPaymentMethod('Credit Card');
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please enter a transaction title or description.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    if (!accountId) {
      setError('Please select an account.');
      return;
    }

    if (transactionToEdit) {
      updateTransaction(transactionToEdit.id, {
        title: title.trim(),
        amount: numAmount,
        type,
        category,
        date,
        accountId,
        paymentMethod,
        notes: notes.trim(),
      });
    } else {
      addTransaction({
        title: title.trim(),
        amount: numAmount,
        type,
        category,
        date,
        accountId,
        paymentMethod,
        notes: notes.trim(),
        status: 'cleared',
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">
              {transactionToEdit ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Type Switcher */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  type === 'expense'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Expense (-)
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  type === 'income'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Income (+)
              </button>
            </div>
          </div>

          {/* Title / Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
              Title / Payee
            </label>
            <input
              type="text"
              placeholder="e.g. Whole Foods Market, Salary, Rent..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
              required
            />
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Amount ({userProfile.currency})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                  {userProfile.currency}
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-slate-900 outline-none tabular-nums transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-medium text-slate-900 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Category & Account Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-medium text-slate-900 outline-none bg-white cursor-pointer"
              >
                {type === 'income' ? (
                  INCOME_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                ) : (
                  EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Account
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-medium text-slate-900 outline-none bg-white cursor-pointer"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.type.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-medium text-slate-900 outline-none bg-white cursor-pointer"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
              Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Add any specific context or receipt details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{transactionToEdit ? 'Save Changes' : 'Create Transaction'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
