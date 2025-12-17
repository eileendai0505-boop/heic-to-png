import { Converter } from "@/components/converter"
import { ShieldCheck, Layers, Image as ImageIcon, Zap, Check } from "lucide-react"

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

      {/* SEO Content Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl prose prose-blue prose-lg">

          <article className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Convert HEIC to PNG Online?</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-600">
                <li className="pl-2">
                  <strong className="text-gray-900">Upload:</strong> Drag and drop your <strong>.heic</strong> files into the box above.
                </li>
                <li className="pl-2">
                  <strong className="text-gray-900">Convert:</strong> The tool automatically processes your files instantly.
                </li>
                <li className="pl-2">
                  <strong className="text-gray-900">Download:</strong> Save your <strong>PNG</strong> images individually or as a ZIP file.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use HeicToPng.org?</h2>
              <p className="text-gray-600 mb-6">
                Unlike other tools, we offer <strong>unlimited HEIC to PNG</strong> conversion. Whether you have 5 files or 500, our browser-based tool handles it all for free.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Benefits:</h3>
              <ul className="space-y-3 list-none pl-0">
                {[
                  { title: "Zero Upload Wait Time:", desc: "Since we don't upload to a server, conversion starts immediately." },
                  { title: "100% Privacy:", desc: "Your personal photos stay on your device." },
                  { title: "Cross-Platform:", desc: "Works on Windows, Mac, Android, and iPhone." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900">{item.title}</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "Is it really free?", a: "Yes, HeicToPng.org is completely free and unlimited." },
                  { q: "Can I convert HEIC to PNG on Windows?", a: "Absolutely. Our tool runs in Chrome/Edge, making it the perfect HEIC converter for Windows users." },
                  { q: "Does it support \"hiec to png\" or \"heic a png\"?", a: "Yes! No matter how you spell it, we handle the format conversion perfectly." }
                ].map((faq, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

        </div>
      </section>
    </div>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
