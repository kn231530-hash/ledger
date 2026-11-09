import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  darkText?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ darkText = false }) => {
  const [currentTime, setCurrentTime] = useState('10:37');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = darkText ? 'text-gray-900' : 'text-white';

  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-2 text-xs font-semibold select-none ${textColor} z-30 transition-colors`}>
      <div className="flex items-center gap-1.5 font-bold tracking-tight">
        <span>{currentTime}</span>
        <span className="text-[10px] bg-red-600/90 text-white px-1.5 py-0.2 rounded font-black tracking-wider ml-1">5G</span>
      </div>

      {/* Dynamic island center notch placeholder */}
      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center space-x-1.5 px-2">
        <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80"></div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 h-1 bg-current rounded-xs"></div>
          <div className="w-0.5 h-1.5 bg-current rounded-xs"></div>
          <div className="w-0.5 h-2.2 bg-current rounded-xs"></div>
          <div className="w-0.5 h-3 bg-current rounded-xs"></div>
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">98%</span>
          <div className="relative flex items-center">
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};
