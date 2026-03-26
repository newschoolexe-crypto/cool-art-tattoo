"use client";

import { useState, useEffect } from "react";

interface CardCarouselProps {
  images: string[];
}

export default function CardCarousel({ images }: CardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const validImages = images.filter(Boolean);
  if (validImages.length === 0) {
    return (
      <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-brand-charcoal flex items-center justify-center">
        <span className="text-brand-muted font-body text-sm">Aggiungi immagini dal CMS</span>
      </div>
    );
  }

  useEffect(() => {
    if (validImages.length <= 1) return;
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % validImages.length);
          setIsAnimating(false);
        }, 600);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [validImages.length, isAnimating]);

  const getCardStyle = (index: number) => {
    const total = validImages.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      return {
        zIndex: 30,
        transform: isAnimating
          ? "translateX(-40%) scale(0.95)"
          : "translateX(0) scale(1)",
        opacity: isAnimating ? 0.6 : 1,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    }
    if (diff === 1) {
      return {
        zIndex: isAnimating ? 30 : 20,
        transform: isAnimating
          ? "translateX(0px) translateY(0px) scale(1)"
          : "translateX(20px) translateY(20px) scale(0.95)",
        opacity: isAnimating ? 1 : 0.7,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    }
    if (diff === 2) {
      return {
        zIndex: 10,
        transform: isAnimating
          ? "translateX(20px) translateY(20px) scale(0.95)"
          : "translateX(40px) translateY(40px) scale(0.9)",
        opacity: isAnimating ? 0.7 : 0.4,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    }
    return {
      zIndex: 0,
      transform: "translateX(40px) translateY(40px) scale(0.9)",
      opacity: 0,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  const goNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % validImages.length);
        setIsAnimating(false);
      }, 600);
    }
  };

  const goPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
        setIsAnimating(false);
      }, 600);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-[3/4]">
        {validImages.map((url, i) => (
          <div key={i} className="absolute inset-0" style={getCardStyle(i)}>
            <div className="w-full h-full bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: `url(${url})` }} />
          </div>
        ))}
      </div>
      {validImages.length > 1 && (
        <div className="flex gap-4 mt-4 justify-center">
          <button onClick={goPrev} className="text-brand-cream/40 hover:text-brand-gold transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={goNext} className="text-brand-cream/40 hover:text-brand-gold transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
