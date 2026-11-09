import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { UserAccount } from '../../types';

interface TopUpScreenProps {
  account: UserAccount;
  onTopUpSuccess: (amount: number, bonusQuotaGb: number) => void;
}

export const TopUpScreen: React.FC<TopUpScreenProps> = ({ account, onTopUpSuccess }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(30);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'tng' | 'maybank' | 'card' | 'grab'>('tng');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<{ amount: number; txId: string; bonusGb: number } | null>(null);

  const presetAmounts = [
    { value: 10, bonus: 0, tag: '' },
    { value: 20, bonus: 1, tag: '+1GB Bonus' },
    { value: 30, bonus: 5, tag: 'MOST POPULAR • +5GB' },
    { value: 50, bonus: 10, tag: '+10GB 5G BONUS' },
    { value: 100, bonus: 25, tag: 'BEST VALUE • +25GB' },
  ];

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const currentBonus = currentAmount >= 100 ? 25 : currentAmount >= 50 ? 10 : currentAmount >= 30 ? 5 : currentAmount >= 20 ? 1 : 0;

  const handleReload = () => {
    if (currentAmount < 5) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txId = 'HLK-' + Math.floor(100000 + Math.random() * 900000);
      setReceiptData({
        amount: currentAmount,
        txId,
        bonusGb: currentBonus,
      });
      onTopUpSuccess(currentAmount, currentBonus);
    }, 1200);
  };

  const handleReset = () => {
    setReceiptData(null);
  };

  if (receiptData) {
    return (
      <div className="p-5 pb-24 text-white text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
            Reload Successful
          </span>
          <h2 className="text-3xl font-black text-white mt-1">RM {receiptData.amount.toFixed(2)}</h2>
          <p className="text-xs text-neutral-400 mt-1">Credited to {account.phone}</p>
        </div>

        {receiptData.bonusGb > 0 && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/60 to-amber-950/60 border border-red-500/40 text-xs flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Claimed <strong>+{receiptData.bonusGb}GB High-Speed 5G Bonus</strong> Quota!
            </span>
          </div>
        )}

        {/* Receipt Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-left text-xs space-y-2">
          <div className="flex justify-between text-neutral-400">
            <span>Reference ID</span>
            <span className="font-mono text-white font-semibold">{receiptData.txId}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Date & Time</span>
            <span className="text-white font-semibold">Just now</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Payment Channel</span>
            <span className="text-white font-semibold uppercase">{paymentMethod}</span>
          </div>
          <div className="flex justify-between text-neutral-400 pt-2 border-t border-neutral-800">
            <span>New Balance</span>
            <span className="text-emerald-400 font-bold text-sm">RM {account.balance.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-sm text-white transition-colors shadow-lg shadow-red-600/30"
        >
          Make Another Reload
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 text-white">
      {/* Header */}
      <div className="px-5 pt-2">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-red-500 fill-red-500" />
          Instant Top Up & Reload
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Reload your mobile credit & unlock free 5G bonus quota
        </p>
      </div>

      {/* Current Balance Bar */}
      <div className="px-4">
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-neutral-400 uppercase font-semibold">Current Balance</div>
            <div className="text-lg font-black text-white">RM {account.balance.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-neutral-400">Validity:</div>
            <div className="text-xs font-bold text-red-400">{account.validityDate}</div>
          </div>
        </div>
      </div>

      {/* Preset Amount Grid */}
      <div className="px-4 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-1 block">
          Select Reload Amount
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {presetAmounts.map((preset) => {
            const isSelected = !customAmount && selectedAmount === preset.value;
            return (
              <button
                key={preset.value}
                onClick={() => {
                  setSelectedAmount(preset.value);
                  setCustomAmount('');
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-red-600 bg-red-950/25 shadow-md shadow-red-950/50'
                    : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                }`}
              >
                {preset.tag && (
                  <span className="absolute -top-2 right-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                    {preset.tag}
                  </span>
                )}
                <div className="text-xs text-neutral-400 font-semibold">Reload</div>
                <div className="text-xl font-black text-white mt-0.5">RM {preset.value}</div>
                {preset.bonus > 0 ? (
                  <div className="text-[11px] text-amber-400 font-semibold mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> +{preset.bonus}GB Free 5G
                  </div>
                ) : (
                  <div className="text-[11px] text-neutral-500 mt-1">Standard credit</div>
                )}
              </button>
            );
          })}

          {/* Custom Amount Field */}
          <div className="col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900 p-3 flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400">Custom RM:</span>
            <input
              type="number"
              placeholder="e.g. 75 (min RM 5)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="bg-transparent text-sm font-bold text-white outline-none flex-1 placeholder:text-neutral-600"
            />
          </div>
        </div>
      </div>

      {/* Payment Channel Selector */}
      <div className="px-4 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-1 block">
          Payment Method
        </label>
        <div className="space-y-2">
          {/* Touch n Go */}
          <button
            type="button"
            onClick={() => setPaymentMethod('tng')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
              paymentMethod === 'tng'
                ? 'border-blue-500 bg-blue-950/20'
                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                TnG
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Touch 'n Go eWallet</div>
                <div className="text-[10px] text-neutral-400">1-Tap Direct Checkout</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'tng' ? 'border-blue-500 bg-blue-500' : 'border-neutral-600'
            }`}>
              {paymentMethod === 'tng' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </button>

          {/* Maybank2u */}
          <button
            type="button"
            onClick={() => setPaymentMethod('maybank')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
              paymentMethod === 'maybank'
                ? 'border-amber-500 bg-amber-950/20'
                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-black font-black text-xs flex items-center justify-center">
                M2U
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Maybank2u / FPX Online Banking</div>
                <div className="text-[10px] text-neutral-400">CIMB, Public Bank, RHB, Hong Leong</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'maybank' ? 'border-amber-500 bg-amber-500' : 'border-neutral-600'
            }`}>
              {paymentMethod === 'maybank' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </button>

          {/* Credit/Debit Card */}
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
              paymentMethod === 'card'
                ? 'border-purple-500 bg-purple-950/20'
                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                CARD
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Credit / Debit Card</div>
                <div className="text-[10px] text-neutral-400">Visa, Mastercard, Apple Pay</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'card' ? 'border-purple-500 bg-purple-500' : 'border-neutral-600'
            }`}>
              {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </button>
        </div>
      </div>

      {/* Reload Action Button */}
      <div className="px-4 pt-1">
        <button
          onClick={handleReload}
          disabled={isProcessing || currentAmount < 5}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-xl ${
            currentAmount < 5 || isProcessing
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-500 shadow-red-600/30 active:scale-98'
          }`}
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Reload RM {currentAmount.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 mt-3">
          <Shield className="w-3.5 h-3.5 text-neutral-400" />
          <span>SSL 256-bit Encrypted Transaction Guarantee</span>
        </div>
      </div>
    </div>
  );
};
