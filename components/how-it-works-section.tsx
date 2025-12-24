import { UploadCloud, Settings2, Download, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: UploadCloud,
        title: "1. Upload HEIC Files",
        text: "Drag and drop your **.heic** or **.heif** images directly into the converter box. You can select up to **100 files** at a time (max 50MB each) for bulk processing. No account required."
    },
    {
        icon: Settings2,
        title: "2. Sit Back & Relax",
        text: "Our smart browser-based engine automatically processes your queue. It converts **HEIC to PNG** instantly using client-side technology, ensuring your photos are never uploaded to a slow server."
    },
    {
        icon: Download,
        title: "3. Download PNG Images",
        text: "Once the batch conversion is complete, click the green button to download a **ZIP file** containing all your converted PNG images. Your files are ready for use on Windows, Android, or the web."
    }
];

export function HowItWorksSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        How to Convert HEIC to PNG Online for Free
                    </h2>
                    <p className="text-lg text-gray-600">
                        Follow these 3 simple steps to transform your iPhone photos into high-quality PNGs.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-3 gap-12">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 z-0"></div>

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        // Parse logical markup for bold text: **text**
                        const parts = step.text.split(/(\*\*.*?\*\*)/g);

                        return (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-white rounded-full border border-gray-100 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed max-w-sm">
                                    {parts.map((part, idx) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </p>

                                {/* Mobile Arrow (Visual Only) */}
                                {i < steps.length - 1 && (
                                    <div className="md:hidden mt-8 text-gray-300">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
