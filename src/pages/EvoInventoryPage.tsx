import { Boxes } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import inventoryDashboard from "@/assets/banking-dashboard.jpg"; // Reusing the asset for now

const EvoInventoryPage = () => (
  <ProductDetailLayout
    name="EvoInventory"
    tagline="Strategic Supply Chain Intelligence"
    description="A mission-critical inventory management ecosystem engineered for zero-loss operations and peak logistics velocity. Built for enterprises that demand absolute precision."
    icon={<Boxes size={32} className="text-primary-foreground" />}
    color="from-primary to-accent"
    screenshots={[inventoryDashboard]}
    screenshotAlts={["EvoInventory Operations Dashboard"]}
    features={[
      { title: "Real-time Asset Telemetry", description: "Architected for 100% visibility into every SKU, moving through your ecosystem with sub-second synchronization." },
      { title: "Predictive Stock Intelligence", description: "Leverage advanced heuristics to forecast demand and automate rebalancing before bottlenecks occur." },
      { title: "Automated Fulfillment Engine", description: "Zero-latency orchestration of orders, pick-lists, and shipping protocols engineered for maximum throughput." },
      { title: "Multi-Node Synchronization", description: "Manage complex logistics across international warehouse clusters from a single, high-availability control plane." },
      { title: "Immutable Audit Trails", description: "Leverage secure, tamper-proof logging for every asset movement to ensure total accountability and compliance." },
      { title: "API-First Infrastructure", description: "Seamlessly integrate with ERPs, POS systems, and logistics providers via our robust, low-latency REST hooks." },
    ]}
    benefits={[
      { text: "Architected for 99.99% uptime in mission-critical logistics environments" },
      { text: "Achieve 99.9% inventory accuracy with real-time telemetry and validation" },
      { text: "Reduce carrying costs by 30% through strategic predictive scaling" },
      { text: "Scale from a single storeroom to global distribution networks without data degradation" },
      { text: "Enterprise-grade security and role-based access control for all logistics data" },
      { text: "Engineered to handle 10,000+ asset movements per minute with zero latency" },
    ]}
  />
);

export default EvoInventoryPage;
