import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://heictopng.org'), // Crucial for resolving absolute image paths
  title: "HEIC to PNG Converter: Free, Unlimited & Online",
  description: "Convert HEIC to PNG images online for free. Unlimited batch conversion, no file size limits. Secure client-side processing.",

  // 1. Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "HEIC to PNG Converter: Free, Unlimited & Online",
    description: "Convert HEIC/HEIF images to PNG instantly in your browser. No upload limits, 100% private and free.",
    url: "https://heictopng.org",
    siteName: "HeicToPng",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // Points to public/opengraph-image.png
        width: 1200,
        height: 630,
        alt: "HeicToPng Converter Preview",
      },
    ],
  },

  // 2. Twitter Card (X)
  twitter: {
    card: "summary_large_image",
    title: "Free HEIC to PNG Converter (Unlimited)",
    description: "Batch convert HEIC to PNG locally in your browser. No file size limits.",
    creator: "@HeicToPng", // Optional placeholder
    images: ["/opengraph-image.png"], // Reuse the same image
  },

  // Keep existing icons configuration
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FY6Y7NEQZZ"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FY6Y7NEQZZ');
        `}
      </Script>
    </html>
  );
}
