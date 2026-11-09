import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  QrCode, 
  Key, 
  Eye, 
  EyeOff, 
  History, 
  Smartphone, 
  RefreshCw, 
  CheckCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { UserAccount, Transaction } from '../../types';

interface ProfileScreenProps {
  account: UserAccount;
  transactions: Transaction[];
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ account, transactions }) => {
  const [showPuk, setShowPuk] = useState(false);
  const [autoReloadActive, setAutoReloadActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'reload' | 'pass'>('all');
  const [showEsimModal, setShowEsimModal] = useState(false);

  const filteredTransactions = activeTab === 'all'
    ? transactions
    : activeTab === 'reload'
    ? transactions.filter((t) => t.type === 'reload')
    : transactions.filter((t) => t.type === 'pass_purchase');

  return (
    <div className="space-y-4 pb-20 text-white">
      {/* Header */}
      <div className="px-5 pt-2">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-red-500" />
          My Hotlink Account
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          SIM status, eSIM credentials, security and history
        </p>
      </div>

      {/* User Card */}
      <div className="px-4">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-5 flex items-center gap-4">
          <img
            src={account.avatarUrl}
            alt={account.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-red-500 shadow-md"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{account.name}</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-sm font-mono text-red-400 font-bold mt-0.5">{account.phone}</p>
            <p className="text-xs text-neutral-400 mt-1">{account.planName}</p>
          </div>
        </div>
      </div>

      {/* Security & SIM Settings Card */}
      <div className="px-4 space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-1 block">
          SIM & Device Security
        </label>

        {/* PUK Code Reveal */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">SIM PUK Code</div>
              <div className="text-[11px] text-neutral-400">Use to unblock SIM if PIN locked</div>
              <div className="font-mono text-sm font-extrabold text-amber-300 mt-0.5">
                {showPuk ? '8841 9204' : '•••• ••••'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowPuk(!showPuk)}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            {showPuk ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* eSIM Management */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-blue-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">eSIM Digital Profile</div>
              <div className="text-[11px] text-neutral-400">Installed on iPhone 16 Pro Max</div>
            </div>
          </div>
          <button
            onClick={() => setShowEsimModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Code</span>
          </button>
        </div>

        {/* Auto-Reload Switch */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Auto-Reload Protection</div>
              <div className="text-[11px] text-neutral-400">Automatically reload RM30 when below RM5</div>
            </div>
          </div>
          <button
            onClick={() => setAutoReloadActive(!autoReloadActive)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              autoReloadActive ? 'bg-red-600' : 'bg-neutral-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                autoReloadActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="px-4 space-y-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            Transaction History
          </label>
          <div className="flex gap-1">
            {(['all', 'reload', 'pass'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                  activeTab === tab
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white">{tx.title}</div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{tx.timestamp} • {tx.receiptNo}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-400' : 'text-neutral-300'}`}>
                  {tx.amount > 0 ? `+RM ${tx.amount.toFixed(2)}` : tx.type === 'reward_redemption' ? `${tx.amount} pts` : `RM ${Math.abs(tx.amount).toFixed(2)}`}
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end gap-1 mt-0.5">
                  <CheckCircle className="w-2.5 h-2.5" /> Success
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* eSIM Modal */}
      {showEsimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-center text-white">
            <h4 className="text-base font-bold text-white">eSIM Activation Profile</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Scan with your secondary phone camera or cellular settings
            </p>

            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto my-4 flex items-center justify-center shadow-lg">
              <QrCode className="w-40 h-40 text-black" />
            </div>

            <div className="text-xs font-mono text-neutral-400 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 break-all mb-4">
              LPA:1$hotlink.maxis.com.my$0128829134-ESIM-PROD
            </div>

            <button
              onClick={() => setShowEsimModal(false)}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-bold text-xs text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
