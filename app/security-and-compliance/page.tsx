import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security and Compliance | HeicToPng',
    description: 'Security information for HeicToPng.org - Client-Side Security Model.',
};

export default function SecurityPage() {
    return (
        <article className="prose prose-blue max-w-4xl mx-auto py-12 px-4 selection:bg-blue-100">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Security and Compliance</h1>
            <p className="text-gray-500 mb-8 font-medium">Last Updated: December 17, 2025</p>

            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Security Architecture</h2>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    At HeicToPng.org, security is not an afterthought; it is embedded in our core architecture. We employ a <strong>Zero-Trust, Client-Side model</strong> to ensure the highest level of data protection.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">1.1. Client-Side Isolation</h3>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    Unlike server-side converters that require you to upload potentially sensitive documents to a cloud server, our tool processes data exclusively within your browser’s "Sandbox" environment.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
                    <li><strong>No File Transit:</strong> Your HEIC files never travel over the internet to our servers.</li>
                    <li><strong>No Database Storage:</strong> We do not maintain a database of user files.</li>
                    <li><strong>Reduced Attack Surface:</strong> Since we don't hold your data, we are not a target for data breaches aimed at stealing user content.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Network Security</h2>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">2.1. HTTPS Encryption (TLS 1.3)</h3>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    All communications between your browser and our website content delivery network are encrypted using <strong>Transport Layer Security (TLS)</strong>. This ensures that no third party can inject malicious code or eavesdrop on your session metadata.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">2.2. Content Security Policy (CSP)</h3>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    We implement strict Content Security Policies to prevent Cross-Site Scripting (XSS) and other code injection attacks, ensuring the integrity of the conversion scripts running in your browser.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Compliance Statements</h2>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">3.1. General Data Protection Regulation (GDPR)</h3>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    HeicToPng.org is fully compliant with the GDPR. Our unique architecture ensures that we act as a tool provider rather than a data processor of your file contents, as we never have access to them.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">3.2. California Consumer Privacy Act (CCPA)</h3>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    We respect the privacy rights of California residents. We do not sell your personal data. Any data collection is limited to standard analytics required for site maintenance and optimization.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Vulnerability Reporting</h2>
                <p className="mb-4 text-gray-600 leading-relaxed">
                    We welcome feedback from the security community. If you discover a potential security vulnerability in our Service, please contact us immediately at <a href="mailto:security@heictopng.org" className="text-blue-600 hover:underline">security@heictopng.org</a>. We will investigate the issue promptly.
                </p>
            </section>
        </article>
    );
}
