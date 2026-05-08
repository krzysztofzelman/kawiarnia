"use client";

import { useEffect, useRef, useState } from "react";

// Singleton IntersectionObserver – współdzielony między wszystkimi instancjami
let sharedObserver: IntersectionObserver | null = null;
const listeners = new Map<Element, (isIntersecting: boolean) => void>();
const observedElements = new WeakMap<Element, boolean>();

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const listener = listeners.get(entry.target);
          if (listener) {
            listener(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  return sharedObserver;
}

export function useInView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onIntersect = (intersecting: boolean) => {
      if (intersecting && !observedElements.get(el)) {
        observedElements.set(el, true);
        setTimeout(() => setIsVisible(true), delay);
        // Clean up after triggering
        listeners.delete(el);
        getObserver().unobserve(el);
      }
    };

    listeners.set(el, onIntersect);
    getObserver().observe(el);

    return () => {
      listeners.delete(el);
      getObserver().unobserve(el);
    };
  }, [delay]);

  return { ref, isVisible };
}
