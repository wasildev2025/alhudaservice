import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Plane, Hotel, Users, CheckCircle } from "lucide-react";

export default function PickDropPage() {
    return (
        <>
            <PageBanner
                title="Pick & Drop Service"
                subtitle="Reliable airport, hotel, and Ziyarat transport across Saudi Arabia."
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left: Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <h2 className="text-3xl font-bold font-amiri mb-6">Why Book With Us?</h2>

                            <div className="flex gap-4">
                                <div className="p-3 rounded-xl bg-[var(--cream)] text-[var(--primary)] h-fit">
                                    <Plane size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Airport Transfers</h4>
                                    <p className="text-sm text-gray-600">Jeddah, Madinah & Taif airports. We track your flight for on-time pickup.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 rounded-xl bg-[var(--cream)] text-[var(--primary)] h-fit">
                                    <Hotel size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Hotel & Ziyarat</h4>
                                    <p className="text-sm text-gray-600">Seamless door-to-door transport between hotels and sacred sites.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 rounded-xl bg-[var(--cream)] text-[var(--primary)] h-fit">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Group Options</h4>
                                    <p className="text-sm text-gray-600">Sedans, Vans, and Hiace vehicles suitable for any group size.</p>
                                </div>
                            </div>

                            <div className="bg-[var(--secondary)] text-white p-8 rounded-3xl mt-12">
                                <h4 className="font-amiri text-xl mb-4">Request Process</h4>
                                <ul className="space-y-4 text-sm opacity-90">
                                    <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[var(--primary)]" /> Fill the booking form</li>
                                    <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[var(--primary)]" /> We confirm via WhatsApp</li>
                                    <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[var(--primary)]" /> Driver assigned instantly</li>
                                    <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[var(--primary)]" /> Travel safely and comfortably</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-2">
                            <GlassCard className="p-10 border-[var(--border)] shadow-xl bg-white/40">
                                <h3 className="text-2xl font-bold font-amiri mb-8">Request Your Ride</h3>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Full Name</label>
                                        <input type="text" className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80" placeholder="e.g. Abdullah Khan" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Mobile / WhatsApp</label>
                                        <input type="tel" className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80" placeholder="+966 50 000 0000" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Pickup Location</label>
                                        <input type="text" className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80" placeholder="e.g. Jeddah Airport Terminal 1" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Drop Location</label>
                                        <input type="text" className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80" placeholder="e.g. Pullman Zamzam Hotel" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Travel Date</label>
                                        <input type="date" className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Vehicle Type</label>
                                        <select className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80">
                                            <option>Sedan (4 Seater)</option>
                                            <option>SUV (5 Seater)</option>
                                            <option>Van (7 Seater)</option>
                                            <option>Hiace (12-14 Seater)</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <label className="text-sm font-semibold opacity-70">Additional Notes (Optional)</label>
                                        <textarea rows={4} className="p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none bg-white/80" placeholder="Any special requests or luggage details..."></textarea>
                                    </div>
                                    <div className="md:col-span-2 mt-4">
                                        <Button variant="primary" className="w-full py-5 text-lg shadow-lg">Submit Booking Request</Button>
                                        <p className="text-center text-xs text-gray-400 mt-4">By submitting, you agree to be contacted via WhatsApp for confirmation.</p>
                                    </div>
                                </form>
                            </GlassCard>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
