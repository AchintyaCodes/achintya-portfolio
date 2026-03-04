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
    <ReactLenis root options={{
      syncTouch: true,
      smoothWheel: true,
      syncTouchLerp: 0.02, // Heavy, thick fluid trailing
      touchMultiplier: 0.5, // Reduced distance per swipe
      touchInertiaExponent: 50, // Massive resistance to momentum
      // Intercept and clamp touch events to enforce a strict speed limit
      virtualScroll: (data) => {
        // Only clamp touch events; leave wheel/trackpad alone
        if (data.event.type.includes('touch')) {
          // Hard clamp the scroll distance per event to prevent long flicks
          const maxDelta = 12; // Extremely low max speed limit
          data.deltaY = Math.max(-maxDelta, Math.min(maxDelta, data.deltaY));
        }
        return true;
      }
    }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ReactLenis>
  </QueryClientProvider>
);

export default App;
