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
  { _id: "1", title: "Tatuaggi Custom", slug: { current: "tatuaggi" }, description: "I nostri artisti specializzati ti offrono tatuaggi unici e personalizzati, creati su misura per esprimere la tua individualità.", icon: "tattoo" },
  { _id: "2", title: "Piercing", slug: { current: "piercing" }, description: "Precisione e sicurezza sono le nostre priorità quando si tratta di piercing.", icon: "piercing" },
  { _id: "3", title: "Permanent Make-up", slug: { current: "permanent-make-up" }, description: "Il nostro servizio di permanent makeup è pensato per valorizzare il tuo viso con risultati naturali e duraturi.", icon: "makeup" },
];

// Helper to find a section by type from Sanity page sections
function findSection(sections: any[], type: string) {
  return sections?.find((s: any) => s._type === type) || null;
}

export default async function HomePage() {
  let page = null, services = null, reviews = null;
  try {
    page = await getHomePage();
    services = await getServices();
    reviews = await getReviews();
  } catch (e) {}

  const svc = services || fallbackServices;
  const sections = page?.sections || [];

  // Extract sections from Sanity
  const heroSection = findSection(sections, "heroSection");
  const aboutSection = findSection(sections, "aboutSection");
  const servicesSection = findSection(sections, "servicesSection");
  const faqSection = findSection(sections, "faqSection");
  const ctaSection = findSection(sections, "ctaSection");

  // Images from about section
  const aboutImages = (aboutSection?.images || [])
    .map((img: any) => img?.asset?.url)
    .filter(Boolean);

  // Gallery band from about section images or hero images
  const allPageImages = sections.flatMap((s: any) =>
    [...(s.images || []), ...(s.image ? [s.image] : [])]
      .map((img: any) => img?.asset?.url)
      .filter(Boolean)
  );

  return (
    <>
      {/* HERO - reads from heroSection in Sanity */}
      <Hero
        heading={heroSection?.heading || "VICIOUS TATTOO APRILIA"}
        subheading={heroSection?.subheading || "Vicious Tattoo Aprilia"}
        body={heroSection?.body || "Da Vicious Tattoo disegnamo solo opere uniche che rimangono impresse."}
        imageUrl={heroSection?.image?.asset?.url}
      />

      {/* ABOUT + CAROUSEL - reads from aboutSection in Sanity */}
      <AboutCarousel
        heading={aboutSection?.heading || "Vicious Art Tattoo Studio"}
        body={aboutSection?.body || "Vicious Art Tattoo nasce dalla passione per l'arte del tatuaggio e del body piercing."}
        images={aboutImages}
        ctaText={aboutSection?.ctaText || "Prenota la consulenza"}
      />

      {/* MARQUEE */}
      <Marquee />

      {/* SERVICES - reads heading from servicesSection, cards from Service documents */}
      <ServicesSection
        heading={servicesSection?.heading || "I Nostri Servizi"}
        services={svc}
      />

      {/* PRENOTA button */}
      <div className="text-center py-8 bg-brand-black fade-in-up">
        <a href="#prenota" className="inline-block px-10 py-4 border border-brand-cream/40 text-brand-cream font-accent text-xs tracking-[0.25em] uppercase hover:border-brand-gold hover:text-brand-gold transition-all">
          Prenota Consulenza
        </a>
      </div>

      {/* GALLERY BAND - from about section images */}
      {allPageImages.length > 0 && <GalleryBand images={allPageImages} />}

      {/* REVIEWS */}
      <ReviewsSection reviews={reviews} />

      {/* FAQ - reads from faqSection in Sanity */}
      <FAQSection
        heading={faqSection?.heading || "FAQ"}
        items={faqSection?.items}
      />

      {/* CTA - reads from ctaSection in Sanity */}
      <CTASection
        heading={ctaSection?.heading || "Prenota la consulenza"}
        subheading={ctaSection?.subheading || "Pronto a trasformare la tua idea in arte? Prenota ora la tua sessione!"}
        imageUrl={ctaSection?.image?.asset?.url}
      />
    </>
  );
}
