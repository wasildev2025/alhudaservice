import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT – Update product
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const product = await prisma.khajoorProduct.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                image: body.image || null,
                popular: body.popular || false,
                isActive: body.isActive !== false,
            },
        });
        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        console.error("Update khajoor error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update product" },
            { status: 500 }
        );
    }
}

// DELETE – Delete product
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
