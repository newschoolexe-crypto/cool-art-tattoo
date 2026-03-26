"use client";

import Link from "next/link";
import { useState } from "react";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: { asset?: { url?: string } };
  images?: Array<{ asset?: { url?: string } }>;
}

export default function CategoryGrid({ categories, serviceSlug }: { categories: Category[]; serviceSlug: string }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat._id} category={cat} serviceSlug={serviceSlug} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category: cat, serviceSlug, index }: { category: Category; serviceSlug: string; index: number }) {
  const allImages = [
    cat.image?.asset?.url,
    ...(cat.images?.map(img => img.asset?.url) || [])
  ].filter(Boolean) as string[];

  const [hoverIndex, setHoverIndex] = useState(0);

  const currentImage = allImages[hoverIndex % allImages.length] || "";

  return (
    <Link href={`/services/${serviceSlug}/${cat.slug.current}`}
      className={`group grid grid-cols-2 bg-brand-charcoal border border-brand-gray/20 overflow-hidden hover:border-brand-gold/30 transition-all scale-in delay-${(index + 1) * 100}`}
      onMouseEnter={() => setHoverIndex((prev) => prev + 1)}
      onMouseLeave={() => {}}
    >
      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-brand-cream mb-3 tracking-wide">{cat.title}</h3>
        <p className="font-body text-sm text-brand-cream/50 leading-relaxed mb-4">{cat.description}</p>
        <span className="font-accent text-xs tracking-[0.2em] text-brand-cream/40 uppercase group-hover:text-brand-gold transition-colors flex items-center gap-2">
          Vedi lavori
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </span>
      </div>
      <div className="aspect-square relative overflow-hidden">
        {currentImage ? (
          <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
            style={{ backgroundImage: `url(${currentImage})` }} />
        ) : (
          <div className="absolute inset-0 bg-brand-gray/20 flex items-center justify-center">
            <span className="font-heading text-3xl text-brand-gold/10">{cat.title}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
