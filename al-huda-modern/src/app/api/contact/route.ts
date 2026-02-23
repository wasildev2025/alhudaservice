import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail, contactMessageEmail } from "@/lib/email";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    emailOrPhone: z.string().min(3, "Email or phone is required"),
    message: z.string().min(5, "Message is required"),
});

// POST – Submit contact message
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = contactSchema.parse(body);

        const msg = await prisma.contactMessage.create({
            data: validated,
        });

        // Send admin notification
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
            sendEmail({
                to: adminEmail,
                subject: `New Contact Message – ${validated.name}`,
                html: contactMessageEmail(validated),
            }).catch(console.error);
        }

        return NextResponse.json(
            { success: true, message: "Message sent successfully!", id: msg.id },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Contact message error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

// GET – List messages
export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        console.error("Fetch messages error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
