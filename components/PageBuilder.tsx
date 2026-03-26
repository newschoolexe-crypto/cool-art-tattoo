import Hero from "./Hero";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";

interface Section {
  _type: string;
  _key: string;
  heading?: string;
  subheading?: string;
  body?: string;
  image?: { asset?: { url?: string } };
  images?: Array<{ asset?: { url?: string } }>;
  ctaText?: string;
  ctaLink?: string;
  items?: Array<{ question?: string; answer?: string }>;
}

interface PageBuilderProps {
  sections: Section[] | null;
  services?: any[] | null;
}

export default function PageBuilder({ sections, services }: PageBuilderProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return (
              <Hero
                key={section._key}
                heading={section.heading}
                subheading={section.subheading}
                body={section.body}
                imageUrl={section.image?.asset?.url}
                ctaText={section.ctaText}
                ctaLink={section.ctaLink}
              />
            );
          case "servicesSection":
            return (
              <ServicesSection
                key={section._key}
                heading={section.heading}
                subheading={section.subheading}
                services={services || null}
              />
            );
          case "aboutSection":
            return (
              <AboutSection
                key={section._key}
                heading={section.heading}
                body={section.body}
                imageUrl={section.image?.asset?.url}
                galleryUrls={section.images
                  ?.map((img) => img.asset?.url)
                  .filter(Boolean) as string[]}
                ctaText={section.ctaText}
                ctaLink={section.ctaLink}
              />
            );
          case "ctaSection":
            return (
              <CTASection
                key={section._key}
                heading={section.heading}
                subheading={section.subheading}
                ctaText={section.ctaText}
                ctaLink={section.ctaLink}
                imageUrl={section.image?.asset?.url}
              />
            );
          case "faqSection":
            return (
              <FAQSection
                key={section._key}
                heading={section.heading}
                items={section.items}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
