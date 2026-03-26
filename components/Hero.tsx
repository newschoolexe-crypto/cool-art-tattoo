interface HeroProps {
  heading?: string;
  subheading?: string;
  body?: string;
  imageUrl?: string;
  showCta?: boolean;
}

export default function Hero({ heading, subheading, body, imageUrl, showCta = true }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-brand-black">
        {imageUrl && (
          <div className="absolute inset-0 ken-burns bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${imageUrl})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-brand-black/30 to-brand-black" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {subheading && (
          <p className="font-accent text-sm tracking-[0.35em] text-brand-cream/60 uppercase mb-6">
            {subheading}
          </p>
        )}
        {heading && (
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl text-brand-cream font-bold uppercase tracking-wide leading-[1.1] mb-6">
            {heading}
          </h1>
        )}
        {body && (
          <p className="font-body text-brand-cream/60 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {body}
          </p>
        )}
        {showCta && (
          <a href="#prenota"
            className="inline-block px-10 py-4 border border-brand-cream/40 text-brand-cream font-accent text-xs tracking-[0.25em] uppercase hover:border-brand-gold hover:text-brand-gold transition-all">
            Prenota Consulenza
          </a>
        )}
      </div>
    </section>
  );
}
