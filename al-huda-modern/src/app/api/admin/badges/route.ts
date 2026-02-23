import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET – Badge counts for admin sidebar
export async function GET() {
    try {
        const [pendingBookings, unreadMessages] = await Promise.all([
            prisma.pickDropBooking.count({ where: { status: "PENDING" } }),
            prisma.contactMessage.count({ where: { status: "UNREAD" } }),
        ]);

        return NextResponse.json({
            success: true,
            data: { pendingBookings, unreadMessages },
        });
    } catch (error) {
        console.error("Badge count error:", error);
        return NextResponse.json(
            { success: false, data: { pendingBookings: 0, unreadMessages: 0 } },
        );
    }
}
