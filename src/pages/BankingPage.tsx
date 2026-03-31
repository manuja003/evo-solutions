import { Landmark } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import bankingDashboard from "@/assets/banking-dashboard.jpg";

const BankingPage = () => (
  <ProductDetailLayout
    name="Banking System"
    tagline="Financial Management Suite"
    description="Enterprise-grade banking software with real-time transaction processing, comprehensive account management, and bank-level security — built for modern financial institutions."
    icon={<Landmark size={32} className="text-primary-foreground" />}
    color="from-primary to-accent"
    screenshots={[bankingDashboard]}
    screenshotAlts={["Banking System Dashboard"]}
    features={[
      { title: "Account Management", description: "Complete lifecycle management for savings, current, and fixed deposit accounts with KYC integration." },
      { title: "Transaction Processing", description: "Real-time fund transfers, deposits, withdrawals with sub-50ms processing speeds." },
      { title: "Loan Management", description: "End-to-end loan origination, disbursement, EMI scheduling, and collection tracking." },
      { title: "Security & Compliance", description: "Role-based access, two-factor authentication, audit trails, and regulatory compliance." },
      { title: "Reporting Suite", description: "Comprehensive financial reports, balance sheets, and regulatory submissions on demand." },
      { title: "API Integration", description: "RESTful APIs for seamless integration with payment gateways, credit bureaus, and third-party systems." },
    ]}
    benefits={[
      { text: "99.9% system uptime with redundant architecture and failover" },
      { text: "Process transactions in under 50ms with optimized infrastructure" },
      { text: "Full regulatory compliance with built-in audit trails" },
      { text: "Bank-grade encryption and security at every layer" },
      { text: "Scale from 1,000 to 1,000,000+ accounts without infrastructure changes" },
      { text: "Reduce operational costs by 35% with automation" },
    ]}
  />
);

export default BankingPage;
