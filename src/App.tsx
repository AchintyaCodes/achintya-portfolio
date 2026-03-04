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
      // Self-drive the animation loop (replaces the manual rAF that was in main.tsx)
      autoRaf: true,
      // Desktop smooth scroll settings (ported from main.tsx)
      smoothWheel: true,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Touch-only physics for heavy, viscous scrolling
      syncTouch: true,
      syncTouchLerp: 0.1,         // Light fluid trailing
      touchMultiplier: 0.9,       // Near-native weight
      touchInertiaExponent: 1.3,  // Slightly dampened fling
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
