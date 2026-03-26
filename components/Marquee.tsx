export default function Marquee({ items }: { items?: string[] }) {
  const words = items || ["TATUAGGI", "PIERCING", "PERMANENT MAKEUP"];
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <section className="py-8 overflow-hidden">
      <div className="marquee-track">
        {repeated.map((word, i) => (
          <span key={i} className="text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wider whitespace-nowrap mx-8 select-none"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "transparent",
              WebkitTextStroke: "1px rgba(245, 240, 235, 0.15)",
            }}>
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
