export default function Marquee({ items }: { items?: string[] }) {
  const words = items || ["TATUAGGI", "PIERCING", "PERMANENT MAKEUP"];
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <section className="py-8 bg-brand-dark overflow-hidden border-y border-brand-gray/10">
      <div className="marquee-track">
        {repeated.map((word, i) => (
          <span key={i} className="font-heading text-4xl sm:text-6xl lg:text-7xl text-brand-cream/8 uppercase tracking-wider whitespace-nowrap mx-8 select-none">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
