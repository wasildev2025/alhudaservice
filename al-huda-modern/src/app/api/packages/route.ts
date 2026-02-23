import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const packageSchema = z.object({
    name: z.string().min(2),
    city: z.string().min(2),
    duration: z.string().min(1),
    price: z.number().min(0),
    currency: z.string().default("SAR"),
    includes: z.string().min(1),
    excludes: z.string().min(1),
    itinerary: z.string().min(1),
    pickupRules: z.string().optional(),
    images: z.string().optional(),
    availability: z.string().optional(),
    isActive: z.boolean().default(true),
});

// GET – List all packages (public)
export async function GET() {
    try {
        const packages = await prisma.ziyaratPackage.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: packages });
    } catch (error) {
        console.error("Fetch packages error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch packages" },
            { status: 500 }
        );
    }
}

// POST – Create new package (admin only)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = packageSchema.parse(body);

        const pkg = await prisma.ziyaratPackage.create({
            data: validated,
        });

        return NextResponse.json(
            { success: true, message: "Package created!", data: pkg },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Create package error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create package" },
            { status: 500 }
        );
    }
}
