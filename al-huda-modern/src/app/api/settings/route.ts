import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET – Fetch settings (returns the first/only row)
export async function GET() {
    try {
        const settings = await prisma.appSettings.findFirst();
        return NextResponse.json({ success: true, data: settings });
    } catch (error) {
        console.error("Fetch settings error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

// POST – Create or update settings
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { contactPhone, whatsappNumber, contactEmail, workingHours, featuredItems } = body;

        // Upsert – find existing or create new
        const existing = await prisma.appSettings.findFirst();

        let settings;
        if (existing) {
            settings = await prisma.appSettings.update({
                where: { id: existing.id },
                data: { contactPhone, whatsappNumber, contactEmail, workingHours, featuredItems },
            });
        } else {
            settings = await prisma.appSettings.create({
                data: { contactPhone, whatsappNumber, contactEmail, workingHours, featuredItems },
            });
        }

        return NextResponse.json({ success: true, data: settings });
    } catch (error) {
        console.error("Save settings error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save settings" },
            { status: 500 }
        );
    }
}
