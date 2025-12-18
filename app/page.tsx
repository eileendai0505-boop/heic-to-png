import { Converter } from "@/components/converter"
import { ShieldCheck, Layers, Image as ImageIcon, Zap } from "lucide-react"
import dynamic from 'next/dynamic'

// Lazy load the text-heavy section to avoid blocking the main thread
const SeoContent = dynamic(() => import('@/components/seo-content'), {
  loading: () => <div className="h-96 flex items-center justify-center text-gray-400">Loading informational content...</div>,
})

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

      {/* Feature Highlights */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Unlimited Conversions",
                description: "No daily limits. Convert as many files as you need."
              },
              {
                icon: ShieldCheck,
                title: "Private & Secure",
                description: "Files never leave your browser. Zero server uploads."
              },
              {
                icon: Layers,
                title: "Batch Processing",
                description: "Convert hundreds of HEIC photos at once."
              },
              {
                icon: ImageIcon,
                title: "High Quality",
                description: "Lossless PNG output with transparency support."
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section (Lazy Loaded) */}
      <SeoContent />
    </div>
  )
}
