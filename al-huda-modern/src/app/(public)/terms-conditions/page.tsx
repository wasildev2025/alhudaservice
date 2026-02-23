import PageBanner from "@/components/ui/PageBanner";

export default function TermsConditionsPage() {
    return (
        <>
            <PageBanner title="Terms & Conditions" subtitle="The rules and guidelines for using our services." />
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-gray-600 space-y-8">
                    <p className="text-lg font-bold text-gray-800">1. Acceptance of Terms</p>
                    <p>By accessing or using our website and services, you agree to be bound by these Terms and Conditions.</p>

                    <p className="text-lg font-bold text-gray-800">2. Service Bookings</p>
                    <p>All transport and Ziyarat bookings are subject to availability and confirmation by our team via WhatsApp or phone. We reserve the right to cancel or modify bookings in case of unforeseen circumstances.</p>

                    <p className="text-lg font-bold text-gray-800">3. Payment</p>
                    <p>Payment terms will be discussed at the time of booking. Currently, we accept bank transfers and cash payments in Saudi Riyals (SAR).</p>

                    <p className="text-lg font-bold text-gray-800">4. User Responsibilities</p>
                    <p>Users are responsible for providing accurate information during the booking process and for complying with local laws and regulations during their travel.</p>

                    <p className="text-lg font-bold text-gray-800">5. Limitation of Liability</p>
                    <p>Al-Huda Services is not liable for any indirect, incidental, or consequential damages arising out of or in connection with the use of our services.</p>
                </div>
            </section>
        </>
    );
}
