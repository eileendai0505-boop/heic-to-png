import { Converter } from "@/components/converter"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50 h-full">

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Free Unlimited HEIC to PNG Converter
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Convert your iPhone photos to PNG format in seconds. No limits, no sign-up. Secure client-side conversion.
          </p>
        </div>

        <Converter />
      </section>

      <FeaturesSection />

      <HowItWorksSection />

      <FaqSection />
    </div>
  )
}
