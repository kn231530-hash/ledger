import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Target, 
  Award, 
  CheckCircle2, 
  Lock,
  Smartphone
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile, totalBalance, formatCurrency } = useFinance();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">User Profile</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal details, financial objectives, and security credentials
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes successfully saved!</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center gap-6">
        <img
          src={userProfile.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80'}
          alt={userProfile.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 shadow-md shrink-0"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">{userProfile.name}</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{userProfile.email}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-600">
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Net Worth</span>
              <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(totalBalance)}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Monthly Target</span>
              <span className="font-bold text-emerald-600 tabular-nums">
                {formatCurrency(userProfile.monthlySavingsGoal)}/mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Financial Milestones & Goals */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">Active Financial Goals</h3>
        </div>

        <div className="space-y-4">
          {/* Goal 1: Emergency Fund */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">6-Month Emergency Reserve</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Marcus High-Yield Savings</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 tabular-nums">$24,500</span>
                <span className="text-slate-400 text-[11px]"> / $30,000 (81%)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '81%' }} />
            </div>
          </div>

          {/* Goal 2: Index Fund Brokerage */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Total Stock Index Fund Accumulation</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Vanguard VTI Portfolio</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 tabular-nums">$38,250</span>
                <span className="text-slate-400 text-[11px]"> / $50,000 (76%)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: '76%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Local Sandbox Security</div>
            <div className="text-[11px] text-slate-500">Your financial records are strictly client-side protected</div>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Enforced
        </span>
      </div>
    </div>
  );
};
