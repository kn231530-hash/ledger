import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Clock, Store } from 'lucide-react';
import { RewardDeal } from '../types';

interface VoucherModalProps {
  deal: RewardDeal | null;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ deal, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(899); // 14 mins 59 secs

  useEffect(() => {
    if (!deal) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [deal]);

  if (!deal) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const copyCode = () => {
    navigator.clipboard.writeText(deal.voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative text-neutral-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Voucher Header Banner */}
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={deal.imageUrl}
            alt={deal.merchant}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black tracking-wider uppercase">
              {deal.discountBadge}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-neutral-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{timerDisplay}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold mb-1">
              <Store className="w-3.5 h-3.5 text-red-500" />
              <span>{deal.merchant}</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{deal.title}</h3>
            <p className="text-xs text-neutral-400 mt-1">{deal.description}</p>
          </div>

          {/* Barcode & Code Container */}
          <div className="bg-white p-4 rounded-2xl text-center shadow-inner">
            <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider mb-2">
              Present to cashier or scan at kiosk
            </div>

            {/* Generated Barcode lines */}
            <div className="h-14 flex items-center justify-center gap-[3px] px-2 mb-2">
              {[4, 2, 5, 2, 1, 6, 3, 2, 4, 1, 3, 5, 2, 6, 2, 4, 1, 3, 5, 2, 4, 2, 3, 5, 1, 4, 2, 5, 3, 2].map((height, i) => (
                <div
                  key={i}
                  className="bg-black"
                  style={{
                    width: (i % 3 === 0 ? '4px' : i % 2 === 0 ? '2px' : '3px'),
                    height: `${35 + height * 3}px`,
                  }}
                />
              ))}
            </div>

            <div className="font-mono text-xs font-bold text-neutral-800 tracking-widest">
              {deal.voucherCode}
            </div>
          </div>

          {/* Copy Voucher code */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
            <div>
              <div className="text-[10px] text-neutral-400">Promo Code</div>
              <div className="font-mono text-sm font-bold text-red-400">{deal.voucherCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-neutral-500 text-center leading-relaxed">
            Expires on {deal.expiryDate}. Valid for one-time redemption per Hotlink member. Terms & conditions apply.
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm font-bold text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
