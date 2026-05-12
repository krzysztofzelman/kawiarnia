"use client";

import { useActionState } from "react";
import FadeIn from "./FadeIn";
import { CONTACT_DETAILS } from "@/data/contact";
import { OPENING_HOURS } from "@/data/openingHours";
import { submitContact } from "@/lib/supabase/actions";
import type { OpeningHour } from "@/lib/supabase/types";

interface ContactProps {
  hours: OpeningHour[];
}

export default function Contact({ hours }: ContactProps) {
  const displayHours =
    hours.length > 0
      ? hours
      : OPENING_HOURS.map((item, i) => ({
          id: i,
          day: item.day,
          hours: item.hours,
          sort_order: i,
          created_at: "",
        }));

  return (
    <section id="contact" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-14 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-light">
            Kontakt
          </h2>
          <h3 className="text-3xl font-bold text-warm-brown sm:text-4xl">
            Wpadnij do nas!
          </h3>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Lewa kolumna — dane kontaktowe + formularz */}
          <FadeIn className="space-y-8">
            {/* Dane kontaktowe */}
            <div className="space-y-6">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl"
                    aria-hidden="true"
                  >
                    {item.emoji}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground/55">
                      {item.label}
                    </p>
                    <p className="font-semibold text-warm-brown">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formularz kontaktowy */}
            <ContactForm />
          </FadeIn>

          {/* Prawa kolumna — godziny otwarcia */}
          <FadeIn delay={150}>
            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
              <h4 className="mb-5 flex items-center gap-2 text-lg font-bold text-warm-brown">
                <span aria-hidden="true">🕐</span> Godziny otwarcia
              </h4>
              <div className="space-y-3">
                {displayHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between border-b border-amber-100 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-foreground/75">
                      {item.day}
                    </span>
                    <span className="text-sm font-semibold text-warm-brown">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  if (state?.success) {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-700">✓ Dziękujemy!</p>
        <p className="mt-1 text-sm text-emerald-600">
          Twoja wiadomość została wysłana. Odezwiemy się wkrótce.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">
          Imię
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Twoje imię"
          className="w-full rounded-lg border border-amber-200 bg-cream px-4 py-2.5 text-sm text-warm-brown placeholder-amber-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Twój adres email"
          className="w-full rounded-lg border border-amber-200 bg-cream px-4 py-2.5 text-sm text-warm-brown placeholder-amber-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Twoja wiadomość..."
          className="w-full resize-none rounded-lg border border-amber-200 bg-cream px-4 py-2.5 text-sm text-warm-brown placeholder-amber-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-red-500">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
