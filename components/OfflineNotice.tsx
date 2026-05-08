"use client";

import { useEffect, useState } from "react";

/**
 * OfflineNotice – wyświetla pasek informujący o braku połączenia z internetem.
 * Znika automatycznie po przywróceniu połączenia.
 */
export default function OfflineNotice() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Stan początkowy
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="alert"
      className="fixed top-0 left-0 right-0 z-[60] bg-amber-600 px-4 py-2 text-center text-sm font-medium text-white shadow-lg"
    >
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden="true">📡</span>
        <span>
          Brak połączenia z internetem – wyświetlasz zapisaną wersję strony.
        </span>
      </div>
    </div>
  );
}
