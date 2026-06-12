import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { ProductsSection } from "@/components/products-section"
import { OffersSection } from "@/components/offers-section"
import { SimulatorsSection } from "@/components/simulators-section"
import { CommitmentsSection } from "@/components/commitments-section"
import { MobileAppSection } from "@/components/mobile-app-section"
import { NewsSection } from "@/components/news-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
// Import unique pour le formulaire
import TransferForm from "@/components/transfer/transferform"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <HeroBanner />
        <ProductsSection />
        <OffersSection />
        <SimulatorsSection />
        <CommitmentsSection />
        <MobileAppSection />
        <NewsSection />
        <TestimonialsSection />
        <FAQSection />
        
        {/* Intégration du formulaire de virement */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-xl">
            <TransferForm />
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}