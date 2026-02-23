import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET – Fetch ALL testimonials (Admin only — protected by middleware)
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error) {
        console.error("Fetch all testimonials error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}

// POST - Create a new testimonial directly as an admin (auto-approved)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const testimonial = await prisma.testimonial.create({
            data: {
                name: body.name,
                location: body.location,
                review: body.review,
                stars: Number(body.stars) || 5,
                isApproved: true, // admin created, so auto-approve
            }
        });

        return NextResponse.json({ success: true, data: testimonial });
    } catch (error) {
        console.error("Create testimonial error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create testimonial" },
            { status: 500 }
        );
    }
}
