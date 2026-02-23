import { prisma } from "@/lib/prisma";
import { Car, MapPin, TreePalm, MessageSquare } from "lucide-react";

async function getStats() {
    const [bookings, ziyaratInquiries, khajoorInquiries, messages] =
        await Promise.all([
            prisma.pickDropBooking.count(),
            prisma.packageInquiry.count(),
            prisma.khajoorInquiry.count(),
            prisma.contactMessage.count(),
        ]);

    const [pendingBookings, unreadMessages] = await Promise.all([
        prisma.pickDropBooking.count({ where: { status: "PENDING" } }),
        prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    ]);

    return {
        bookings,
        ziyaratInquiries,
        khajoorInquiries,
        messages,
        pendingBookings,
        unreadMessages,
    };
}

async function getRecentActivity() {
    const [recentBookings, recentInquiries] = await Promise.all([
        prisma.pickDropBooking.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                fullName: true,
                pickupLocation: true,
                dropLocation: true,
                status: true,
                createdAt: true,
            },
        }),
        prisma.packageInquiry.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { package: { select: { name: true } } },
        }),
    ]);
    return { recentBookings, recentInquiries };
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const { recentBookings, recentInquiries } = await getRecentActivity();

    const statCards = [
        {
            label: "Pick & Drop",
            value: stats.bookings,
            pending: stats.pendingBookings,
            icon: Car,
            color: "#4CAF50",
        },
        {
            label: "Ziyarat Inquiries",
            value: stats.ziyaratInquiries,
            icon: MapPin,
            color: "#2196F3",
        },
        {
            label: "Khajoor Inquiries",
            value: stats.khajoorInquiries,
            icon: TreePalm,
            color: "#D4AF37",
        },
        {
            label: "Messages",
            value: stats.messages,
            pending: stats.unreadMessages,
            icon: MessageSquare,
            color: "#9C27B0",
        },
    ];

    const statusColor: Record<string, string> = {
        PENDING: "bg-yellow-500/20 text-yellow-400",
        CONFIRMED: "bg-blue-500/20 text-blue-400",
        COMPLETED: "bg-green-500/20 text-green-400",
        CANCELLED: "bg-red-500/20 text-red-400",
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-white/50 mt-1">Overview of all services</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${card.color}20` }}
                            >
                                <card.icon size={20} style={{ color: card.color }} />
                            </div>
                            {card.pending !== undefined && card.pending > 0 && (
                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                                    {card.pending} pending
                                </span>
                            )}
                        </div>
                        <p className="text-3xl font-bold text-white">{card.value}</p>
                        <p className="text-white/50 text-sm mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Recent Pick & Drop Bookings
                    </h2>
                    {recentBookings.length === 0 ? (
                        <p className="text-white/40 text-sm">No bookings yet</p>
                    ) : (
                        <div className="space-y-3">
                            {recentBookings.map((b) => (
                                <div
                                    key={b.id}
                                    className="flex items-center justify-between bg-white/5 rounded-xl p-3"
                                >
                                    <div>
                                        <p className="text-white text-sm font-medium">
                                            {b.fullName}
                                        </p>
                                        <p className="text-white/40 text-xs">
                                            {b.pickupLocation} → {b.dropLocation}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${statusColor[b.status] || "bg-gray-500/20 text-gray-400"}`}
                                    >
                                        {b.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Ziyarat Inquiries */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Recent Ziyarat Inquiries
                    </h2>
                    {recentInquiries.length === 0 ? (
                        <p className="text-white/40 text-sm">No inquiries yet</p>
                    ) : (
                        <div className="space-y-3">
                            {recentInquiries.map((inq) => (
                                <div
                                    key={inq.id}
                                    className="flex items-center justify-between bg-white/5 rounded-xl p-3"
                                >
                                    <div>
                                        <p className="text-white text-sm font-medium">
                                            {inq.fullName}
                                        </p>
                                        <p className="text-white/40 text-xs">
                                            {inq.package.name} – {inq.persons} person(s)
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${statusColor[inq.status] || "bg-gray-500/20 text-gray-400"}`}
                                    >
                                        {inq.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
