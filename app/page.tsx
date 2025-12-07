import { HeroSection } from "@/components/hero-section"
import { PainSolutionSection } from "@/components/pain-solution-section"
import { ServicesSection } from "@/components/services-section"
import { FreeChecklistSection } from "@/components/free-checklist-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div id="how-it-works">
        <PainSolutionSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="pricing">
        <FreeChecklistSection />
      </div>
    </main>
  )
}
