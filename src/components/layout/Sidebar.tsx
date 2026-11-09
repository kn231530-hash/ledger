import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Wallet, 
  BarChart3, 
  Settings, 
  User, 
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { NavigationPage } from '../../types/finance';
import { useFinance } from '../../context/FinanceContext';

interface SidebarProps {
  onAddTransactionClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddTransactionClick }) => {
  const { 
    activePage, 
    setActivePage, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    userProfile,
    totalBalance,
    formatCurrency 
  } = useFinance();

  const navItems: { id: NavigationPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleNav = (page: NavigationPage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900">LEDGER</span>
                <span className="text-[10px] block font-medium text-slate-400 uppercase tracking-wider -mt-0.5">Finance Platform</span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Balance Peek */}
          <div className="p-4 mx-4 my-3 rounded-xl bg-slate-50 border border-slate-100/80">
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Net Balance</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums mt-0.5">
              {formatCurrency(totalBalance)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Real-time connected</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div 
            onClick={() => handleNav('profile')}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <img
              src={userProfile.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80'}
              alt={userProfile.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{userProfile.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{userProfile.email}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
