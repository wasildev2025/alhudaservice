import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const testimonialSchema = z.object({
    name: z.string().min(2, "Name is required").max(50),
    location: z.string().min(2, "Location is required").max(50),
    review: z.string().min(10, "Review is too short").max(500, "Review is too long"),
    stars: z.number().min(1).max(5).default(5),
});

// GET – Fetch only APPROVED testimonials for the homepage
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { isApproved: true },
            orderBy: { createdAt: "desc" },
            take: 9, // max 9 testimonials on homepage
        });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error) {
        console.error("Fetch testimonials error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}

// POST – Submit a new testimonial (Public - unapproved by default)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = testimonialSchema.parse(body);

        const testimonial = await prisma.testimonial.create({
            data: {
                name: validated.name,
                location: validated.location,
                review: validated.review,
                stars: validated.stars,
                isApproved: false, // Requires admin approval
            },
        });

        return NextResponse.json(
            { success: true, message: "Testimonial submitted successfully and is pending approval.", id: testimonial.id },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Submit testimonial error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
