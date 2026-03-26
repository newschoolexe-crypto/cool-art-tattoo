interface CTASectionProps {
  heading?: string;
  subheading?: string;
  imageUrl?: string;
}

export default function CTASection({ heading, subheading, imageUrl }: CTASectionProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-charcoal">
        {imageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${imageUrl})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/50 to-brand-black/80" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center fade-in-up">
        {heading && (
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-brand-cream mb-4 tracking-wide">
            {heading.split(" ").map((word, i) => (
              <span key={i}>{i === 0 ? <span className="text-brand-gold">{word} </span> : `${word} `}</span>
            ))}
          </h2>
        )}
        {subheading && (
          <p className="font-accent text-sm tracking-[0.2em] text-brand-cream/50 uppercase mb-10">{subheading}</p>
        )}
        <a href="#prenota"
          className="inline-block px-10 py-4 border border-brand-cream/40 text-brand-cream font-accent text-xs tracking-[0.25em] uppercase hover:border-brand-gold hover:text-brand-gold transition-all">
          Prenota Consulenza
        </a>
      </div>
    </section>
  );
}
