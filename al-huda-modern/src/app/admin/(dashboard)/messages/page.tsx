"use client";

import { useEffect, useState } from "react";
import { MessageSquare, RefreshCw, Eye, CheckCheck } from "lucide-react";

interface Message {
    id: string;
    name: string;
    emailOrPhone: string;
    message: string;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    UNREAD: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    READ: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    REPLIED: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (data.success) setMessages(data.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, status } : m))
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
                        <MessageSquare className="text-[#9C27B0]" /> Contact Messages
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        {messages.length} total messages
                    </p>
                </div>
                <button
                    onClick={fetchMessages}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/60"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            {loading ? (
                <div className="text-white/40 text-center py-12">Loading...</div>
            ) : messages.length === 0 ? (
                <div className="text-white/40 text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    No messages yet
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-5 transition-all ${msg.status === "UNREAD"
                                    ? "border-yellow-500/20 bg-yellow-500/[0.03]"
                                    : "border-white/10"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-white font-semibold">{msg.name}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full border ${statusColors[msg.status]}`}
                                        >
                                            {msg.status}
                                        </span>
                                    </div>
                                    <p className="text-white/50 text-sm">
                                        📞{" "}
                                        <span className="text-white/80">{msg.emailOrPhone}</span>
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
                                        <button
                                            onClick={() => updateStatus(msg.id, "READ")}
                                            className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all text-blue-400"
                                            title="Mark as Read"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    )}
                                    {msg.status !== "REPLIED" && (
                                        <button
                                            onClick={() => updateStatus(msg.id, "REPLIED")}
                                            className="p-2 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all text-green-400"
                                            title="Mark as Replied"
                                        >
                                            <CheckCheck size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
