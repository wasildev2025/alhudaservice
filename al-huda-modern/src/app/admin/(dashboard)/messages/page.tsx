"use client";

import { useEffect, useState } from "react";
import { MessageSquare, RefreshCw, Eye, CheckCheck, Filter } from "lucide-react";

interface Message {
    id: string;
    name: string;
    emailOrPhone: string;
    message: string;
    category: string;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    UNREAD: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    READ: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    REPLIED: "bg-green-500/20 text-green-400 border-green-500/30",
};

const categoryColors: Record<string, string> = {
    General: "bg-gray-500/20 text-gray-300",
    Donation: "bg-purple-500/20 text-purple-400",
    "Ziyarat Custom": "bg-blue-500/20 text-blue-400",
    Feedback: "bg-cyan-500/20 text-cyan-400",
};

function detectCategory(msg: string): string {
    if (msg.startsWith("[Donation")) return "Donation";
    if (msg.startsWith("[Custom Ziyarat")) return "Ziyarat Custom";
    if (msg.startsWith("[Ziyarat Inquiry]")) return "Ziyarat Custom";
    return "General";
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>("ALL");
    const [filterCategory, setFilterCategory] = useState<string>("ALL");
    const [page, setPage] = useState(1);
    const perPage = 20;

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (data.success) {
                // Auto-detect categories for messages that don't have one yet
                setMessages(data.data.map((m: Message) => ({
                    ...m,
                    category: m.category && m.category !== "General" ? m.category : detectCategory(m.message),
                })));
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchMessages(); }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    // Filter + paginate
    const filtered = messages.filter((m) => {
        if (filterStatus !== "ALL" && m.status !== filterStatus) return false;
        if (filterCategory !== "ALL" && m.category !== filterCategory) return false;
        return true;
    });
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const categories = [...new Set(messages.map((m) => m.category))];
    const statusCounts = {
        ALL: messages.length,
        UNREAD: messages.filter((m) => m.status === "UNREAD").length,
        READ: messages.filter((m) => m.status === "READ").length,
        REPLIED: messages.filter((m) => m.status === "REPLIED").length,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <MessageSquare className="text-[#9C27B0]" /> Inquiries & Messages
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        {messages.length} total • {statusCounts.UNREAD} unread
                    </p>
                </div>
                <button
                    onClick={fetchMessages}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/60"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
                {(["ALL", "UNREAD", "READ", "REPLIED"] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => { setFilterStatus(status); setPage(1); }}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filterStatus === status
                            ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                            : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
                        <span className="ml-2 opacity-60">({statusCounts[status]})</span>
                    </button>
                ))}
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                    <Filter size={14} className="text-white/30" />
                    <button
                        onClick={() => { setFilterCategory("ALL"); setPage(1); }}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${filterCategory === "ALL" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
                    >All Types</button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setFilterCategory(cat); setPage(1); }}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${filterCategory === cat ? (categoryColors[cat] || "bg-white/10 text-white") : "text-white/40 hover:text-white/60"}`}
                        >{cat}</button>
                    ))}
                </div>
            )}

            {loading ? (
                <div className="text-white/40 text-center py-12">Loading...</div>
            ) : paginated.length === 0 ? (
                <div className="text-white/40 text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    {filtered.length === 0 && messages.length > 0 ? "No messages match the current filter" : "No messages yet"}
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {paginated.map((msg) => (
                            <div
                                key={msg.id}
                                className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-5 transition-all ${msg.status === "UNREAD"
                                    ? "border-yellow-500/20 bg-yellow-500/[0.03]"
                                    : "border-white/10"
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-white font-semibold">{msg.name}</h3>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${categoryColors[msg.category] || categoryColors.General}`}>
                                                {msg.category}
                                            </span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[msg.status]}`}>
                                                {msg.status}
                                            </span>
                                        </div>
                                        <p className="text-white/50 text-sm">
                                            📞 <span className="text-white/80">{msg.emailOrPhone}</span>
                                        </p>
                                        <p className="text-white/70 text-sm bg-white/5 rounded-xl p-3 mt-2">
                                            {msg.message}
                                        </p>
                                        <p className="text-white/30 text-xs">
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        {msg.status === "UNREAD" && (
                                            <button onClick={() => updateStatus(msg.id, "READ")} className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all text-blue-400" title="Mark as Read">
                                                <Eye size={16} />
                                            </button>
                                        )}
                                        {msg.status !== "REPLIED" && (
                                            <button onClick={() => updateStatus(msg.id, "REPLIED")} className="p-2 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all text-green-400" title="Mark as Replied">
                                                <CheckCheck size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm disabled:opacity-30 hover:bg-white/10 transition-all">← Prev</button>
                            <span className="text-white/40 text-sm px-4">Page {page} of {totalPages}</span>
                            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm disabled:opacity-30 hover:bg-white/10 transition-all">Next →</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
