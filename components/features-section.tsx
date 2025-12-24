import { ShieldCheck, Layers, Zap, Gauge, Image, MonitorSmartphone } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "100% Secure Client-Side Conversion",
        text: "Unlike other tools that upload your private photos to a server, our **HEIC to PNG converter** processes everything locally in your browser. Your data never leaves your device, ensuring complete privacy. It is the safest way to convert personal photos."
    },
    {
        icon: Layers,
        title: "Bulk Convert 100 Images at Once",
        text: "Need to convert an entire holiday album? We support **batch converting HEIC to PNG** with up to 100 files per session. Our powerful engine handles large files (up to 50MB each) seamlessly, saving you hours of manual work."
    },
    {
        icon: Zap,
        title: "Completely Free & Unlimited",
        text: "Forget about \"daily limits\" or \"paywalls.\" HeicToPng.org is a truly **free HEIC to PNG converter**. You can convert as many files as you need without signing up, installing software, or adding a credit card."
    },
    {
        icon: Gauge,
        title: "Instant Transformation",
        text: "By eliminating the need to upload files to a cloud server, we save you massive amounts of time. The conversion starts the moment you drop your files. Experience the fastest **HEIC to PNG** process available on the web, even on mobile data."
    },
    {
        icon: Image,
        title: "Original Quality Retention",
        text: "We prioritize quality. Our tool converts your **.heic** files to **.png** while preserving the original resolution, color depth, and transparency. Get crisp, clear images perfect for editing, printing, or web usage without compression artifacts."
    },
    {
        icon: MonitorSmartphone,
        title: "Works on Windows, Mac & Android",
        text: "HEIC files are great for iPhones but hard to open on Windows. Our tool solves this compatibility issue instantly. Open, view, and **convert HEIC to PNG** on any operating system or device directly from your Chrome, Safari, or Edge browser."
    }
];

export function FeaturesSection() {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        Why We Are the Best Free HEIC to PNG Converter
                    </h2>
                    <p className="text-lg text-gray-600">
                        Experience the fastest, most secure, and unlimited way to convert your Apple photos to PNG format online.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        // Parse logical markup for bold text: **text**
                        const parts = feature.text.split(/(\*\*.*?\*\*)/g);

                        return (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {parts.map((part, idx) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
