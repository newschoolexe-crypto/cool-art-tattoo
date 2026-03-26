"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/studio")) return;

    const selectors = ".fade-in-up, .slide-from-left, .slide-from-right, .scale-in";
    const elements = document.querySelectorAll(selectors);

    // Reset all animations on route change
    elements.forEach((el) => {
      el.classList.remove("anim-ready", "visible");
    });

    const timer = setTimeout(() => {
      const freshElements = document.querySelectorAll(selectors);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      freshElements.forEach((el) => {
        el.classList.add("anim-ready");
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
