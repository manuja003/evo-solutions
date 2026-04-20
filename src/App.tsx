import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index.tsx";
import EvoDinePage from "./pages/EvoDinePage.tsx";
import EvoVillaPage from "./pages/EvoVillaPage.tsx";
import EvoInventoryPage from "./pages/EvoInventoryPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import TitanLoadingScreen from "@/components/TitanLoadingScreen";
import FloatingActions from "@/components/FloatingActions";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/products/evodine" element={<PageTransition><EvoDinePage /></PageTransition>} />
        <Route path="/products/evovilla" element={<PageTransition><EvoVillaPage /></PageTransition>} />
        <Route path="/products/evoinventory" element={<PageTransition><EvoInventoryPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence>
            {isLoading && <TitanLoadingScreen onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          
          {!isLoading && (
            <>
              <ScrollToTop />
              <BackgroundOrbs />
              <FloatingActions />
              <AnimatedRoutes />
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
