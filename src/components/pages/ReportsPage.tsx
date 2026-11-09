import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  CheckCircle,
  FileSpreadsheet,
  Check,
  FileText
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const ReportsPage: React.FC = () => {
  const { 
    transactions, 
    accounts,
    monthlyTrends, 
    categorySpendingMap, 
    formatCurrency, 
    exportToCsv,
    exportCashFlowCsv,
    userProfile 
  } = useFinance();

  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  // Computed metrics
  const totalIncomeAllTime = useMemo(() => {
    return transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const totalExpenseAllTime = useMemo(() => {
    return transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const netSavingsAllTime = totalIncomeAllTime - totalExpenseAllTime;
  const overallSavingsRate = totalIncomeAllTime > 0 ? Math.round((netSavingsAllTime / totalIncomeAllTime) * 100) : 0;

  const handleExportTransactions = () => {
    exportToCsv();
    setDownloadStatus(`Exported ${transactions.length} transactions to CSV`);
    setTimeout(() => setDownloadStatus(null), 3500);
  };

  const handleExportCashFlow = () => {
    exportCashFlowCsv();
    setDownloadStatus('Exported monthly cash flow statement to CSV');
    setTimeout(() => setDownloadStatus(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {downloadStatus && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 animate-fadeIn border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{downloadStatus}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive financial statements, savings velocity, and tax-ready CSV export
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly View
            </button>
            <button
              onClick={() => setTimeframe('yearly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'yearly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trailing 6-Mo
            </button>
          </div>

          {/* Primary Header CSV Export Button */}
          <button
            onClick={handleExportTransactions}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-xs transition-all whitespace-nowrap"
            title="Export all financial data and transaction history to CSV"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Cumulative Income
          </div>
          <div className="text-2xl font-bold text-emerald-600 tabular-nums mt-1.5">
            {formatCurrency(totalIncomeAllTime)}
          </div>
          <div className="text-xs text-slate-400 mt-2">Historical inflows logged</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Cumulative Expenses
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {formatCurrency(totalExpenseAllTime)}
          </div>
          <div className="text-xs text-slate-400 mt-2">Historical outflows logged</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Net Surplus / Savings
          </div>
          <div className="text-2xl font-bold text-emerald-600 tabular-nums mt-1.5">
            {formatCurrency(netSavingsAllTime)}
          </div>
          <div className="text-xs text-slate-400 mt-2">Retained liquid capital</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Lifetime Savings Rate
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1.5">
            {overallSavingsRate}%
          </div>
          <div className="text-xs text-slate-400 mt-2">Target benchmark: &gt;20%</div>
        </div>
      </div>

      {/* Dedicated CSV Data Export Card */}
      <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Financial Data & Transaction Export
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Export Complete Transaction History & Cash Flow to CSV
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Export all {transactions.length} ledger transactions including Date, Payee / Description, Type (Income / Expense), Category, Amount, Source Account, Payment Method, and Notes. Fully compatible with Microsoft Excel, Google Sheets, QuickBooks, and tax accounting tools.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600 font-medium">
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
                <strong>{transactions.length}</strong> Total Transactions
              </span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
                <strong>{accounts.length}</strong> Connected Accounts
              </span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
                Active Currency: <strong>{userProfile.currencyCode} ({userProfile.currency})</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Primary CSV export button */}
            <button
              onClick={handleExportTransactions}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Export Transactions (.CSV)</span>
            </button>

            {/* Statement CSV export button */}
            <button
              onClick={handleExportCashFlow}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-600" />
              <span>Export Monthly Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Cash Flow Statement Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Monthly Cash Flow Statement</h3>
            <p className="text-xs text-slate-500">Historical performance summary month-by-month</p>
          </div>

          <button
            onClick={handleExportCashFlow}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement (.CSV)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4 text-right">Total Inflow (Income)</th>
                <th className="py-3 px-4 text-right">Total Outflow (Expenses)</th>
                <th className="py-3 px-4 text-right">Net Savings</th>
                <th className="py-3 px-4 text-right">Savings Rate</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlyTrends.map((m) => {
                const rate = m.income > 0 ? Math.round((m.savings / m.income) * 100) : 0;
                return (
                  <tr key={m.monthKey} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {m.month} {m.year}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-bold text-emerald-600">
                      +{formatCurrency(m.income)}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-bold text-slate-900">
                      -{formatCurrency(m.expense)}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-extrabold text-slate-900">
                      {formatCurrency(m.savings, true)}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-mono font-bold text-slate-700">
                      {rate}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        <CheckCircle className="w-3 h-3" /> Surplus
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
