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

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerClient();

  let menuItems: MenuItem[] = [];
  let offers: OfferItem[] = [];
  let openingHours: OpeningHour[] = [];

  try {
    const [menuResult, offersResult, hoursResult] = await Promise.all([
      supabase.from("menu_items").select("*").order("sort_order"),
      supabase.from("offers").select("*").order("sort_order"),
      supabase.from("opening_hours").select("*").order("sort_order"),
    ]);

    menuItems = (menuResult.data ?? []) as MenuItem[];
    offers = (offersResult.data ?? []) as OfferItem[];
    openingHours = (hoursResult.data ?? []) as OpeningHour[];
  } catch (err) {
    console.error("Supabase fetch error, using fallback data:", err);
  }

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
