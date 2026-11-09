import React, { useState } from 'react';
import { X, CheckCircle, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { PassItem, UserAccount } from '../types';

interface PurchaseModalProps {
  pass: PassItem | null;
  account: UserAccount;
  onClose: () => void;
  onConfirm: (pass: PassItem, paymentMethod: string) => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  pass,
  account,
  onClose,
  onConfirm,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'balance' | 'tng' | 'card'>('balance');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!pass) return null;

  const hasEnoughBalance = account.balance >= pass.price;

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm(pass, selectedMethod);
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300">
        {/* Header */}
        <div className="relative p-5 pb-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
            <h3 className="font-bold text-white text-base">Confirm Pass Subscription</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-1">Pass Activated!</h4>
            <p className="text-sm text-neutral-400 mb-4">
              Your {pass.name} is now active. Enjoy high-speed 5G!
            </p>
            <div className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300">
              Transaction ID: <span className="font-mono text-white">HTL-{Date.now().toString().slice(-6)}</span>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Pass Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-600/30">
                      {pass.period}
                    </span>
                    {pass.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {pass.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white mt-1.5">{pass.name}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{pass.quotaLabel}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-black text-white">RM {pass.price}</div>
                  <div className="text-[10px] text-neutral-500">{pass.period}</div>
                </div>
              </div>

              {pass.hotspotLabel && (
                <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300">
                  <span className="text-neutral-400">Hotspot sharing:</span>
                  <span className="font-semibold text-white">{pass.hotspotLabel}</span>
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Select Payment Method
              </label>
              <div className="space-y-2">
                {/* Method 1: Account Balance */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('balance')}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    selectedMethod === 'balance'
                      ? 'border-red-600 bg-red-950/20 shadow-xs'
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center font-bold text-red-500 text-sm">
                      RM
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        Account Credit Balance
                        <span className="text-xs font-normal text-neutral-400">
                          (RM {account.balance.toFixed(2)})
                        </span>
                      </div>
                      {!hasEnoughBalance && (
                        <span className="text-[11px] text-red-400 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" /> Insufficient balance (Needs RM {(pass.price - account.balance).toFixed(2)} more)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === 'balance' ? 'border-red-500 bg-red-500' : 'border-neutral-600'
                  }`}>
                    {selectedMethod === 'balance' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Method 2: Touch n Go eWallet */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('tng')}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    selectedMethod === 'tng'
                      ? 'border-blue-500 bg-blue-950/20'
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                      TnG
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Touch 'n Go eWallet</div>
                      <div className="text-[11px] text-neutral-400">Instant direct authorization</div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === 'tng' ? 'border-blue-500 bg-blue-500' : 'border-neutral-600'
                  }`}>
                    {selectedMethod === 'tng' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Method 3: Credit/Debit Card */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    selectedMethod === 'card'
                      ? 'border-purple-500 bg-purple-950/20'
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center font-black text-white text-xs">
                      CARD
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Online Banking / Visa / Master</div>
                      <div className="text-[11px] text-neutral-400">Maybank, CIMB, Public Bank, etc.</div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === 'card' ? 'border-purple-500 bg-purple-500' : 'border-neutral-600'
                  }`}>
                    {selectedMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-neutral-950/40 rounded-xl p-3 border border-neutral-800/60 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>RM {pass.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>SST (6% Digital Service Tax)</span>
                <span className="text-emerald-400">Waived / Inclusive</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-1 border-t border-neutral-800">
                <span>Total Amount</span>
                <span className="text-red-500 text-sm">RM {pass.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Secured by Maxis & Hotlink Protected Gateway</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-neutral-700 text-neutral-300 font-semibold text-sm hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={selectedMethod === 'balance' && !hasEnoughBalance || isProcessing}
                onClick={handlePurchase}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                  selectedMethod === 'balance' && !hasEnoughBalance
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
                }`}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Pay RM {pass.price}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
