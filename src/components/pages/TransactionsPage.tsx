import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  ArrowDownLeft, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction, TransactionType } from '../../types/finance';

interface TransactionsPageProps {
  onAddTransactionClick: () => void;
  onEditTransaction: (tx: Transaction) => void;
  onDeleteTransaction: (tx: Transaction) => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  onAddTransactionClick,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const { transactions, accounts, formatCurrency, exportToCsv } = useFinance();

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extract all unique categories present in transactions
  const uniqueCategories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category));
    return Array.from(set).sort();
  }, [transactions]);

  // Filter & Sort Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.notes && t.notes.toLowerCase().includes(q)) ||
        t.paymentMethod.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Type
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;

      // Category
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

      // Account
      if (accountFilter !== 'all' && t.accountId !== accountFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortField === 'date') {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      } else {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
    });
  }, [transactions, searchQuery, typeFilter, categoryFilter, accountFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setAccountFilter('all');
    setSortField('date');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  const isFiltered = searchQuery !== '' || typeFilter !== 'all' || categoryFilter !== 'all' || accountFilter !== 'all';

  return (
    <div className="space-y-5">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Transactions</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filteredTransactions.length} of {transactions.length} total entries
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportToCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onAddTransactionClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, category, notes, or payment..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as 'all' | TransactionType);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 outline-none bg-white cursor-pointer"
            >
              <option value="all">All Types (Income & Expenses)</option>
              <option value="income">Income Only (+)</option>
              <option value="expense">Expenses Only (-)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 outline-none bg-white cursor-pointer"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by Account:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setAccountFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors ${
                  accountFilter === 'all'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Accounts
              </button>
              {accounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setAccountFilter(acc.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap ${
                    accountFilter === acc.id
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {acc.name}
                </button>
              ))}
            </div>
          </div>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-600 font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider select-none">
              <tr>
                <th 
                  onClick={() => toggleSort('date')}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Description / Payee</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Account</th>
                <th className="py-3.5 px-4">Method</th>
                <th 
                  onClick={() => toggleSort('amount')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No transactions match your current search and filters.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((tx) => {
                  const account = accounts.find((a) => a.id === tx.accountId);
                  const isIncome = tx.type === 'income';

                  return (
                    <tr 
                      key={tx.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{tx.title}</div>
                        {tx.notes && (
                          <div className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                            {tx.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {account ? account.name : 'Unknown Account'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 capitalize">
                        {tx.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold">
                        <span className={isIncome ? 'text-emerald-600 font-extrabold' : 'text-slate-900 font-bold'}>
                          {formatCurrency(tx.amount, true)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEditTransaction(tx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Edit transaction"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTransaction(tx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete transaction"
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

        {/* Pagination bar */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Page <span className="font-bold text-slate-800">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-800">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
