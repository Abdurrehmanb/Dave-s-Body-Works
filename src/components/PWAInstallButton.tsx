import React, { useState } from 'react';
import { Download, Smartphone, X, Check, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ variant?: 'nav' | 'banner' }> = ({ variant = 'nav' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // If already running inside standalone app mode or dismissed, hide
  if (isInstalled || hasDismissed) {
    return null;
  }

  // If running on desktop/Chromium/Android where browser supports installation
  if (isInstallable) {
    if (variant === 'nav') {
      return (
        <button
          onClick={install}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          title="Install Dave's Body Works App"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install App</span>
          <span className="sm:hidden">App</span>
        </button>
      );
    }

    return (
      <div className="bg-[#0b1a30] border border-slate-700 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>Install Dave's Body Works App</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Fast & Offline</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Access estimates, shop tracker, and contact directly from your home screen.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={install}
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Install
          </button>
          <button
            onClick={() => setHasDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-300 hover:border-red-500 bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-bold transition-all cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-red-600" />
          <span className="hidden sm:inline">Add to Home Screen</span>
          <span className="sm:hidden">App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img src="/logo-official.png" alt="Logo" className="w-8 h-8 object-contain" />
                  <h3 className="text-sm font-black text-slate-900">Install on iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Tap the <strong>Share</strong> button at the bottom of Safari (<span className="text-blue-600 font-bold">Square with upward arrow</span>).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Scroll down the menu and tap <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Tap <strong>Add</strong> in the top right. Dave's Body Works will appear on your home screen like a native app!</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-[#0b1a30] hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Default fallback button that explains website + app capability if clicked
  return (
    <button
      onClick={() => {
        alert("To install as an app on your device:\n\n• On Chrome/Edge: Click the install icon in the address bar.\n• On iPhone Safari: Tap Share -> 'Add to Home Screen'.\n• On Android: Tap the 3 dots -> 'Install App' or 'Add to Home screen'.");
      }}
      className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer"
      title="Install as Progressive Web App"
    >
      <Smartphone className="w-3.5 h-3.5 text-red-600" />
      <span>Web + App</span>
    </button>
  );
};
