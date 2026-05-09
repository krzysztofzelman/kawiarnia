import FadeIn from "./FadeIn";
import type { OfferItem } from "@/lib/supabase/types";
import { OFFERS } from "@/data/offer";

interface OfferProps {
  items: OfferItem[];
}

export default function Offer({ items }: OfferProps) {
  const displayItems =
    items.length > 0
      ? items
      : OFFERS.map((item) => ({
          id: 0,
          emoji: item.emoji,
          title: item.title,
          description: item.desc,
          color: item.color,
          sort_order: 0,
          created_at: "",
        }));

  return (
    <section id="offer" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-14 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-light">
            Nasza oferta
          </h2>
          <h3 className="text-3xl font-bold text-warm-brown sm:text-4xl">
            Co u nas znajdziesz?
          </h3>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 100}>
              <div className="group h-full rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md`}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-warm-brown">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-foreground/60">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
