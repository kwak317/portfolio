"use client";

import { useEffect } from "react";

// Page-wide effects: cursor spotlight, scroll progress bar, and scroll reveals.
export function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--spot-x", `${event.clientX}px`);
        root.style.setProperty("--spot-y", `${event.clientY}px`);
      });
    };
    if (finePointer) {
      root.classList.add("has-spotlight");
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? String(window.scrollY / max) : "0");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (!reduceMotion) {
      root.classList.add("can-reveal");
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      // Only elements below the first screen wait to be revealed.
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("reveal-pending");
          observer?.observe(el);
        }
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}

// Each letter springs up on hover, one by one.
export function BouncyName({ text }: { text: string }) {
  return (
    <span className="bouncy" aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span key={index} aria-hidden="true">
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
