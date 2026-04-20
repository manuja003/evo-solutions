import { Home } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import villaDashboard from "@/assets/lms-dashboard.jpg"; // Reusing the asset for now, but labeling as Villa

const EvoVillaPage = () => (
  <ProductDetailLayout
    name="EVOVilla"
    tagline="Strategic Hospitality Architecture"
    description="A high-performance property and guest management ecosystem engineered to maximize operational yield and deliver frictionless hospitality experiences at scale."
    icon={<Home size={32} className="text-primary-foreground" />}
    color="from-accent to-accent/60"
    screenshots={[villaDashboard]}
    screenshotAlts={["EVOVilla Strategic Dashboard"]}
    features={[
      { title: "Guest Experience Engineering", description: "Optimize every touchpoint with personalized profiles, automated concierge, and seamless check-in/out protocols." },
      { title: "Operational Intelligence", description: "Real-time property monitoring and staff coordination engineered for peak efficiency and zero downtime." },
      { title: "Yield Optimization", description: "Dynamic pricing algorithms and availability management built to maximize revenue per available room (RevPAR)." },
      { title: "Unified Ecosystem", description: "Consolidate bookings, maintenance, and guest services into a single, high-availability architecture." },
      { title: "Automated Workflows", description: "Reduce operational overhead by 70% with intelligent scheduling and automated guest communication." },
      { title: "Enterprise Compliance", description: "Bank-grade security for guest data and full fiscal compliance across international jurisdictions." },
    ]}
    benefits={[
      { text: "Architected for 99.99% uptime during peak booking seasons" },
      { text: "Increase RevPAR by 45% through data-driven strategic pricing" },
      { text: "Reduce guest friction with sub-100ms response times for all digital touchpoints" },
      { text: "Scalable from individual boutique villas to global hotel chains" },
      { text: "Zero-latency synchronization across OTAs and direct booking channels" },
      { text: "Built with a security-first approach to protect sensitive guest information" },
    ]}
  />
);

export default EvoVillaPage;
