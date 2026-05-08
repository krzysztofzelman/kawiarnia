import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Offer from "@/components/Offer";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import OfflineNotice from "@/components/OfflineNotice";

export default function Home() {
  return (
    <>
      <OfflineNotice />
      <Header />
      <main>
        <Hero />
        <About />
        <Offer />
        <Menu />
        <Contact />
      </main>
      <Footer />
      <PwaInstallPrompt />
    </>
  );
}
