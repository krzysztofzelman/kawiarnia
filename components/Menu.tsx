import FadeIn from "./FadeIn";
import type { MenuItem } from "@/lib/supabase/types";
import { MENU_ITEMS } from "@/data/menu";

interface MenuProps {
  items: MenuItem[];
}

export default function Menu({ items }: MenuProps) {
  const displayItems =
    items.length > 0
      ? items
      : MENU_ITEMS.map((item) => ({
          id: 0,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          description: item.desc,
          sort_order: 0,
          created_at: "",
        }));

  return (
    <section id="menu" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-14 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-light">
            Nasze menu
          </h2>
          <h3 className="text-3xl font-bold text-warm-brown sm:text-4xl">
            Sprawdź, co dla Ciebie przygotowaliśmy
          </h3>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item, index) => (
            <FadeIn key={item.name} delay={index * 80}>
              <div className="group flex items-center gap-5 rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/40 to-primary/10 text-2xl shadow-sm">
                  <span aria-hidden="true">{item.emoji}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="truncate font-semibold text-warm-brown">
                      {item.name}
                    </h4>
                    <span className="shrink-0 font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
