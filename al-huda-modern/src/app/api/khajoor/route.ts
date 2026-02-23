import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

// POST – Create new product (admin)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const product = await prisma.khajoorProduct.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                image: body.image || null,
                popular: body.popular || false,
                isActive: body.isActive !== false,
            },
        });
        return NextResponse.json(
            { success: true, data: product },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create khajoor error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create product" },
            { status: 500 }
        );
    }
}
