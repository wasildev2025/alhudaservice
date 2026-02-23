"use client";

import { useEffect, useState } from "react";
import { Car, RefreshCw } from "lucide-react";

interface Booking {
    id: string;
    fullName: string;
    mobile: string;
    whatsapp?: string;
    pickupLocation: string;
    dropLocation: string;
    date: string;
    time: string;
    passengers: number;
    vehicleType?: string;
    luggage: boolean;
    notes?: string;
    status: string;
    createdAt: string;
}

const statusOptions = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    CONFIRMED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/bookings/pick-drop");
            const data = await res.json();
            if (data.success) setBookings(data.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/bookings/pick-drop/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status } : b))
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
                        <Car className="text-[#4CAF50]" /> Pick & Drop Bookings
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        {bookings.length} total bookings
                    </p>
                </div>
                <button
                    onClick={fetchBookings}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/60"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            {loading ? (
                <div className="text-white/40 text-center py-12">Loading...</div>
            ) : bookings.length === 0 ? (
                <div className="text-white/40 text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    No bookings found
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-white font-semibold">
                                            {booking.fullName}
                                        </h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full border ${statusColors[booking.status]}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                        <p className="text-white/50">
                                            📱 <span className="text-white/80">{booking.mobile}</span>
                                        </p>
                                        {booking.whatsapp && (
                                            <p className="text-white/50">
                                                💬{" "}
                                                <span className="text-white/80">
                                                    {booking.whatsapp}
                                                </span>
                                            </p>
                                        )}
                                        <p className="text-white/50">
                                            📍{" "}
                                            <span className="text-white/80">
                                                {booking.pickupLocation}
                                            </span>
                                        </p>
                                        <p className="text-white/50">
                                            🎯{" "}
                                            <span className="text-white/80">
                                                {booking.dropLocation}
                                            </span>
                                        </p>
                                        <p className="text-white/50">
                                            📅 <span className="text-white/80">{booking.date}</span> –{" "}
                                            {booking.time}
                                        </p>
                                        <p className="text-white/50">
                                            👥{" "}
                                            <span className="text-white/80">
                                                {booking.passengers} passenger(s)
                                            </span>
                                        </p>
                                        {booking.vehicleType && (
                                            <p className="text-white/50">
                                                🚗{" "}
                                                <span className="text-white/80">
                                                    {booking.vehicleType}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                    {booking.notes && (
                                        <p className="text-white/40 text-sm mt-2">
                                            📝 {booking.notes}
                                        </p>
                                    )}
                                    <p className="text-white/30 text-xs">
                                        {new Date(booking.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* Status selector */}
                                <div className="flex-shrink-0">
                                    <select
                                        value={booking.status}
                                        onChange={(e) => updateStatus(booking.id, e.target.value)}
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
