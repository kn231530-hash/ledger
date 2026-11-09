import React from 'react';
import { ViewMode, ScreenType } from '../types';
import { Smartphone, Monitor, LayoutGrid, RotateCcw } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { BottomNav } from './BottomNav';

interface DeviceFrameProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  children: React.ReactNode;
  onResetData: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  viewMode,
  onViewModeChange,
  activeScreen,
  onNavigate,
  children,
  onResetData,
}) => {
  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col">
      {/* Top Studio Control Bar */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-red-600/40">
              H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black text-white tracking-tight">Hotlink Self-Service App</h1>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-red-600/30 text-red-400 border border-red-500/40">
                  5G LIVE
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Interactive Multi-Screen Experience & HTML Screen Hotlinker
              </p>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-900 border border-neutral-800 p-1 rounded-2xl shadow-inner">
              <button
                onClick={() => onViewModeChange('phone')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'phone'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Phone Frame</span>
              </button>

              <button
                onClick={() => onViewModeChange('fluid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'fluid'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Responsive</span>
              </button>

              <button
                onClick={() => onViewModeChange('gallery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'gallery'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Screens</span>
              </button>
            </div>

            <button
              onClick={onResetData}
              title="Reset test data"
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8">
        {viewMode === 'phone' ? (
          /* Phone Frame Container */
          <div className="relative my-auto">
            {/* Phone Bezel Frame */}
            <div className="w-[390px] h-[844px] max-h-[92vh] max-w-[95vw] bg-neutral-950 rounded-[50px] p-3 shadow-2xl shadow-red-950/20 border-4 border-neutral-800 relative flex flex-col overflow-hidden ring-1 ring-neutral-700/50">
              {/* Outer button visual details */}
              <div className="absolute -left-[7px] top-28 w-[3px] h-10 bg-neutral-700 rounded-l" />
              <div className="absolute -left-[7px] top-42 w-[3px] h-12 bg-neutral-700 rounded-l" />
              <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-neutral-700 rounded-r" />

              {/* Status Bar */}
              <StatusBar />

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar relative">
                {children}
              </div>

              {/* Mobile Bottom Navigation */}
              <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />

              {/* Home swipe indicator line */}
              <div className="py-1 bg-neutral-950 flex justify-center">
                <div className="w-32 h-1 bg-neutral-600/80 rounded-full" />
              </div>
            </div>
          </div>
        ) : viewMode === 'fluid' ? (
          /* Fluid Web View Container */
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[800px] max-h-[90vh]">
            <StatusBar />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {children}
            </div>
            <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
            <div className="py-1 bg-neutral-950 flex justify-center">
              <div className="w-28 h-1 bg-neutral-600/80 rounded-full" />
            </div>
          </div>
        ) : (
          /* Gallery Mode */
          <div className="w-full">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
