"use client";

import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * PwaInstallPrompt – przycisk / baner do instalacji PWA na urządzeniu.
 * Pokazuje się tylko wtedy, gdy przeglądarka wspiera beforeinstallprompt
 * i użytkownik jeszcze nie zainstalował aplikacji.
 */
export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Sprawdź, czy aplikacja jest już zainstalowana (display-mode: standalone)
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Obsługa zdarzenia appinstalled – ukryj przycisk
    const installedHandler = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    // Ukryj prompt na 7 dni (localStorage)
    try {
      localStorage.setItem("pwa-install-dismissed", Date.now().toString());
    } catch {
      // localStorage niedostępny – ignoruj
    }
  }, []);

  // Sprawdź, czy użytkownik już odrzucił prompt w ciągu ostatnich 7 dni
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (dismissed) {
        const diff = Date.now() - parseInt(dismissed, 10);
        if (diff < 7 * 24 * 60 * 60 * 1000) {
          setIsDismissed(true);
        }
      }
    } catch {
      // ignoruj
    }
  }, []);

  if (!isInstallable || isInstalled || isDismissed) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl bg-primary p-4 text-white shadow-2xl ring-1 ring-white/20 sm:left-auto sm:right-4 sm:w-80"
    >
      <div className="flex items-start gap-3">
        {/* Ikona filiżanki */}
        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xl">
          ☕
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Zainstaluj aplikację</p>
          <p className="mt-0.5 text-xs text-white/80">
            Dodaj Kawa i Ciasteczko do ekranu głównego, aby mieć szybki dostęp.
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={handleDismiss}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          Nie teraz
        </button>
        <button
          onClick={handleInstall}
          className="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-cream active:scale-95"
        >
          Zainstaluj
        </button>
      </div>
    </div>
  );
}
