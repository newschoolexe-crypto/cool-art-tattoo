export const revalidate = 0;

import { getServiceBySlug, getReviews } from "@/lib/queries";
import Hero from "@/components/Hero";
import AboutCarousel from "@/components/AboutCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import FeatureCards from "@/components/FeatureCards";
import GalleryBand from "@/components/GalleryBand";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const CardCarouselWrapper = dynamic(() => import("@/components/CardCarousel"), { ssr: false });

const fallback: Record<string, any> = {
  tatuaggi: {
    title: "Tatuaggi", heroHeading: "TATUAGGI", heroSubheading: "Distinguiti dalla noia artistica che vedi per strada",
    introTitle: "SEI CIRCONDATO DA PERSONE CON TATUAGGI CHE SEMBRANO FATTI CON LO STAMPINO?",
    introBody: "Distinguersi è diventato una sfida, ma qui non creiamo copie. Ogni tatuaggio che realizzo è un'opera unica, un riflesso autentico della tua storia, delle tue scelte e della tua identità.",
    body: "Da Vicious Art Tattoo, ogni tatuaggio è pensato per essere unico, proprio come te. Il nostro team di artisti si dedica a trasformare le tue idee in opere d'arte, con un'attenzione particolare ai dettagli e una passione che si riflette in ogni linea e sfumatura.\n\nQuando vieni da noi, non sei solo un cliente, ma una persona che vogliamo far sentire a proprio agio in un ambiente sicuro e accogliente. Ascoltiamo le tue richieste, ti guidiamo nella progettazione del tuo tatuaggio e ci assicuriamo che ogni passo del processo sia fatto con professionalità.\n\nOgni tatuaggio che realizziamo è il risultato di un lavoro attento e personalizzato, pensato per rispecchiare la tua individualità. Se cerchi un tatuaggio che ti rappresenti davvero, siamo qui per trasformare la tua visione in realtà.",
    ctaHeading: "Lavoriamo Insieme!", ctaSubheading: "Inserisci i tuoi dati e verrai contattato al più presto!",
    categories: [
      { _id: "r", title: "Realistico", slug: { current: "realistico" }, description: "Questo stile di tatuaggio punta a riprodurre immagini con estrema precisione nei dettagli, nelle ombre e nelle sfumature." },
      { _id: "c", title: "Chicano", slug: { current: "chicano" }, description: "Nato dalla cultura latina e dalle gang di Los Angeles, il tatuaggio Chicano si distingue per lettering elaborati, soggetti religiosi e volti espressivi." },
      { _id: "n", title: "Neoclassico", slug: { current: "neo-classico" }, description: "Ispirato all'arte greca e romana, il tatuaggio neoclassico combina linee eleganti, contrasti netti e figure mitologiche o scultoree." },
      { _id: "f", title: "Fine Line", slug: { current: "fineline" }, description: "Caratterizzato da tratti sottili e minimalisti, il fineline esalta i dettagli con precisione e leggerezza, risultando perfetto per disegni delicati ed eleganti." },
    ],
  },
  piercing: {
    title: "Piercing", heroHeading: "PIERCING", heroSubheading: "Studio di Piercing Aprilia",
    body: "Da Vicious Art Tattoo, la sicurezza è la nostra priorità assoluta quando si tratta di piercing. Utilizziamo solo strumenti sterilizzati e materiali di alta qualità per garantire procedure sicure e igieniche. Il nostro staff è altamente qualificato, con anni di esperienza nel settore e una conoscenza approfondita delle tecniche di piercing, così puoi affidarti a noi con totale tranquillità.\n\nOgni trattamento è svolto in un ambiente pulito e controllato, e siamo sempre pronti a guidarti nella scelta del piercing più adatto e a offrirti consigli per una corretta guarigione. Se cerchi un'esperienza di piercing professionale e sicura, sei nel posto giusto.",
    introTitle: "SICUREZZA ED AFFIDABILITÀ AL 100%",
    ctaHeading: "Prenota il tuo Piercing", ctaSubheading: "Compila i dati e verrai contattato al più presto!",
    categories: [],
  },
  "permanent-make-up": {
    title: "Permanent Make-up", heroHeading: "OTTIENI UN TRUCCO SEMPRE PERFETTO SENZA SFORZO", heroSubheading: "Studio di Permanent Makeup Aprilia",
    description: "Il nostro servizio di permanent make-up è studiato per esaltare la tua bellezza naturale con precisione e professionalità.\n\nGrazie alle tecniche più avanzate, offriamo soluzioni semipermanenti per sopracciglia, labbra e eyeliner, creando un look raffinato e impeccabile che si adatta perfettamente ai tuoi lineamenti.",
    introTitle: "Permanent Make-up: La Bellezza che Dura",
    ctaHeading: "Prenota la consulenza", ctaSubheading: "Pronto a trasformare la tua idea in arte?",
    categories: [],
    features: [
      { title: "Risparmio di Tempo", description: "Dimentica il trucco quotidiano! Con il permanent make-up, il tuo look sarà sempre impeccabile, risparmiando ore davanti allo specchio.", icon: "time" },
      { title: "Aspetto Naturale", description: "Ogni trattamento è studiato su misura per valorizzare i tuoi tratti unici, garantendo un risultato armonioso e naturale.", icon: "natural" },
      { title: "Durata e Resistenza", description: "Perfetto per chi ha una vita attiva, il permanent make-up resiste a sudore, acqua e sfregamenti, mantenendo il tuo stile in ogni situazione.", icon: "duration" },
      { title: "Soluzione per Problemi Estetici", description: "Ideale per chi vuole definire meglio sopracciglia sottili, donare colore alle labbra o creare una linea eyeliner perfetta, migliorando visibilmente l'aspetto generale.", icon: "solution" },
    ],
  },
};

