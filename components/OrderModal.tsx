"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/supabase/actions";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, null);

  if (!open) return null;

  const handleAction = async (formData: FormData) => {
    formAction(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="max-w-md w-full rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Zamów online"
      >
        {state?.success ? (
          <>
            <h3 className="text-lg font-bold text-emerald-700">✓ Gotowe!</h3>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/70">
              Dziękujemy! Powiadomimy Cię mailowo, gdy zamówienia online
              wystartują.
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light"
            >
              Zamknij
            </button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-warm-brown">
              🛵 Zamów online
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/70">
              Dziękujemy za zainteresowanie! Funkcja zamówienia online jest
              obecnie w przygotowaniu. Zostaw swój adres email, a powiadomimy
              Cię, gdy wystartujemy.
            </p>

            <form action={handleAction} className="mt-4 flex flex-col gap-3">
              <input
                id="modal-email"
                name="email"
                type="email"
                required
                placeholder="Twój adres email"
                className="w-full rounded-lg border border-amber-200 bg-cream px-4 py-2.5 text-sm text-warm-brown placeholder-amber-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              {state?.error && (
                <p className="text-sm font-medium text-red-500">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Zapisywanie..." : "Powiadom mnie"}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 w-full text-center text-sm text-amber-900/50 transition-colors hover:text-warm-brown"
            >
              Nie teraz, dziękuję
            </button>
          </>
        )}
      </div>
    </div>
  );
}
