import React from 'react';
import { Menu, Plus, Calendar, Download } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

interface HeaderProps {
  onAddTransactionClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTransactionClick }) => {
  const { 
    activePage, 
    setIsMobileMenuOpen, 
    selectedMonth, 
    setSelectedMonth,
    exportToCsv 
  } = useFinance();

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return { section: 'Overview', title: 'Dashboard' };
      case 'transactions':
        return { section: 'Records', title: 'Transactions' };
      case 'income':
        return { section: 'Cash Flow', title: 'Income Management' };
      case 'expenses':
        return { section: 'Cash Flow', title: 'Expense Management' };
      case 'budgets':
        return { section: 'Planning', title: 'Budgets & Limits' };
      case 'accounts':
        return { section: 'Assets', title: 'Accounts & Wallets' };
      case 'reports':
        return { section: 'Analytics', title: 'Financial Reports' };
      case 'settings':
        return { section: 'Preferences', title: 'Settings' };
      case 'profile':
        return { section: 'Account', title: 'User Profile' };
      default:
        return { section: 'Finance', title: 'Ledger' };
    }
  };

  const { section, title } = getPageTitle();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>{section}</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-600 font-semibold">{title}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none sm:mt-0.5">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Month Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent outline-none cursor-pointer text-slate-800 font-semibold text-xs"
          >
            <option value="2026-11">Nov 2026 (Current)</option>
            <option value="2026-10">Oct 2026</option>
            <option value="2026-09">Sep 2026</option>
            <option value="2026-08">Aug 2026</option>
          </select>
        </div>

        {/* Quick CSV Export on large screens */}
        <button
          onClick={exportToCsv}
          title="Export transactions to CSV"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>

        {/* Add Transaction Button */}
        <button
          onClick={onAddTransactionClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-xs transition-all whitespace-nowrap"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
};
