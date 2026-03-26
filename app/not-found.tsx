import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="text-center px-6">
        <h1 className="font-accent text-8xl text-brand-gold mb-4">404</h1>
        <p className="font-heading text-2xl text-brand-cream italic mb-2">Pagina non trovata</p>
        <p className="font-body text-brand-muted mb-8">La pagina che cerchi non esiste o è stata spostata.</p>
        <Link href="/" className="inline-block px-8 py-3 border border-brand-gold text-brand-gold font-accent text-xs tracking-wider uppercase hover:bg-brand-gold hover:text-brand-black transition-all">
          Torna alla Home
        </Link>
      </div>
    </section>
  );
}
