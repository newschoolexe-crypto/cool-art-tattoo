interface Feature {
  title?: string;
  description?: string;
  icon?: string;
}

interface FeatureCardsProps {
  heading?: string;
  body?: string;
  features: Feature[];
  imageUrl?: string;
}

const iconMap: Record<string, JSX.Element> = {
  time: <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="18" className="text-brand-gold"/><circle cx="24" cy="24" r="4" className="text-brand-gold"/><path d="M24 10v10M34 24H28" className="text-brand-gold"/></svg>,
  natural: <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M24 6c-6 8-16 14-16 24a16 16 0 0032 0c0-10-10-16-16-24z" className="text-brand-gold"/></svg>,
  duration: <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="8" y="12" width="32" height="28" rx="2" className="text-brand-gold"/><path d="M16 8v8M32 8v8M8 22h32" className="text-brand-gold"/></svg>,
  solution: <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="16" r="10" className="text-brand-gold"/><path d="M12 42c0-6.6 5.4-12 12-12s12 5.4 12 12" className="text-brand-gold"/></svg>,
};

export default function FeatureCards({ heading, body, features, imageUrl }: FeatureCardsProps) {
  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            {heading && (
              <h2 className="font-heading text-3xl font-bold uppercase text-brand-cream mb-6 tracking-wide slide-from-left">
                {heading.split(":").map((part, i) => (
                  <span key={i}>{i === 0 ? <><span className="text-brand-gold">{part}</span>: </> : part}</span>
                ))}
              </h2>
            )}
            {body && (
              <div className="space-y-4 slide-from-left delay-200">
                {body.split("\n\n").map((p, i) => (
                  <p key={i} className="font-body text-sm text-brand-cream/50 leading-relaxed">{p}</p>
                ))}
              </div>
            )}
            {imageUrl && (
              <div className="mt-8 aspect-[4/5] overflow-hidden fade-in-up delay-300">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
              </div>
            )}
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i}
                className={`bg-brand-charcoal border border-brand-gray/20 p-6 scale-in delay-${(i + 1) * 100}`}>
                <div className="mb-4 text-brand-gold">
                  {iconMap[f.icon || ""] || iconMap.time}
                </div>
                <h3 className="font-heading text-lg font-bold uppercase text-brand-cream mb-3 tracking-wide">
                  <span className="text-brand-gold">{f.title?.split(" ")[0]}</span>{" "}
                  {f.title?.split(" ").slice(1).join(" ")}
                </h3>
                <p className="font-body text-sm text-brand-cream/50 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
