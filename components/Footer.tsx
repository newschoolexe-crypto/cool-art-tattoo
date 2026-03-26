import Link from "next/link";

interface Settings {
  siteName?: string; email?: string; phone?: string; address?: string;
  instagram?: string; facebook?: string; footerText?: string;
}

const fb: Settings = {
  email: "daniele.grammatico95@gmail.com", phone: "+39 347 0618527",
  address: "Via Aranci, 04011 Aprilia LT",
  instagram: "https://www.instagram.com/bilz_vicious_tattoo/",
  facebook: "https://www.facebook.com/profile.php?id=100042512874022",
};

export default function Footer({ settings }: { settings: Settings | null }) {
  const s = settings || fb;
  return (
    <footer className="bg-brand-dark border-t border-brand-gray/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-heading text-xl font-bold text-brand-cream uppercase tracking-wider mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm text-brand-muted font-body">
              {s.email && <li className="flex items-center gap-2"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><a href={`mailto:${s.email}`} className="hover:text-brand-gold transition-colors">{s.email}</a></li>}
              {s.phone && <li className="flex items-center gap-2"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg><a href={`tel:${s.phone}`} className="hover:text-brand-gold transition-colors">{s.phone}</a></li>}
              {s.address && <li className="flex items-center gap-2"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>{s.address}</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold text-brand-cream uppercase tracking-wider mb-4">Legale</h4>
            <a href="#" className="text-sm text-brand-muted font-body hover:text-brand-gold transition-colors flex items-center gap-2">
              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              Privacy Policy
            </a>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold text-brand-cream uppercase tracking-wider mb-4">Social</h4>
            <div className="flex gap-3">
              {s.instagram && (
                <a href={s.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-gray/40 hover:border-brand-gold flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
                </a>
              )}
              {s.facebook && (
                <a href={s.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-gray/40 hover:border-brand-gold flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
