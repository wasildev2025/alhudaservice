import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const khajoorSchema = z.object({
    name: z.string().min(2, "Name is required"),
    description: z.string().min(5, "Description is required"),
    price: z.string().min(1, "Price label is required"),
    priceAmount: z.number().nullable().optional(),
    currency: z.string().default("SAR"),
    unit: z.string().default("kg"),
    image: z.string().nullable().optional(),
    popular: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

// GET – List all khajoor products (public)
export async function GET() {
    try {
        const products = await prisma.khajoorProduct.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        console.error("Fetch khajoor error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// POST – Create new product (admin – protected by middleware)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = khajoorSchema.parse(body);

        const product = await prisma.khajoorProduct.create({
            data: {
                name: validated.name,
                description: validated.description,
                price: validated.price,
                priceAmount: validated.priceAmount || null,
                currency: validated.currency,
                unit: validated.unit,
                image: validated.image || null,
                popular: validated.popular,
                isActive: validated.isActive,
            },
        });
        return NextResponse.json(
            { success: true, data: product },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Create khajoor error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create product" },
            { status: 500 }
        );
    }
}
