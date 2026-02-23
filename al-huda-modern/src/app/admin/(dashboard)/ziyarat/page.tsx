"use client";

import { useEffect, useState } from "react";
import { MapPin, RefreshCw } from "lucide-react";

interface Inquiry {
    id: string;
    fullName: string;
    mobile: string;
    whatsapp?: string;
    pickupLocation: string;
    date: string;
    persons: number;
    notes?: string;
    status: string;
    createdAt: string;
    package: { name: string; city: string };
}

const statusOptions = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    CONFIRMED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ZiyaratInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/bookings/ziyarat");
            const data = await res.json();
            if (data.success) setInquiries(data.data);
        } catch (err) {
            console.error("Error fetching inquiries:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/bookings/ziyarat/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            setInquiries((prev) =>
                prev.map((i) => (i.id === id ? { ...i, status } : i))
            );
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <MapPin className="text-[#2196F3]" /> Ziyarat Inquiries
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        {inquiries.length} total inquiries
                    </p>
                </div>
                <button
                    onClick={fetchInquiries}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/60"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            {loading ? (
                <div className="text-white/40 text-center py-12">Loading...</div>
            ) : inquiries.length === 0 ? (
                <div className="text-white/40 text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    No inquiries yet
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inq) => (
                        <div
                            key={inq.id}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-white font-semibold">{inq.fullName}</h3>
                                        <span className="text-xs bg-[#2196F3]/20 text-[#2196F3] px-2 py-1 rounded-full">
                                            {inq.package.name}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full border ${statusColors[inq.status]}`}
                                        >
                                            {inq.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                        <p className="text-white/50">
                                            📱 <span className="text-white/80">{inq.mobile}</span>
                                        </p>
                                        <p className="text-white/50">
                                            📅 <span className="text-white/80">{inq.date}</span>
                                        </p>
                                        <p className="text-white/50">
                                            👥{" "}
                                            <span className="text-white/80">
                                                {inq.persons} person(s)
                                            </span>
                                        </p>
                                        <p className="text-white/50">
                                            📍{" "}
                                            <span className="text-white/80">
                                                {inq.pickupLocation}
                                            </span>
                                        </p>
                                    </div>
                                    {inq.notes && (
                                        <p className="text-white/40 text-sm">📝 {inq.notes}</p>
                                    )}
                                    <p className="text-white/30 text-xs">
                                        {new Date(inq.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <select
                                    value={inq.status}
                                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 cursor-pointer"
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s} className="bg-[#0a1a0f]">
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
