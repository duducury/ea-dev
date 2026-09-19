import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Technologies from "@/components/Technologies";
import ForWho from "@/components/ForWho";
import Developers from "@/components/Developers";
import About from "@/components/About";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Technologies />
        <ForWho />
        <Developers />
        <About />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
