import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Plane, Hotel, Users, CheckCircle, Calendar, MapPin, Car } from "lucide-react";

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

                        {/* Right: Premium Form */}
                        <div className="lg:col-span-2">
                            <GlassCard className="p-0 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent pointer-events-none" />

                                <div className="p-10 relative z-10">
                                    <h3 className="text-3xl font-bold font-amiri mb-2 text-primary">Request Your Ride</h3>
                                    <p className="text-sm text-gray-500 mb-8 font-light">Enter your details below and we will confirm your booking instantly via WhatsApp.</p>

                                    <form className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Full Name</label>
                                            <input type="text" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="e.g. Abdullah Khan" />
                                        </div>

                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Mobile / WhatsApp</label>
                                            <input type="tel" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="+966 50 000 0000" />
                                        </div>

                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Pickup Location</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><MapPin size={18} /></div>
                                                <input type="text" className="w-full p-4 pl-12 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="e.g. Jeddah Airport Terminal 1" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Drop Location</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><MapPin size={18} /></div>
                                                <input type="text" className="w-full p-4 pl-12 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="e.g. Pullman Zamzam Hotel" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Travel Date</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Calendar size={18} /></div>
                                                <input type="date" className="w-full p-4 pl-12 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm text-gray-600" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Vehicle Type</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Car size={18} /></div>
                                                <select className="w-full p-4 pl-12 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm text-gray-600 appearance-none">
                                                    <option>Sedan (4 Seater)</option>
                                                    <option>SUV (5 Seater)</option>
                                                    <option>Van (7 Seater)</option>
                                                    <option>Hiace (12-14 Seater)</option>
                                                </select>
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Additional Notes (Optional)</label>
                                            <textarea rows={3} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm resize-none" placeholder="Any special requests or luggage details..."></textarea>
                                        </div>

                                        <div className="md:col-span-2 mt-2">
                                            <Button variant="primary" className="w-full py-5 text-sm uppercase tracking-widest font-bold shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                                                Submit Booking Request
                                            </Button>
                                            <p className="text-center text-xs text-secondary/50 mt-4 font-medium">By submitting, you agree to be contacted via WhatsApp for confirmation.</p>
                                        </div>
                                    </form>
                                </div>
                            </GlassCard>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
