"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (isStandalone || dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowBanner(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-banner-dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-xl mx-auto pointer-events-auto bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00BFFF]/10 text-[#00BFFF] flex items-center justify-center font-black">{"{ }"}</div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-white">Instala la App</p>
            <p className="text-xs text-slate-500">Catálogo offline rápido</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDismiss} className="px-3 py-2 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Luego</button>
          <button onClick={handleInstall} className="px-4 py-2 rounded-lg bg-[#00BFFF] text-white text-xs font-bold shadow-md shadow-[#00BFFF]/20">Instalar</button>
        </div>
      </div>
    </div>
  );
}


