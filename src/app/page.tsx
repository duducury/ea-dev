import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Technologies from "@/components/Technologies";
import Developers from "@/components/Developers";
import About from "@/components/About";
import Process from "@/components/Process";
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
        <Developers />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
