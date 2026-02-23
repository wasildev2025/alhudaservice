import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH – Toggle approval status (Admin only)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { isApproved } = await req.json();
        const { id } = await params;

        const updated = await prisma.testimonial.update({
            where: { id },
            data: { isApproved },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Update testimonial error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update testimonial status" },
            { status: 500 }
        );
    }
}

// DELETE – Remove a testimonial (Admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.testimonial.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Testimonial deleted" });
    } catch (error) {
        console.error("Delete testimonial error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete testimonial" },
            { status: 500 }
        );
    }
}
