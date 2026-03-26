import Link from "next/link";

interface AboutSectionProps {
  heading?: string;
  body?: string;
  imageUrl?: string;
  galleryUrls?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function AboutSection({
  heading,
  body,
  imageUrl,
  galleryUrls,
  ctaText,
  ctaLink,
}: AboutSectionProps) {
  const images = galleryUrls || [];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="gold-line mb-6" />
            {heading && (
              <h2 className="font-display text-3xl sm:text-4xl text-brand-cream italic mb-8">
                {heading}
              </h2>
            )}
            {body && (
              <div className="space-y-4">
                {body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-brand-cream/70 font-body text-base leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
            {ctaText && (
              <Link
                href={ctaLink || "#contatti"}
                className="inline-block mt-8 px-6 py-3 border border-brand-gold text-brand-gold font-body text-sm tracking-wider hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
              >
                {ctaText}
              </Link>
            )}
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.length > 0 ? (
              images.slice(0, 4).map((url, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden ${
                    i === 0 ? "row-span-2" : ""
                  }`}
                  style={{ aspectRatio: i === 0 ? "auto" : "1" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                  <div className="absolute inset-0 border border-brand-gold/10" />
                </div>
              ))
            ) : imageUrl ? (
              <div className="col-span-2 aspect-[4/3] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
              </div>
            ) : (
              <div className="col-span-2 aspect-[4/3] bg-brand-gray/20 flex items-center justify-center">
                <span className="text-brand-muted font-body text-sm">
                  Aggiungi immagini dal CMS
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
