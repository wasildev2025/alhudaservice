import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH – Update inquiry status
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        const booking = await prisma.packageInquiry.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({ success: true, data: booking });
    } catch (error) {
        console.error("Update inquiry status error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update status" },
            { status: 500 }
        );
    }
}
