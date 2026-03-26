export const revalidate = 0;

import { getCategoryBySlug } from "@/lib/queries";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { notFound } from "next/navigation";

const fallbackCategories: Record<string, any> = {
  realistico: { title: "Realistico", description: "Questo stile di tatuaggio punta a riprodurre immagini con estrema precisione nei dettagli, nelle ombre e nelle sfumature." },
  chicano: { title: "Chicano", description: "Nato dalla cultura latina e dalle gang di Los Angeles, il tatuaggio Chicano si distingue per lettering elaborati, soggetti religiosi e volti espressivi." },
  "neo-classico": { title: "Neo Classico", description: "Ispirato all'arte greca e romana, il tatuaggio neoclassico combina linee eleganti, contrasti netti e figure mitologiche o scultoree." },
  fineline: { title: "Fine Line", description: "Caratterizzato da tratti sottili e minimalisti, il fineline esalta i dettagli con precisione e leggerezza, risultando perfetto per disegni delicati ed eleganti." },
};

interface Props { params: { slug: string; category: string } }

export default async function CategoryPage({ params }: Props) {
  const { slug: serviceSlug, category: categorySlug } = params;
  let data = null;
  try { data = await getCategoryBySlug(serviceSlug, categorySlug); } catch (e) {}

  const category = data?.category || fallbackCategories[categorySlug];
  const service = data?.service || { title: "Tatuaggi", slug: { current: serviceSlug } };
  if (!category) notFound();

  return (
    <>
      <Hero heading={category.title} subheading={service.title} body={category.description} />

      <div className="bg-brand-dark py-4 border-b border-brand-gray/20">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-sm font-body">
          <Link href="/" className="text-brand-muted hover:text-brand-gold transition-colors">Home</Link>
          <span className="text-brand-gray">/</span>
          <Link href={`/services/${serviceSlug}`} className="text-brand-muted hover:text-brand-gold transition-colors">{service.title}</Link>
          <span className="text-brand-gray">/</span>
          <span className="text-brand-gold">{category.title}</span>
        </div>
      </div>

      <Gallery images={category.galleryImages || []} title={`Galleria ${category.title}`} />

      <CTASection heading="Ti piace questo stile?" subheading="Prenota una consulenza gratuita e discutiamo insieme il tuo progetto." />
    </>
  );
}
