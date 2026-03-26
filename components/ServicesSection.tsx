import Link from "next/link";

interface ServiceItem {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  icon?: string;
}

const icons: Record<string, JSX.Element> = {
  tattoo: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 4L20 20l-8 4 8 4 4 16 4-16 8-4-8-4L24 4z" className="text-brand-gold"/></svg>,
  piercing: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="12" className="text-brand-gold"/><path d="M24 12a12 12 0 010 24" strokeDasharray="4 4" className="text-brand-gold"/></svg>,
  makeup: <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M16 8l4 24M28 8l-4 24M12 20h24M14 28h20" className="text-brand-gold"/></svg>,
};

export default function ServicesSection({ heading, services }: { heading?: string; services: ServiceItem[] | null }) {
  const items = services || [];

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        {heading && (
          <h2 className="font-heading text-4xl sm:text-5xl text-brand-cream font-bold uppercase text-center mb-16 fade-in-up">
            <span className="text-brand-gold">I Nostri</span> Servizi
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up delay-200">
          {items.map((s) => (
            <Link key={s._id} href={`/services/${s.slug.current}`}
              className="group bg-brand-charcoal border border-brand-gray/20 p-8 hover:border-brand-gold/30 transition-all duration-500">
              <div className="mb-6 text-brand-gold">
                {icons[s.icon || ""] || icons.tattoo}
              </div>
              <h3 className="font-heading text-xl font-bold uppercase text-brand-cream mb-4 tracking-wide">
                <span className="text-brand-gold">{s.title.split(" ")[0]}</span>{" "}
                {s.title.split(" ").slice(1).join(" ")}
              </h3>
              <p className="font-body text-sm text-brand-cream/50 leading-relaxed mb-6">
                {s.description}
              </p>
              <span className="font-accent text-xs tracking-[0.2em] text-brand-cream/40 uppercase group-hover:text-brand-gold transition-colors flex items-center gap-2">
                Leggi di più
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
