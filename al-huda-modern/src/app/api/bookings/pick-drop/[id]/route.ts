import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH – Update booking status
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        const booking = await prisma.pickDropBooking.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({ success: true, data: booking });
    } catch (error) {
        console.error("Update booking status error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update status" },
            { status: 500 }
        );
    }
}
