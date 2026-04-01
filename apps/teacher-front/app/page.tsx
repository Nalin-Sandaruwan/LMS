import { Navigation } from "@/components/baseComponets/navBar";
import { HeroSection } from "@/components/baseComponets/heroSec";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navigation />
      <main className="grow">
        <HeroSection />
      </main>
    </div>
  );
}
