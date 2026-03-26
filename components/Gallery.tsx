"use client";

import { useState } from "react";

interface GalleryImage { _id: string; title?: string; image?: { asset?: { url?: string } }; }

export default function Gallery({ images, title }: { images: GalleryImage[]; title?: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-brand-muted font-body text-lg">Nessuna immagine disponibile. Aggiungi immagini dal CMS.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h2 className="font-heading text-3xl sm:text-4xl text-brand-cream font-bold uppercase text-center mb-12 fade-in-up">{title}</h2>
        )}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((img, i) => {
            const url = img.image?.asset?.url;
            if (!url) return null;
            return (
              <button key={img._id} onClick={() => setLightbox(i)}
                className="block w-full relative overflow-hidden group break-inside-avoid zoom-on-scroll">
                <img src={url} alt={img.title || "Gallery"} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/></svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-brand-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-brand-cream/60 hover:text-brand-gold">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }} className="absolute left-4 text-brand-cream/60 hover:text-brand-gold">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
          )}
          {lightbox < images.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }} className="absolute right-4 text-brand-cream/60 hover:text-brand-gold">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          )}
          <img src={images[lightbox]?.image?.asset?.url || ""} alt="" className="max-w-full max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
