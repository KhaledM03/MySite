"use client";

import { useEffect, useRef } from "react";

const MAGNETIC_SELECTOR = "[data-magnetic]";

export default function InteractionLayer() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let activeSignal = null;
    let activeMagnetic = null;

    const enabled = () => finePointer.matches && !reducedMotion.matches;

    const findSignal = (target) => {
      const explicit = target.closest?.("[data-signal]");
      if (explicit) return { element: explicit, label: explicit.dataset.signal };
      const evidence = target.closest?.(".evidence-zoom");
      if (evidence) return { element: evidence, label: "INSPECT" };
      const external = target.closest?.('a[target="_blank"]');
      if (external) return { element: external, label: "LAUNCH ↗" };
      const project = target.closest?.(".home-project-card a, .project-card a, .project-navigation a");
      if (project) return { element: project, label: "OPEN CASE" };
      return null;
    };

    const render = () => {
      frame = 0;
      if (!enabled() || !activeSignal) {
        cursor.dataset.visible = "false";
        return;
      }
      cursor.style.transform = `translate3d(${pointerX + 15}px, ${pointerY + 18}px, 0)`;
      cursor.dataset.visible = "true";
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const resetMagnetic = (element) => {
      if (!element) return;
      element.style.removeProperty("--magnetic-x");
      element.style.removeProperty("--magnetic-y");
    };

    const onPointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!enabled()) {
        activeSignal = null;
        resetMagnetic(activeMagnetic);
        activeMagnetic = null;
        requestRender();
        return;
      }

      const signal = findSignal(event.target);
      if (signal?.element !== activeSignal?.element) {
        activeSignal = signal;
        cursor.textContent = signal?.label || "";
      }

      const magnetic = event.target.closest?.(MAGNETIC_SELECTOR);
      if (magnetic !== activeMagnetic) {
        resetMagnetic(activeMagnetic);
        activeMagnetic = magnetic;
      }
      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const x = Math.max(-5, Math.min(5, (event.clientX - rect.left - rect.width / 2) * 0.08));
        const y = Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * 0.08));
        activeMagnetic.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
        activeMagnetic.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
      }
      requestRender();
    };

    const onPointerOut = (event) => {
      if (!event.relatedTarget) {
        activeSignal = null;
        resetMagnetic(activeMagnetic);
        activeMagnetic = null;
        requestRender();
      }
    };

    const onMediaChange = () => {
      if (!enabled()) {
        activeSignal = null;
        resetMagnetic(activeMagnetic);
        activeMagnetic = null;
      }
      requestRender();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    finePointer.addEventListener("change", onMediaChange);
    reducedMotion.addEventListener("change", onMediaChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resetMagnetic(activeMagnetic);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      finePointer.removeEventListener("change", onMediaChange);
      reducedMotion.removeEventListener("change", onMediaChange);
    };
  }, []);

  return <span ref={cursorRef} className="signal-cursor" data-visible="false" aria-hidden="true" />;
}
