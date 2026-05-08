"use client";

import { useEffect } from "react";

/**
 * ServiceWorkerRegister – rejestruje Service Worker po stronie klienta.
 * Umieszczony w layout.tsx, działa tylko w przeglądarkach wspierających SW.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      // Nie rejestruj w trybie development – SW zakłóca HMR
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.info(
            "[PWA] Service Worker zarejestrowany:",
            registration.scope
          );
        },
        (err) => {
          console.warn("[PWA] Rejestracja SW nie powiodła się:", err);
        }
      );
    }
  }, []);

  return null;
}
