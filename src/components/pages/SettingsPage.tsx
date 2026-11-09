import React, { useState } from 'react';
import { 
  Settings, 
  DollarSign, 
  Calendar, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const CURRENCIES = [
  { symbol: '$', code: 'USD', name: 'US Dollar ($)' },
  { symbol: '€', code: 'EUR', name: 'Euro (€)' },
  { symbol: '£', code: 'GBP', name: 'British Pound (£)' },
  { symbol: '¥', code: 'JPY', name: 'Japanese Yen (¥)' },
  { symbol: 'CA$', code: 'CAD', name: 'Canadian Dollar (CA$)' },
  { symbol: 'A$', code: 'AUD', name: 'Australian Dollar (A$)' },
  { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar (S$)' },
  { symbol: 'RM', code: 'MYR', name: 'Malaysian Ringgit (RM)' },
];

export const SettingsPage: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    resetToDemoData, 
    transactions, 
    accounts, 
    budgets,
    importJsonData 
  } = useFinance();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleCurrencyChange = (code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) {
      updateUserProfile({
        currency: found.symbol,
        currencyCode: found.code,
      });
      triggerSaved();
    }
  };

  const triggerSaved = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportBackup = () => {
    const backup = {
      userProfile,
      transactions,
      accounts,
      budgets,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ledger_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJsonData(content);
      if (success) {
        triggerSaved();
      } else {
        setImportError('Invalid backup file format. Please upload a valid Ledger JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Platform Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure currency standards, formatting preferences, and manage database snapshots
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully updated and saved locally!</span>
        </div>
      )}

      {/* Currency & Regional Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Regional & Currency Standards</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">
              Default Display Currency
            </label>
            <select
              value={userProfile.currencyCode}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none bg-white cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">
              Date Representation Format
            </label>
            <select
              value={userProfile.dateFormat}
              onChange={(e) => {
                updateUserProfile({ dateFormat: e.target.value });
                triggerSaved();
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none bg-white cursor-pointer"
            >
              <option value="YYYY-MM-DD">ISO 8601 (YYYY-MM-DD)</option>
              <option value="MM/DD/YYYY">US Standard (MM/DD/YYYY)</option>
              <option value="DD/MM/YYYY">International (DD/MM/YYYY)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Financial Goals & Targets */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Monthly Savings Target</h3>
        <p className="text-xs text-slate-500 -mt-2">
          Set your monthly target savings quota to benchmark your monthly savings rate
        </p>

        <div className="flex items-center gap-3">
          <div className="relative w-48">
            <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
              {userProfile.currency}
            </span>
            <input
              type="number"
              step="100"
              value={userProfile.monthlySavingsGoal}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                updateUserProfile({ monthlySavingsGoal: val });
              }}
              className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 tabular-nums outline-none"
            />
          </div>
          <span className="text-xs text-slate-500">per calendar month</span>
        </div>
      </div>

      {/* Data Management & Backups */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Data Portability & Backups</h3>
        <p className="text-xs text-slate-500 -mt-2">
          Your financial data is persistently saved in your local browser sandbox. You can export a JSON snapshot anytime.
        </p>

        {importError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {importError}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON Snapshot</span>
          </button>

          <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Restore From JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Reset Section */}
      <div className="bg-rose-50/50 rounded-2xl border border-rose-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-rose-900">Restore Default Demo Data</h4>
            <p className="text-xs text-rose-700/80 mt-0.5 leading-relaxed">
              Reset all transactions, accounts, and budgets back to the initial sample records for Sarah Jenkins.
            </p>
          </div>
        </div>

        <div>
          {resetConfirmOpen ? (
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  resetToDemoData();
                  setResetConfirmOpen(false);
                  triggerSaved();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirmOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-rose-300 hover:bg-rose-100/60 text-xs font-bold text-rose-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Demo State</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
