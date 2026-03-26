"use client";

import { useState } from "react";

interface FAQItem { question?: string; answer?: string; }

const fallbackFAQ: FAQItem[] = [
  { question: "COME FACCIO A PRENOTARE?", answer: "Puoi utilizzare il form presente nel sito. Inserisci i tuoi dati, ti contatteremo al più presto!" },
  { question: "QUANTO COSTA LA CONSULENZA?", answer: "La consulenza è gratuita! Inserisci i dati specificando il servizio richiesto e ti contatteremo noi!" },
  { question: "QUANTO CI METTE UN TATUAGGIO A GUARIRE?", answer: "In genere un tatuaggio impiega circa 2-4 settimane per guarire completamente. Seguire attentamente le istruzioni post-cura è fondamentale." },
];

export default function FAQSection({ heading, items }: { heading?: string; items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = items && items.length > 0 ? items : fallbackFAQ;

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-4xl sm:text-5xl text-brand-cream font-bold uppercase text-center mb-12 fade-in-up">
          {heading || "FAQ"}
        </h2>
        <div className="fade-in-up delay-200">
          {faqItems.map((item, i) => (
            <div key={i} className="border border-brand-gray/20">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="font-accent text-sm tracking-wider text-brand-cream uppercase pr-4">{item.question}</span>
                <span className="text-brand-gold text-xl flex-shrink-0">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="font-body text-sm text-brand-cream/50 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
