import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.avif"
                        alt="HeicToPng Logo"
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                    <span>HeicToPng</span>
                </Link>
            </div>
        </header>
    )
}
