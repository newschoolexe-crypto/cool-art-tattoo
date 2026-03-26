"use client";

import Link from "next/link";
import { useState } from "react";

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
}

export default function Navigation({ services }: { services: Service[] | null }) {
  const [open, setOpen] = useState(false);
  const navServices = services || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-brand-black/90 backdrop-blur-md border-b border-brand-gray/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-accent text-sm tracking-[0.25em] text-brand-cream/90 hover:text-brand-gold transition-colors uppercase">
            Studio di Tatuaggi Aprilia
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navServices.map((s) => (
              <Link key={s._id} href={`/services/${s.slug.current}`}
                className="font-accent text-xs tracking-[0.2em] text-brand-cream/70 hover:text-brand-gold transition-colors uppercase">
                {s.title}
              </Link>
            ))}
            <a href="#prenota"
              className="ml-4 px-6 py-2.5 border border-brand-cream/30 text-brand-cream font-accent text-xs tracking-[0.2em] uppercase hover:border-brand-gold hover:text-brand-gold transition-all flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              Prenota Consulenza
            </a>
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-6 h-0.5 bg-brand-cream transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-brand-cream transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-brand-cream transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-brand-black/95 backdrop-blur-md border-b border-brand-gray/20">
          <nav className="flex flex-col px-6 py-6 gap-4">
            <Link href="/" onClick={() => setOpen(false)} className="font-accent text-base tracking-wider text-brand-cream/80 hover:text-brand-gold uppercase">Home</Link>
            {navServices.map((s) => (
              <Link key={s._id} href={`/services/${s.slug.current}`} onClick={() => setOpen(false)}
                className="font-accent text-base tracking-wider text-brand-cream/80 hover:text-brand-gold uppercase">
                {s.title}
              </Link>
            ))}
            <a href="#prenota" onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 border border-brand-cream/30 text-brand-cream font-accent text-sm text-center tracking-wider uppercase">
              Prenota Consulenza
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
