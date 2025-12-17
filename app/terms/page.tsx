import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | HeicToPng',
    description: 'Comprehensive Terms of Service for HeicToPng.org. Understand your rights, our zero-liability policy, and usage guidelines.',
};

export default function TermsPage() {
    return (
        <article className="max-w-4xl mx-auto py-16 px-6 text-gray-700">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>
            <p className="mb-10 text-gray-500"><strong>Effective Date:</strong> December 17, 2025</p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">1. Introduction and Acceptance of Terms</h2>
                <p className="mb-4 leading-relaxed">
                    Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the <strong>HeicToPng.org</strong> website (the "Service") operated by HeicToPng ("us", "we", or "our").
                </p>
                <p className="mb-4 leading-relaxed">
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">2. Description of Service</h2>
                <p className="mb-4 leading-relaxed">
                    HeicToPng.org provides a web-based utility that allows users to convert image files from the HEIC (High Efficiency Image Coding) format to PNG (Portable Network Graphics) format. The Service utilizes <strong>Client-Side Processing technology</strong>, meaning that conversions are executed within the user's web browser environment using the device's local processing power.
                </p>
                <p className="mb-4 leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue the Service (or any part or content thereof) at any time with or without notice to you, and we will not be liable to you or to any third party should we exercise such rights.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">3. Intellectual Property Rights</h2>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">3.1. Our Intellectual Property</h3>
                <p className="mb-4 leading-relaxed">
                    The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of HeicToPng.org and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HeicToPng.org.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">3.2. Your Intellectual Property (User Content)</h3>
                <p className="mb-4 leading-relaxed">
                    We claim no intellectual property rights over the material you provide to the Service. Your files remain yours.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 leading-relaxed">
                    <li><strong>Ownership:</strong> You retain full ownership and copyright of any HEIC files you convert and the resulting PNG files.</li>
                    <li><strong>License:</strong> Since we do not upload your files to our servers, you do not need to grant us a license to host, store, or reproduce your content, unlike server-side converters. The conversion process is technical and ephemeral, occurring strictly on your hardware.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">4. User Conduct and Prohibited Uses</h2>
                <p className="mb-4 leading-relaxed">
                    You agree to use the Service only for lawful purposes. You are strictly prohibited from using the Service:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4 leading-relaxed">
                    <li><strong>Illegal Activities:</strong> In any way that violates any applicable federal, state, local, or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the US or other countries).</li>
                    <li><strong>Harm to Minors:</strong> For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                    <li><strong>Malware:</strong> To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                    <li><strong>Interference:</strong> To impersonate or attempt to impersonate HeicToPng.org, a HeicToPng.org employee, another user, or any other person or entity.</li>
                    <li><strong>Reverse Engineering:</strong> To attempt to decompile, reverse engineer, disassemble, or otherwise reduce to human-perceivable form any of the source code used in providing the Service.</li>
                    <li><strong>Scraping:</strong> To use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service.</li>
                </ol>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">5. Disclaimer of Warranties ("AS IS")</h2>
                <p className="mb-4 leading-relaxed">
                    THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. HEICTOPNG.ORG MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT, OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
                </p>
                <p className="mb-4 leading-relaxed">
                    NEITHER HEICTOPNG.ORG NOR ANY PERSON ASSOCIATED WITH HEICTOPNG.ORG MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE. WITHOUT LIMITING THE FOREGOING, NEITHER HEICTOPNG.ORG NOR ANYONE ASSOCIATED WITH HEICTOPNG.ORG REPRESENTS OR WARRANTS THAT THE SERVICE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
                <p className="mb-4 leading-relaxed">
                    HEICTOPNG.ORG HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">6. Limitation of Liability</h2>
                <p className="mb-4 leading-relaxed">
                    IN NO EVENT SHALL HEICTOPNG.ORG, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (iii) ANY CONTENT OBTAINED FROM THE SERVICE; AND (iv) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
                </p>
                <p className="mb-4 leading-relaxed">
                    BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR THE LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH JURISDICTIONS, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">7. Indemnification</h2>
                <p className="mb-4 leading-relaxed">
                    You agree to defend, indemnify, and hold harmless HeicToPng.org and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your device; b) a breach of these Terms, or c) Content posted on the Service.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">8. Governing Law and Dispute Resolution</h2>
                <p className="mb-4 leading-relaxed">
                    These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
                <p className="mb-4 leading-relaxed">
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
                </p>
                <p className="mb-4 leading-relaxed">
                    <strong>Arbitration:</strong> At HeicToPng.org's sole discretion, it may require You to submit any disputes arising from the use of these Terms of Service, including disputes arising from or concerning their interpretation, violation, invalidity, non-performance, or termination, to final and binding arbitration under the Rules of Arbitration of the American Arbitration Association applying United States law.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">9. Third-Party Links</h2>
                <p className="mb-4 leading-relaxed">
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by HeicToPng.org. HeicToPng.org has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that HeicToPng.org shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">10. Changes to Terms</h2>
                <p className="mb-4 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="mb-4 leading-relaxed">
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b">11. Contact Us</h2>
                <p className="mb-4 leading-relaxed">
                    If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 leading-relaxed">
                    <li>By email: <a href="mailto:legal@heictopng.org" className="text-blue-600 hover:underline">legal@heictopng.org</a></li>
                </ul>
            </section>
        </article>
    );
}
