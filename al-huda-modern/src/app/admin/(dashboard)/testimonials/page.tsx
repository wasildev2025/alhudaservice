"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Check, X, Trash2, Search, Star } from "lucide-react";
import Link from "next/link";

interface Testimonial {
    id: string;
    name: string;
    location: string;
    review: string;
    stars: number;
    isApproved: boolean;
    createdAt: string;
}

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/admin/testimonials");
            const data = await res.json();
            if (data.success) {
                setTestimonials(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isApproved: !currentStatus }),
            });
            if (res.ok) fetchTestimonials();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTestimonial = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial permanently?")) return;
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
            if (res.ok) fetchTestimonials();
        } catch (error) {
            console.error(error);
        }
    };

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        name: "",
        location: "",
        stars: 5,
        review: ""
    });

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTestimonial)
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                setNewTestimonial({ name: "", location: "", review: "", stars: 5 });
                fetchTestimonials();
            } else {
                alert("Failed to add testimonial.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const filtered = testimonials.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.review.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-amiri text-[#D4AF37]">Voices of Gratitude</h1>
                    <p className="text-white/60 text-sm mt-1">Approve user reviews to display on the homepage.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all text-sm"
                >
                    <Star size={16} className="fill-white" />
                    <span>Add Testimonial</span>
                </button>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-secondary border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl relative">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold font-amiri text-[#D4AF37] mb-6">Add New Testimonial</h2>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newTestimonial.name}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Location</label>
                                <input
                                    required
                                    type="text"
                                    value={newTestimonial.location}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="London, UK"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Stars (1-5)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={newTestimonial.stars}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, stars: Number(e.target.value) })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Review</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newTestimonial.review}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                                    placeholder="Their experience..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-bold uppercase tracking-widest text-sm rounded-xl transition-all disabled:opacity-50"
                            >
                                {submitting ? "Saving..." : "Save Testimonial"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-premium">
                <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        />
                    </div>
                    <div className="text-white/40 text-sm flex gap-4">
                        <span>Total: {testimonials.length}</span>
                        <span>Pending: {testimonials.filter(t => !t.isApproved).length}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-white/80">
                        <thead className="text-xs uppercase bg-white/5 text-white/40">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-widest hidden md:table-cell">Date</th>
                                <th className="px-6 py-4 font-medium tracking-widest">User Details</th>
                                <th className="px-6 py-4 font-medium tracking-widest w-1/3">Review</th>
                                <th className="px-6 py-4 font-medium tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 font-medium tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                                        <div className="inline-block w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                                        No testimonials found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((t) => (
                                    <tr key={t.id} className={`hover:bg-white/5 transition-colors ${!t.isApproved ? 'bg-[#D4AF37]/5' : ''}`}>
                                        <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap text-white/40">
                                            {format(new Date(t.createdAt), "MMM d, yyyy")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-white">{t.name}</div>
                                            <div className="text-white/40 text-xs mt-1">{t.location}</div>
                                            <div className="flex gap-0.5 mt-2">
                                                {[...Array(t.stars)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="line-clamp-3 text-xs leading-relaxed italic text-white/60">"{t.review}"</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {t.isApproved ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                                                    Live
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleApproval(t.id, t.isApproved)}
                                                    className={`p-2 rounded-lg transition-all ${t.isApproved
                                                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                                        : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                                                        }`}
                                                    title={t.isApproved ? "Hide from website" : "Approve & Publish"}
                                                >
                                                    {t.isApproved ? <X size={16} /> : <Check size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => deleteTestimonial(t.id)}
                                                    className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                    title="Delete permanently"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
