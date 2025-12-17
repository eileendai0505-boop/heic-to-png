import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} HeicToPng. All rights reserved.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center text-sm">
                        <Link href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/security-and-compliance" className="text-gray-500 hover:text-blue-600 transition-colors">
                            Security
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
