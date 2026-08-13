"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function EngineeringLabExperience() {
  const pathRef = useRef(null);
  const entranceRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const render = () => {
      frame = 0;
      if (reducedMotion.matches) {
        document.documentElement.style.setProperty("--lab-progress", "1");
        document.documentElement.style.setProperty("--cad-shift", "0px");
        entranceRef.current?.style.setProperty("--lab-entrance", "1");
        entranceRef.current?.style.setProperty("--lab-x", "0px");
        entranceRef.current?.style.setProperty("--lab-y", "0px");
        entranceRef.current?.style.setProperty("--lab-turn", "0deg");
        entranceRef.current?.style.setProperty("--lab-circle-scale", "1");
        entranceRef.current?.style.setProperty("--lab-copy-y", "0px");
        return;
      }

      if (pathRef.current) {
        const rect = pathRef.current.getBoundingClientRect();
        const distance = Math.max(1, rect.height + window.innerHeight * 0.25);
        const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.76 - rect.top) / distance));
        document.documentElement.style.setProperty("--lab-progress", progress.toFixed(3));
      }

      if (entranceRef.current) {
        const rect = entranceRef.current.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.55)));
        entranceRef.current.style.setProperty("--lab-entrance", progress.toFixed(3));
        entranceRef.current.style.setProperty("--lab-x", `${((1 - progress) * 90).toFixed(1)}px`);
        entranceRef.current.style.setProperty("--lab-y", `${((1 - progress) * 42).toFixed(1)}px`);
        entranceRef.current.style.setProperty("--lab-turn", `${((1 - progress) * 3).toFixed(2)}deg`);
        entranceRef.current.style.setProperty("--lab-circle-scale", (0.82 + progress * 0.18).toFixed(3));
        entranceRef.current.style.setProperty("--lab-copy-y", `${((1 - progress) * 30).toFixed(1)}px`);
      }

      const cadSection = document.getElementById("cad");
      if (cadSection) {
        const rect = cadSection.getBoundingClientRect();
        const center = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        document.documentElement.style.setProperty("--cad-shift", `${Math.max(-22, Math.min(22, center * -20))}px`);
      }
    };

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reducedMotion.addEventListener("change", requestRender);
    render();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      reducedMotion.removeEventListener("change", requestRender);
      document.documentElement.style.removeProperty("--lab-progress");
      document.documentElement.style.removeProperty("--cad-shift");
    };
  }, []);

  return (
    <>
      <div className="lab-path-accent" ref={pathRef} aria-hidden="true">
        <span /><i /><i /><i /><i />
      </div>

      <div className="lab-character-entrance" ref={entranceRef} aria-hidden="true">
        <span>Observe · test · document</span>
        <Image
          src="/characters/khaled-engineering.webp"
          alt=""
          width={1000}
          height={1499}
          sizes="(max-width: 760px) 70vw, 35vw"
        />
      </div>
    </>
  );
}
