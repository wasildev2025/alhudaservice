import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const khajoorUpdateSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(5),
    price: z.string().min(1),
    priceAmount: z.number().optional().default(0),
    currency: z.string().default("SAR"),
    unit: z.string().default("kg"),
    image: z.string().nullable().optional(),
    popular: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

// PUT – Update product (admin – protected by middleware)
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const validated = khajoorUpdateSchema.parse(body);

        const product = await prisma.khajoorProduct.update({
            where: { id },
            data: {
                name: validated.name,
                description: validated.description,
                price: validated.price,
                priceAmount: validated.priceAmount || 0,
                currency: validated.currency,
                unit: validated.unit,
                image: validated.image || null,
                popular: validated.popular,
                isActive: validated.isActive,
            },
        });
        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Update khajoor error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update product" },
            { status: 500 }
        );
    }
}

// DELETE – Delete product (admin – protected by middleware)
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.khajoorProduct.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete khajoor error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete product" },
            { status: 500 }
        );
    }
}
