import { Metadata } from "next";
import { Hero } from "@/components/base compo/hero";
import { SectionSec } from "@/components/base compo/sectionSec";
import { Testimonials } from "@/components/base compo/testamonial";
import { VibeSection } from "@/components/base compo/vibeSection";

import { CookieConsent } from "@/components/base compo/cookie/CookieConsent";

export const metadata: Metadata = {
  title: "Idensphere LMS - Empowering Your Learning Journey",
  description: "Join Idensphere to explore a new world of learning with premium courses and AI-driven growth.",
};

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
