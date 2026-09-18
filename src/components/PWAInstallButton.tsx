import React, { useState } from 'react';
import { Download, Smartphone, X, Check, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ variant?: 'nav' | 'banner' | 'menu' }> = ({ variant = 'nav' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // If already running inside standalone app mode or dismissed, hide
  if (isInstalled || hasDismissed) {
    return null;
  }

  const guideModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img src="/logo-official.png" alt="Logo" className="w-8 h-8 object-contain" />
            <div>
              <h3 className="text-sm font-black text-slate-900">Install Dave's Body Works</h3>
              <p className="text-[10px] text-slate-500 font-semibold">Web + App (PWA)</p>
            </div>
          </div>
          <button
            onClick={() => setShowGuideModal(false)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-900 block">📱 iPhone &amp; iPad (Safari):</span>
            <p>1. Tap the <strong>Share</strong> icon (square with arrow) at the bottom.</p>
            <p>2. Scroll down &amp; tap <strong>Add to Home Screen</strong>.</p>
            <p>3. Tap <strong>Add</strong> in top right.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-900 block">🤖 Android (Chrome):</span>
            <p>Tap the 3 dots (top right) &rarr; <strong>Install App</strong> or <strong>Add to Home screen</strong>.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-900 block">💻 Desktop (Chrome, Edge):</span>
            <p>Click the <strong>Install</strong> icon in your browser's address bar.</p>
          </div>
        </div>

        <button
          onClick={() => setShowGuideModal(false)}
          className="w-full py-2.5 rounded-xl bg-[#0b1a30] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Got It
        </button>
      </div>
    </div>
  );

  if (variant === 'menu') {
    return (
      <>
        <button
          onClick={isInstallable ? install : () => setShowGuideModal(true)}
          className="w-full py-2.5 px-3 text-left font-bold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-red-600" />
            <span>Install App on Home Screen</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold">Fast &amp; Offline</span>
        </button>
        {showGuideModal && guideModal}
      </>
    );
  }

  // If running on desktop/Chromium/Android where browser supports installation
  if (isInstallable) {
    if (variant === 'nav') {
      return (
        <button
          onClick={install}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          title="Install Dave's Body Works App"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
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
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Fast &amp; Offline</span>
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
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
          onClick={() => setShowGuideModal(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 hover:border-red-500 bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
        >
          <Smartphone className="w-3.5 h-3.5 text-red-600" />
          <span>Add App to Home</span>
        </button>
        {showGuideModal && guideModal}
      </>
    );
  }

  // Default fallback button
  return (
    <>
      <button
        onClick={() => setShowGuideModal(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
        title="Install as Progressive Web App"
      >
        <Smartphone className="w-3.5 h-3.5 text-red-600" />
        <span>Install App</span>
      </button>
      {showGuideModal && guideModal}
    </>
  );
};
