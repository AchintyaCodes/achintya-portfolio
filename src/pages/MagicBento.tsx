import React, { useEffect, useRef, useState } from "react";
import { achievements, certifications } from "../data/personalData";

const MagicBento = () => {
  return (
    <section className="w-full bg-black text-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="mb-24">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
            Achievements & Impact
          </h2>
        </div>

        {/* Strict Swiss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">

          <SwissItem
            value={4}
            suffix="+"
            label="Production Systems"
            description="Financial software systems deployed and serving real users with quantitative impact."
          />

          <SwissItem
            value={2}
            suffix="M+"
            label="Fraud Prevention Impact"
            description="Modeled fraud prevention impact at production volumes through ML-powered detection systems."
          />

          <SwissItem
            value={99.85}
            suffix="%"
            label="Model Accuracy"
            description="XGBoost fraud detection achieving 99.85% accuracy with 0.968 AUC-ROC on 284K+ transactions."
          />

          <SwissItem
            value={4}
            suffix="+"
            label="Certifications"
            description="Professional certifications from Google, IBM, Meta, and McKinsey Forward Program."
          />

        </div>
      </div>
    </section>
  );
};

const SwissItem = ({ value, suffix, label, description }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.4 } // Swiss: intentional visibility
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const duration = 1200;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={ref} className="flex flex-col items-start">

      {/* Label */}
      <span className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white">
        {label}
      </span>

      {/* Number */}
      <h3 className="mb-6 font-sans text-8xl md:text-9xl font-bold tracking-tight leading-none">
        {count.toLocaleString()}
        {suffix}
      </h3>

      {/* Description */}
      <p className="max-w-sm font-sans text-base leading-6 text-white/65">
        {description}
      </p>
    </div>
  );
};

export default MagicBento;
