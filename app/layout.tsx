export const revalidate = 0;

import "./globals.css";
import { getSettings, getServices } from "@/lib/queries";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactPanel from "@/components/ContactPanel";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata = {
  title: "Vicious Art Tattoo – Studio di Tatuaggi Aprilia",
  description: "Studio di tatuaggi, piercing e permanent make-up ad Aprilia. L'arte del peccato.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings = null;
  let services = null;
  try {
    settings = await getSettings();
    services = await getServices();
  } catch (e) {}

  return (
    <html lang="it">
      <body>
        <Navigation services={services} />
        <main>{children}</main>
        <Footer settings={settings} />
        <ContactPanel />
        <ScrollAnimator />
      </body>
    </html>
  );
}
