import { useReveal } from "@/hooks/use-reveal";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyChoose from "@/components/WhyChoose";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useReveal();

  return (
    <div style={{ minHeight: "100vh", background: "var(--ed-bg-deep)" }}>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyChoose />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
