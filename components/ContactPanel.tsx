"use client";

import { useState, useEffect } from "react";

export default function ContactPanel() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href") || "";
        if (href === "#prenota" || href === "#contatti" || href.includes("#prenota") || href.includes("#contatti")) {
          e.preventDefault();
          setOpen(true);
          setSent(false);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
          subject: `Nuova richiesta da ${form.name} - Vicious Art Tattoo`,
          from_name: "Vicious Art Tattoo Website",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setError("Errore nell'invio. Riprova più tardi.");
      }
    } catch {
      setError("Errore di connessione. Riprova più tardi.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-brand-charcoal border border-brand-gray/30 text-brand-cream font-body text-sm placeholder:text-brand-muted/40 focus:border-brand-gold/50 focus:outline-none transition-colors";

  return (
    <>
      {open && <div className="fixed inset-0 z-[90] bg-brand-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />}

      <div className={`fixed top-0 right-0 z-[100] h-full w-full max-w-md bg-brand-dark border-l border-brand-gray/30 shadow-2xl transform transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray/20">
          <div>
            <h3 className="font-accent text-lg tracking-wider text-brand-gold uppercase">Prenota Consulenza</h3>
            <p className="text-xs text-brand-muted font-body mt-1">Compila il form e ti contatteremo al più presto</p>
          </div>
          <button onClick={() => setOpen(false)} className="text-brand-muted hover:text-brand-gold transition-colors p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="px-6 py-8 overflow-y-auto h-[calc(100%-80px)]">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 border-2 border-brand-gold rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h4 className="font-heading text-2xl text-brand-cream italic mb-3">Messaggio inviato!</h4>
              <p className="text-brand-muted font-body text-sm mb-8">Ti contatteremo il prima possibile. Grazie!</p>
              <button onClick={() => setOpen(false)} className="px-6 py-3 border border-brand-gold text-brand-gold font-accent text-xs tracking-wider uppercase hover:bg-brand-gold hover:text-brand-black transition-all">Chiudi</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-brand-muted font-accent tracking-wider uppercase mb-2">Nome e Cognome *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Il tuo nome" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted font-accent tracking-wider uppercase mb-2">Email *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="la-tua@email.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted font-accent tracking-wider uppercase mb-2">Telefono *</label>
                <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+39 000 0000000" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted font-accent tracking-wider uppercase mb-2">Servizio *</label>
                <select name="service" required value={form.service} onChange={handleChange} className={inputClass + " appearance-none"}>
                  <option value="">Seleziona un servizio</option>
                  <option value="Tatuaggio">Tatuaggio</option>
                  <option value="Piercing">Piercing</option>
                  <option value="Permanent Make-up">Permanent Make-up</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-brand-muted font-accent tracking-wider uppercase mb-2">Messaggio</label>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Descrivi la tua idea o richiesta..." className={inputClass + " resize-none"} />
              </div>
              {error && <p className="text-red-400 font-body text-sm">{error}</p>}
              <button type="submit" disabled={sending}
                className="w-full py-4 bg-brand-gold text-brand-black font-accent tracking-wider text-sm uppercase hover:bg-brand-gold-light transition-all disabled:opacity-50">
                {sending ? "Invio in corso..." : "Invia Richiesta"}
              </button>
              <p className="text-xs text-brand-muted/50 font-body text-center">La consulenza è gratuita. Ti contatteremo entro 24 ore.</p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
