import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Head from "next/head";

const faqData = [
    {
        q: "Is HeicToPng.org really free and unlimited?",
        a: "Yes! Unlike other converters that limit you to 5 or 10 files, HeicToPng.org is completely free. You can batch convert up to 100 HEIC files at a time without any daily limits, paywalls, or sign-ups.",
    },
    {
        q: "Is it safe to convert private photos on this website?",
        a: "Absolutely. We use **Client-Side Processing** technology. This means your photos are converted directly inside your browser and are **never uploaded** to our servers. Your personal data stays on your device, ensuring 100% privacy and security.",
    },
    {
        q: "How do I open HEIC files on Windows?",
        a: "Windows does not support HEIC files natively by default. The fastest way to view them is to use our tool to convert **HEIC to PNG**. Once converted, you can open, edit, and share your images on Windows 10, Windows 11, or any other system effortlessly.",
    },
    {
        q: "Does converting HEIC to PNG lose image quality?",
        a: "No. PNG is a **lossless** format. Our converter preserves the original resolution, colors, and details of your HEIC photos. While the file size might increase slightly compared to compressed JPGs, the visual quality remains identical to the original Apple photo.",
    },
    {
        q: "Can I convert multiple HEIC files at once?",
        a: "Yes, we support robust batch processing. You can drag and drop up to **100 HEIC images** (max 50MB each) simultaneously. Our tool will process them in a queue and allow you to download them all as a single ZIP file.",
    },
    {
        q: "Does PNG support transparent backgrounds?",
        a: "Yes. If your original HEIF/HEIC image contains transparency data, converting it to PNG will preserve that transparency. This makes PNG the ideal format for logos, graphics, and editing layers.",
    },
    {
        q: "Can I use this converter on my iPhone or Android?",
        a: "Yes. HeicToPng.org is fully responsive and works directly in mobile browsers like Safari and Chrome. You can convert photos directly from your phone's gallery without installing any extra apps.",
    },
    {
        q: "What is the difference between HEIC and PNG?",
        a: "HEIC (High Efficiency Image Coding) is Apple's format for saving space on iPhones. PNG (Portable Network Graphics) is a universally compatible format known for lossless quality and transparency. Converting to PNG ensures your photos can be viewed on all devices and websites.",
    },
];

export function FaqSection() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a.replace(/\*\*/g, ""), // Remove markup for plain text schema
            },
        })),
    };

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Inject JSON-LD Schema for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about converting HEIC files.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqData.map((faq, index) => {
                            // Parse rich text (bolding)
                            const parts = faq.a.split(/(\*\*.*?\*\*)/g);

                            return (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-white border border-gray-100 rounded-2xl shadow-sm px-0 overflow-hidden"
                                >
                                    <AccordionTrigger className="px-6 py-5 text-lg hover:no-underline hover:bg-gray-50/50 transition-colors">
                                        <span className="font-semibold text-gray-900 text-left mr-4">
                                            {faq.q}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 pt-2">
                                        {parts.map((part, i) => {
                                            if (part.startsWith("**") && part.endsWith("**")) {
                                                return (
                                                    <strong key={i} className="font-semibold text-gray-900">
                                                        {part.slice(2, -2)}
                                                    </strong>
                                                );
                                            }
                                            return part;
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
