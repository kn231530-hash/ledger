import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { KpiCard } from '../dashboard/KpiCard';
import { IncomeExpenseChart } from '../dashboard/IncomeExpenseChart';
import { CategorySpendingDonut } from '../dashboard/CategorySpendingDonut';
import { RecentTransactionsWidget } from '../dashboard/RecentTransactionsWidget';
import { AccountsOverviewWidget } from '../dashboard/AccountsOverviewWidget';
import { Transaction } from '../../types/finance';

interface DashboardPageProps {
  onAddTransactionClick: () => void;
  onEditTransaction: (tx: Transaction) => void;
  onAddAccountClick: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onAddTransactionClick,
  onEditTransaction,
  onAddAccountClick,
}) => {
  const { 
    totalBalance, 
    currentMonthIncome, 
    currentMonthExpenses, 
    currentMonthSavings, 
    currentMonthSavingsRate,
    budgetUsageList,
    formatCurrency,
    setActivePage
  } = useFinance();

  // Find any exceeded or warning budgets
  const exceededBudgets = budgetUsageList.filter((b) => b.status === 'exceeded');
  const warningBudgets = budgetUsageList.filter((b) => b.status === 'warning');

  return (
    <div className="space-y-6">
      {/* Exceeded Budget Alert banner if any */}
      {exceededBudgets.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 text-xs text-rose-800">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Budget Alert:</span> You have exceeded your monthly spending limit for{' '}
              <strong className="underline">{exceededBudgets.map((b) => b.budget.category).join(', ')}</strong>.
            </div>
          </div>
          <button
            onClick={() => setActivePage('budgets')}
            className="font-bold text-rose-700 hover:text-rose-900 underline whitespace-nowrap"
          >
            Review Budgets →
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Balance"
          amount={formatCurrency(totalBalance)}
          trendText="+8.4% this month"
          trendDirection="up"
          icon={Wallet}
          accentColor="emerald"
          subtitle="Net Worth"
        />
        <KpiCard
          title="Total Income"
          amount={formatCurrency(currentMonthIncome)}
          trendText="+12.5% vs last month"
          trendDirection="up"
          icon={TrendingUp}
          accentColor="emerald"
          subtitle="Inflows"
        />
        <KpiCard
          title="Total Expenses"
          amount={formatCurrency(currentMonthExpenses)}
          trendText="-3.2% vs last month"
          trendDirection="down"
          icon={TrendingDown}
          accentColor="rose"
          subtitle="Outflows"
        />
        <KpiCard
          title="Monthly Savings"
          amount={formatCurrency(currentMonthSavings)}
          trendText={`${currentMonthSavingsRate}% savings rate`}
          trendDirection={currentMonthSavings >= 0 ? 'up' : 'down'}
          icon={PiggyBank}
          accentColor="blue"
          subtitle="Net Cash Flow"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeExpenseChart />
        </div>
        <div>
          <CategorySpendingDonut />
        </div>
      </div>

      {/* Accounts & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactionsWidget onEditTransaction={onEditTransaction} />
        </div>
        <div>
          <AccountsOverviewWidget onAddAccountClick={onAddAccountClick} />
        </div>
      </div>
    </div>
  );
};
