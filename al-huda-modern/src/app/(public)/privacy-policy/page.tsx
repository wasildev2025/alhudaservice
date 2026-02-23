import PageBanner from "@/components/ui/PageBanner";

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageBanner title="Privacy Policy" subtitle="How we handle and protect your personal information." />
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-gray-600 space-y-8">
                    <p className="text-lg font-bold text-gray-800">1. Information Collection</p>
                    <p>We collect information you provide directly to us, such as when you book a transport service, inquire about a Ziyarat package, or contact us through our website. This may include your name, contact number, and travel details.</p>

                    <p className="text-lg font-bold text-gray-800">2. Use of Information</p>
                    <p>We use the information we collect to provide, maintain, and improve our services, including to process your bookings and send you related information, including confirmations and invoices.</p>

                    <p className="text-lg font-bold text-gray-800">3. Information Sharing</p>
                    <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., sharing your details with our drivers) or as required by law.</p>

                    <p className="text-lg font-bold text-gray-800">4. Data Security</p>
                    <p>We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access.</p>

                    <p className="text-lg font-bold text-gray-800">5. Contact Us</p>
                    <p>If you have any questions about this Privacy Policy, please contact us at info@alhudaservices.com.</p>
                </div>
            </section>
        </>
    );
}
