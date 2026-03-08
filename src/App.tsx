import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from 'lenis/react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Lenis Setup: 
      - syncTouch: false allows the 'momentum' effect on mobile.
      - lerp: 0.08 creates a smooth, heavy 'glide' after scrolling.
    */}
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

        // Desktop settings
        smoothWheel: true,
        wheelMultiplier: 1.1,

        // Touch settings 
        // Note: 'smoothTouch' was removed in newer versions. 
        // Setting syncTouch to false enables the smooth momentum on touch.
        syncTouch: false,
        touchMultiplier: 1.8,
        lerp: 0.08,

        infinite: false,
      }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ReactLenis>
  </QueryClientProvider>
);

export default App;