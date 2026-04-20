import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import Products from "@/components/Products";
import WhyChoose from "@/components/WhyChoose";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustMarquee />
      <Products />
      <Solutions />
      <WhyChoose />
      <Process />
      <TechStack />
      <CaseStudies />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
