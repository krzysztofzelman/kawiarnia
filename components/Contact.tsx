import FadeIn from "./FadeIn";
import { CONTACT_DETAILS } from "@/data/contact";
import { OPENING_HOURS } from "@/data/openingHours";

export default function Contact() {
  return (
    <section id="contact" className="bg-background py-20 sm:py-28">
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
          {/* Contact details */}
          <FadeIn>
            <div className="space-y-6">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-amber-900/50">
                      {item.label}
                    </p>
                    <p className="font-semibold text-warm-brown">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Opening hours */}
          <FadeIn delay={150}>
            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
              <h4 className="mb-5 flex items-center gap-2 text-lg font-bold text-warm-brown">
                <span aria-hidden="true">🕐</span> Godziny otwarcia
              </h4>
              <div className="space-y-3">
                {OPENING_HOURS.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between border-b border-amber-100 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-amber-900/70">
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
