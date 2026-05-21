import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Preloader.css";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const counter3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter3 = counter3Ref.current;

    if (!counter3) return;

    counter3.innerHTML = "";

    // Generate digits
    for (let i = 0; i < 21; i++) {
      const div = document.createElement("div");
      div.className = "num";

      if (i === 20) {
        div.textContent = "0";
      } else {
        div.textContent = (i % 10).toString();
      }

      counter3.appendChild(div);
    }

    function animate(selector: string, duration: number, delay = 0) {
      const counter = document.querySelector(
        selector
      ) as HTMLElement;

      if (!counter) return;

      const numHeight = 100;
      const totalDistance =
        (counter.children.length - 1) *
        numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power3.inOut"
      });
    }

    animate(".counter-3", 5);
    animate(".counter-2", 6);
    animate(".counter-1", 2, 4);

    gsap.to(".digit", {
      y: -150,
      stagger: 0.08,
      delay: 6,
      duration: 1,
      ease: "power4.inOut"
    });

    gsap.from(".loader-1", {
      width: 0,
      duration: 6
    });

    gsap.from(".loader-2", {
      width: 0,
      delay: 2,
      duration: 2
    });

    gsap.to(".loading-screen", {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      onComplete: () => {
        setIsLoading(false);
        onComplete();
      }
    });

  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">

      <div className="counter">

        <div className="counter-1 digit">
          <div className="num">0</div>
          <div className="num">1</div>
        </div>

        <div className="counter-2 digit">
          {[0,1,2,3,4,5,6,7,8,9,0].map((n,i)=>(
            <div
              key={i}
              className="num"
            >
              {n}
            </div>
          ))}
        </div>

        <div
          className="counter-3 digit"
          ref={counter3Ref}
        />
      </div>

      <div className="preloader-content">

        <h1 className="preloader-title">
          ACHINTYA
        </h1>

        <div className="loader">
          <div className="loader-1 bar"/>
          <div className="loader-2 bar"/>
        </div>

        <h1 className="preloader-title">
          PORTFOLIO
        </h1>

      </div>

    </div>
  );
};

export default Preloader;