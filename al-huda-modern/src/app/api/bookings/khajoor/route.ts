import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail, khajoorInquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const khajoorSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    mobile: z.string().min(5, "Mobile is required"),
    whatsapp: z.string().optional(),
    requiredType: z.string().min(1, "Type is required"),
    quantity: z.string().min(1, "Quantity is required"),
    deliveryCity: z.string().min(1, "Delivery city is required"),
    notes: z.string().max(2000).optional(),
});

// POST – Create new khajoor inquiry
export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        const limited = rateLimit(`khajoor-inq:${ip}`, { limit: 5, windowSeconds: 60 });
        if (limited) {
            return NextResponse.json(
                { success: false, message: `Too many requests. Try again in ${limited.retryAfter}s.` },
                { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
            );
        }

        const body = await req.json();
        const validated = khajoorSchema.parse(body);

        const inquiry = await prisma.khajoorInquiry.create({
            data: validated,
        });

        // Send admin notification
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
            sendEmail({
                to: adminEmail,
                subject: `New Khajoor Inquiry – ${validated.fullName}`,
                html: khajoorInquiryEmail(validated),
            }).catch(console.error);
        }

        return NextResponse.json(
            { success: true, message: "Inquiry submitted successfully!", id: inquiry.id },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Khajoor inquiry error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

// GET – List khajoor inquiries
export async function GET() {
    try {
        const inquiries = await prisma.khajoorInquiry.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: inquiries });
    } catch (error) {
        console.error("Fetch khajoor inquiries error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch inquiries" },
            { status: 500 }
        );
    }
}
