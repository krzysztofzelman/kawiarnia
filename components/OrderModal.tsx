"use client";

import { useState } from "react";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const [email, setEmail] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="max-w-md w-full rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Zamów online"
      >
        <h3 className="text-lg font-bold text-warm-brown">
          🛵 Zamów online
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-amber-900/70">
          Dziękujemy za zainteresowanie! Funkcja zamówienia online jest
          obecnie w przygotowaniu. Zostaw swój adres email, a powiadomimy
          Cię, gdy wystartujemy.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Twój adres email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-amber-200 bg-cream px-4 py-2.5 text-sm text-warm-brown placeholder-amber-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={() => {
              if (email.trim()) {
                alert("📧 Dziękujemy! Powiadomimy Cię, gdy ruszymy.");
                setEmail("");
                onClose();
              }
            }}
            className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light"
          >
            Powiadom mnie
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-amber-900/50 transition-colors hover:text-warm-brown"
        >
          Nie teraz, dziękuję
        </button>
      </div>
    </div>
  );
}
