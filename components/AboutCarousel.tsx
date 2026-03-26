import CardCarousel from "./CardCarousel";

interface AboutCarouselProps {
  heading?: string;
  body?: string;
  images: string[];
  ctaText?: string;
  reverse?: boolean;
}

export default function AboutCarousel({ heading, body, images, ctaText, reverse }: AboutCarouselProps) {
  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? "direction-rtl" : ""}`}>
          <div className={`${reverse ? "lg:order-2" : ""} fade-in-up`}>
            <CardCarousel images={images} />
          </div>
          <div className={`${reverse ? "lg:order-1" : ""}`}>
            {heading && (
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-brand-cream mb-8 tracking-wide slide-from-left">
                <span className="text-brand-gold">{heading.split(" ").slice(0, 2).join(" ")}</span>{" "}
                {heading.split(" ").slice(2).join(" ")}
              </h2>
            )}
            {body && (
              <div className="space-y-4 slide-from-left delay-200">
                {body.split("\n\n").map((para, i) => (
                  <p key={i} className="font-body text-sm text-brand-cream/50 leading-relaxed">{para}</p>
                ))}
              </div>
            )}
            {ctaText && (
              <a href="#prenota" className="inline-flex items-center gap-2 mt-8 font-accent text-xs tracking-[0.2em] text-brand-cream/60 hover:text-brand-gold transition-colors uppercase underline underline-offset-4 slide-from-left delay-300">
                {ctaText}
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
