import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on("scroll", () => {
  window.dispatchEvent(new Event("scroll"));
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(<App />);