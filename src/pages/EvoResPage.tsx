import { Monitor } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import evoresDashboard from "@/assets/evores-dashboard.jpg";

const EvoResPage = () => (
  <ProductDetailLayout
    name="EvoRes"
    tagline="Restaurant Management System"
    description="The all-in-one restaurant management platform that streamlines billing, inventory, orders, and analytics — helping you serve more customers with less overhead."
    icon={<Monitor size={32} className="text-primary-foreground" />}
    color="from-primary to-primary/60"
    screenshots={[evoresDashboard]}
    screenshotAlts={["EvoRes POS Dashboard"]}
    features={[
      { title: "Smart POS & Billing", description: "Lightning-fast billing with split checks, discounts, tax management, and multiple payment methods." },
      { title: "Inventory Management", description: "Real-time stock tracking with automatic low-stock alerts and supplier management." },
      { title: "Order Management", description: "Seamless dine-in, takeaway, and delivery order flow from table to kitchen." },
      { title: "Reports & Analytics", description: "Detailed daily, weekly, and monthly reports with sales trends and profit analysis." },
      { title: "Table Management", description: "Visual floor plan with table status, reservations, and wait-time estimation." },
      { title: "Multi-Branch Support", description: "Centralized management for chain restaurants with branch-level analytics." },
    ]}
    benefits={[
      { text: "Reduce billing time by up to 40% with our optimized POS interface" },
      { text: "Cut food waste by 25% with intelligent inventory tracking" },
      { text: "3x faster order processing from table to kitchen" },
      { text: "Real-time analytics across all your branches in one dashboard" },
      { text: "Works offline — never lose a sale due to connectivity issues" },
      { text: "Integrates with popular delivery platforms seamlessly" },
    ]}
  />
);

export default EvoResPage;
