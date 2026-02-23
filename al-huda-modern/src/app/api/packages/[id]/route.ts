import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
    name: z.string().min(2).optional(),
    city: z.string().min(2).optional(),
    duration: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    currency: z.string().optional(),
    includes: z.string().optional(),
    excludes: z.string().optional(),
    itinerary: z.string().optional(),
    pickupRules: z.string().optional(),
    images: z.string().optional(),
    availability: z.string().optional(),
    isActive: z.boolean().optional(),
});

// GET – Single package
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pkg = await prisma.ziyaratPackage.findUnique({ where: { id } });
        if (!pkg) {
            return NextResponse.json(
                { success: false, message: "Package not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: pkg });
    } catch (error) {
        console.error("Fetch package error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch package" },
            { status: 500 }
        );
    }
}

// PUT – Update package
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const validated = updateSchema.parse(body);

        const pkg = await prisma.ziyaratPackage.update({
            where: { id },
            data: validated,
        });

        return NextResponse.json({ success: true, data: pkg });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Update package error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update package" },
            { status: 500 }
        );
    }
}

// DELETE – Delete package
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.ziyaratPackage.delete({ where: { id } });
        return NextResponse.json({ success: true, message: "Package deleted" });
    } catch (error) {
        console.error("Delete package error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete package" },
            { status: 500 }
        );
    }
}
