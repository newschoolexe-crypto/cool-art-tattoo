interface Review {
  _id: string;
  name: string;
  initials?: string;
  rating: number;
  date?: string;
  text: string;
}

interface ReviewsSectionProps {
  reviews: Review[] | null;
  totalRating?: string;
  totalCount?: string;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i <= count ? "#FBBF24" : "#374151"}>
          <path d="M10 1l2.39 4.84L18 6.71l-4 3.9.94 5.5L10 13.68l-4.94 2.43.94-5.5-4-3.9 5.61-.87L10 1z"/>
        </svg>
      ))}
    </div>
  );
}

const fallbackReviews: Review[] = [
  { _id: "1", name: "Patrik Hate1993", initials: "PH", rating: 5, date: "Feb 17, 2026", text: "Ho fatto il mio primo tatuaggio con Daniele che mi ha fatto sentire perfettamente a mio agio! Super bravo, super disponile e super professionale!" },
  { _id: "2", name: "Camelia Andreea", initials: "CA", rating: 5, date: "Dec 23, 2025", text: "Ho fatto da Daniele il mio primo tatuaggio. Un professionista top" },
  { _id: "3", name: "Amalia Enache", initials: "AE", rating: 5, date: "Dec 20, 2025", text: "Ottima esperienza, ho fatto il mio tatoo e poi ritoccato due tatuaggi. Il tatuatore é amichevole e super delicato." },
  { _id: "4", name: "Michela Calzetti", initials: "MC", rating: 5, date: "Dec 15, 2025", text: "Ho fatto un piercing con Federico. Servizio impeccabile. è disponibile e preparato per qualsiasi dubbio o domanda sia prima che dopo l'appuntamento." },
];

export default function ReviewsSection({ reviews, totalRating, totalCount }: ReviewsSectionProps) {
  const items = reviews && reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4 fade-in-up">
          <p className="font-accent text-xs tracking-[0.3em] text-brand-cream/40 uppercase mb-3">Latest Testimonials</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-brand-cream font-bold uppercase">
            Recensioni dei <span className="text-brand-gold">Clienti</span>
          </h2>
        </div>

        <div className="border border-brand-gray/20 p-8 mt-12 fade-in-up delay-200">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-heading text-4xl font-bold text-brand-cream">{totalRating || "5.00"}</span>
            <div>
              <Stars count={5} />
              <span className="text-sm text-brand-muted font-body mt-1 block">{totalCount || "32"} reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.slice(0, 4).map((r) => (
              <div key={r._id} className="bg-brand-charcoal border border-brand-gray/15 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm font-semibold text-brand-gold">{r.rating}</span>
                    <Stars count={r.rating} />
                  </div>
                  <span className="font-body text-xs text-brand-muted">{r.date}</span>
                </div>
                <p className="font-body text-sm text-brand-cream/60 leading-relaxed mb-4 line-clamp-4">{r.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-gray flex items-center justify-center">
                      <span className="text-xs font-body font-semibold text-brand-cream">{r.initials || r.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="font-body text-xs text-brand-muted truncate max-w-[120px]">{r.name}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
