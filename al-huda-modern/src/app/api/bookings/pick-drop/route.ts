import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail, bookingNotificationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const bookingSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    mobile: z.string().min(5, "Mobile is required"),
    whatsapp: z.string().optional(),
    pickupLocation: z.string().min(2, "Pickup location is required"),
    dropLocation: z.string().min(2, "Drop location is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    passengers: z.number().min(1, "At least 1 passenger"),
    vehicleType: z.string().optional(),
    luggage: z.boolean().optional().default(false),
    notes: z.string().max(2000).optional(),
});

// POST – Create new booking
export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        const limited = rateLimit(`pickup:${ip}`, { limit: 5, windowSeconds: 60 });
        if (limited) {
            return NextResponse.json(
                { success: false, message: `Too many requests. Try again in ${limited.retryAfter}s.` },
                { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
            );
        }

        const body = await req.json();
        const validated = bookingSchema.parse(body);

        const booking = await prisma.pickDropBooking.create({
            data: validated,
        });

        // Send admin notification email (non-blocking)
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
            sendEmail({
                to: adminEmail,
                subject: `New Pick & Drop Booking – ${validated.fullName}`,
                html: bookingNotificationEmail(validated),
            }).catch(console.error);
        }

        return NextResponse.json(
            { success: true, message: "Booking request received!", id: booking.id },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Booking error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

// GET – List bookings (admin only, will be protected later)
export async function GET() {
    try {
        const bookings = await prisma.pickDropBooking.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: bookings });
    } catch (error) {
        console.error("Fetch bookings error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
