"use client";

import { useEffect, useState } from "react";

const ROTATION_INTERVAL = 6000;

export function SupportingDescriptionCarousel({ descriptions }: { descriptions: readonly string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [descriptions]);

  useEffect(() => {
    if (paused || reduceMotion || descriptions.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % descriptions.length);
    }, ROTATION_INTERVAL);
    return () => window.clearInterval(timer);
  }, [descriptions.length, paused, reduceMotion]);

  return (
    <div
      className="supporting-description-carousel"
      role="group"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      aria-label="Rotating collection description. Focus to pause."
    >
      {descriptions.map((description, index) => (
        <p
          className={index === activeIndex ? "is-active" : undefined}
          key={description}
          aria-hidden={index !== activeIndex}
        >
          {description}
        </p>
      ))}
    </div>
  );
}
