import { Hero } from "@/components/base compo/hero";
import { Navigation } from "@/components/base compo/navigation";
import { SectionSec } from "@/components/base compo/sectionSec";
import { Testimonials } from "@/components/base compo/testamonial";
import { VibeSection } from "@/components/base compo/vibeSection";
import { Footer } from "@/components/base compo/footer";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/dark.mood";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navigation />
      <main className="grow">
        <Hero />
        <VibeSection />
        <SectionSec />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
