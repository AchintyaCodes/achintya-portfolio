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
      syncTouchLerp: 0.05,        // Smooth fluid trailing (higher = tracks finger closer)
      touchMultiplier: 0.65,      // Moderate weight per swipe
      touchInertiaExponent: 1.2,  // Near-linear inertia → controlled fling
      // Cap touch deltas to prevent fast swipes from overshooting
      virtualScroll: (data) => {
        if (data.event.type.includes('touch')) {
          const maxDelta = 30;
          data.deltaY = Math.max(-maxDelta, Math.min(maxDelta, data.deltaY));
          data.deltaX = Math.max(-maxDelta, Math.min(maxDelta, data.deltaX));
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
