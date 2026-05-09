import { Hero } from "@/components/base compo/hero";
import { SectionSec } from "@/components/base compo/sectionSec";
import { Testimonials } from "@/components/base compo/testamonial";
import { VibeSection } from "@/components/base compo/vibeSection";

import { CookieConsent } from "@/components/base compo/cookie/CookieConsent";

export default function Home() {
  return (
    <>
      <Hero />
      <VibeSection />
      <SectionSec />
      <Testimonials />
      <CookieConsent />
    </>
  );
}
