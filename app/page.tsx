export const revalidate = 0;

import { getHomePage, getServices, getReviews } from "@/lib/queries";
import Hero from "@/components/Hero";
import AboutCarousel from "@/components/AboutCarousel";
import Marquee from "@/components/Marquee";
import ServicesSection from "@/components/ServicesSection";
import GalleryBand from "@/components/GalleryBand";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

const fallbackServices = [
  { _id: "1", title: "Tatuaggi Custom", slug: { current: "tatuaggi" }, description: "I nostri artisti specializzati ti offrono tatuaggi unici e personalizzati, creati su misura per esprimere la tua individualità. Dalla progettazione alla realizzazione, seguiamo ogni dettaglio per garantire un'opera che racconti una storia e resista nel tempo. Scegli tra diversi stili o porta la tua idea: siamo qui per trasformarla in arte.", icon: "tattoo" },
  { _id: "2", title: "Piercing", slug: { current: "piercing" }, description: "Precisione e sicurezza sono le nostre priorità quando si tratta di piercing. Utilizziamo strumenti e materiali di alta qualità per garantire risultati sicuri e durevoli. Dalle scelte più classiche alle richieste più originali, il nostro staff esperto ti accompagnerà per un'esperienza serena e professionale.", icon: "piercing" },
  { _id: "3", title: "Permanent Make-up", slug: { current: "permanent-make-up" }, description: "Il nostro servizio di permanent makeup è pensato per valorizzare il tuo viso con risultati naturali e duraturi. Dalle sopracciglia alle labbra, utilizziamo tecniche avanzate per un make-up semipermanente che esalti la tua bellezza con precisione e professionalità.", icon: "makeup" },
];

export default async function HomePage() {
  let page = null, services = null, reviews = null;
  try {
    page = await getHomePage();
    services = await getServices();
    reviews = await getReviews();
  } catch (e) {}

  const svc = services || fallbackServices;

  // Collect gallery band images from all services
  const bandImages = svc.flatMap((s: any) =>
    (s.galleryBand || []).map((img: any) => img?.asset?.url).filter(Boolean)
  );

  // Collect about images from first service or page
  const aboutImages = svc.flatMap((s: any) =>
    (s.galleryBand || []).slice(0, 3).map((img: any) => img?.asset?.url).filter(Boolean)
  );

  return (
    <>
      <Hero
        heading="VICIOUS TATTOO APRILIA"
        subheading="Vicious Tattoo Aprilia"
        body="Da Vicious Tattoo disegnamo solo opere uniche che rimangono impresse."
        imageUrl={page?.sections?.[0]?.image?.asset?.url}
      />

      <AboutCarousel
        heading="Vicious Art Tattoo Studio"
        body={`Vicious Art Tattoo nasce dalla passione per l'arte del tatuaggio e del body piercing. Fondato con l'idea di creare uno spazio dove ogni cliente possa sentirsi a casa e sperimentare un servizio personalizzato, il nostro studio unisce creatività e professionalità in un ambiente accogliente e sicuro.\n\nL'idea di Vicious Art Tattoo è nata dalla voglia di dare vita a un luogo dove l'arte incontra l'individualità. Ogni tatuaggio e ogni piercing che realizziamo è unico, frutto di un lavoro attento e rispettoso delle idee e delle storie di chi lo sceglie.\n\nVicious Art Tattoo è molto più di uno studio: è una comunità di artisti e appassionati che condividono l'amore per l'arte e il desiderio di creare qualcosa di autentico.`}
        images={aboutImages}
        ctaText="Prenota la consulenza"
      />

      <Marquee />

      <ServicesSection heading="I Nostri Servizi" services={svc} />

      <div className="text-center py-8 bg-brand-black fade-in-up">
        <a href="#prenota" className="inline-block px-10 py-4 border border-brand-cream/40 text-brand-cream font-accent text-xs tracking-[0.25em] uppercase hover:border-brand-gold hover:text-brand-gold transition-all">
          Prenota Consulenza
        </a>
      </div>

      {bandImages.length > 0 && <GalleryBand images={bandImages} />}

      <ReviewsSection reviews={reviews} />

      <FAQSection />

      <CTASection
        heading="Prenota la consulenza"
        subheading="Pronto a trasformare la tua idea in arte? Prenota ora la tua sessione!"
      />
    </>
  );
}
