import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import EvoDinePage from "./pages/EvoDinePage.tsx";
import EvoVillaPage from "./pages/EvoVillaPage.tsx";
import EvoInventoryPage from "./pages/EvoInventoryPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/"                    element={<Index />} />
          <Route path="/products/evodine"    element={<EvoDinePage />} />
          <Route path="/products/evovilla"   element={<EvoVillaPage />} />
          <Route path="/products/evoinventory" element={<EvoInventoryPage />} />
          <Route path="/pricing"             element={<PricingPage />} />
          <Route path="*"                    element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
