import { createServerClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Offer from "@/components/Offer";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import OfflineNotice from "@/components/OfflineNotice";
import type { MenuItem, OfferItem, OpeningHour } from "@/lib/supabase/types";

export default async function Home() {
  const supabase = createServerClient();

  const [menuResult, offersResult, hoursResult] = await Promise.all([
    supabase.from("menu_items").select("*").order("sort_order"),
    supabase.from("offers").select("*").order("sort_order"),
    supabase.from("opening_hours").select("*").order("sort_order"),
  ]);

  const menuItems: MenuItem[] = menuResult.data ?? [];
  const offers: OfferItem[] = offersResult.data ?? [];
  const openingHours: OpeningHour[] = hoursResult.data ?? [];

  return (
    <>
      <OfflineNotice />
      <Header />
      <main>
        <Hero />
        <About />
        <Offer items={offers} />
        <Menu items={menuItems} />
        <Contact hours={openingHours} />
      </main>
      <Footer />
      <PwaInstallPrompt />
    </>
  );
}
