import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH – Update message status (UNREAD → READ → REPLIED)
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        const validStatuses = ["UNREAD", "READ", "REPLIED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        const msg = await prisma.contactMessage.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({ success: true, data: msg });
    } catch (error) {
        console.error("Update message status error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update status" },
            { status: 500 }
        );
    }
}