interface Props { params: { slug: string } }

export default async function ServicePage({ params }: Props) {
  const { slug } = params;
  let service = null, reviews = null;
  try {
    service = await getServiceBySlug(slug);
    reviews = await getReviews();
  } catch (e) {}

  const fb = fallback[slug];
  if (!service && !fb) notFound();
  const s = service || fb;
  const serviceSlug = s.slug?.current || slug;
  const categories = s.categories || fb?.categories || [];
  const features = s.features || fb?.features || [];
  const bandImages = (s.galleryBand || []).map((img: any) => img?.asset?.url).filter(Boolean);
  const carouselImages = (s.galleryBand || []).slice(0, 5).map((img: any) => img?.asset?.url).filter(Boolean);

  const isTattoo = slug === "tatuaggi";
  const isPMU = slug === "permanent-make-up";

  return (
    <>
      <Hero
        heading={s.heroHeading || s.title}
        subheading={s.heroSubheading}
        imageUrl={s.image?.asset?.url}
      />

      {/* Tattoo intro section */}
      {isTattoo && (
        <section className="py-24 bg-brand-black">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-brand-cream tracking-wide leading-tight slide-from-left">
                {s.introTitle || fb?.introTitle}
              </h2>
              <a href="#prenota" className="inline-block mt-6 font-accent text-xs tracking-[0.2em] text-brand-cream/50 uppercase underline underline-offset-4 hover:text-brand-gold transition-colors slide-from-left delay-200">
                Prenota la consulenza
              </a>
            </div>
            <p className="font-body text-sm text-brand-cream/50 leading-relaxed fade-in-up">
              {s.introBody || fb?.introBody || s.description}
            </p>
          </div>
        </section>
      )}

      {/* Piercing description + carousel */}
      {!isTattoo && !isPMU && (
        <section className="py-24 bg-brand-black">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-brand-cream tracking-wide leading-tight slide-from-left">
                {s.introTitle || fb?.introTitle || "SICUREZZA ED AFFIDABILITÀ AL 100%"}
              </h2>
              <div className="mt-6 space-y-4 slide-from-left delay-200">
                {(s.body || fb?.body || "").split("\n\n").map((p: string, i: number) => (
                  <p key={i} className="font-body text-sm text-brand-cream/50 leading-relaxed">{p}</p>
                ))}
              </div>
              <a href="#prenota" className="inline-block mt-6 font-accent text-xs tracking-[0.2em] text-brand-cream/50 uppercase underline underline-offset-4 hover:text-brand-gold transition-colors slide-from-left delay-300">
                Prenota Consulenza ↓
              </a>
            </div>
            <div className="fade-in-up">
              {carouselImages.length > 0 ? (
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    {/* Dynamic import for client component */}
                    <CardCarouselWrapper images={carouselImages} />
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] bg-brand-charcoal flex items-center justify-center">
                  <span className="text-brand-muted font-body text-sm">Aggiungi immagini dal CMS</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PMU features */}
      {isPMU && features.length > 0 && (
        <FeatureCards
          heading={s.introTitle || fb?.introTitle}
          body={s.description || fb?.description}
          features={features}
          imageUrl={s.image?.asset?.url}
        />
      )}

      {/* Tattoo categories */}
      {isTattoo && categories.length > 0 && (
        <CategoryGrid categories={categories} serviceSlug={serviceSlug} />
      )}

      {/* Tattoo philosophy + carousel */}
      {isTattoo && (
        <AboutCarousel
          heading="La Filosofia Dietro Al Tatuaggio"
          body={s.body || fb?.body}
          images={carouselImages}
          ctaText="Prenota la consulenza"
        />
      )}

      {/* Gallery band */}
      {bandImages.length > 0 && <GalleryBand images={bandImages} />}

      {/* PMU gallery grid */}
      {isPMU && bandImages.length > 0 && (
        <section className="py-16 bg-brand-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {bandImages.slice(0, 9).map((url: string, i: number) => (
                <div key={i} className={`aspect-square overflow-hidden ${i < 3 ? "zoom-on-scroll" : "fade-in-up"}`}>
                  <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${url})` }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PMU before/after carousel */}
      {isPMU && carouselImages.length > 0 && (
        <section className="py-24 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-brand-cream tracking-wide slide-from-left">
                <span className="text-brand-gold">Prima e Dopo</span> delle nostre clienti
              </h2>
              <a href="#prenota" className="inline-block mt-6 px-8 py-3 border border-brand-cream/30 text-brand-cream font-accent text-xs tracking-[0.2em] uppercase hover:border-brand-gold hover:text-brand-gold transition-all slide-from-left delay-200">
                Prenota Consulenza
              </a>
            </div>
            <div className="fade-in-up">
              <CardCarouselWrapper images={carouselImages} />
            </div>
          </div>
        </section>
      )}

      {/* Reviews for PMU */}
      {isPMU && <ReviewsSection reviews={reviews} />}

      <CTASection
        heading={s.ctaHeading || fb?.ctaHeading || "Prenota la consulenza"}
        subheading={s.ctaSubheading || fb?.ctaSubheading || "Inserisci i tuoi dati e verrai contattato al più presto!"}
        imageUrl={s.image?.asset?.url}
      />
    </>
  );
}
