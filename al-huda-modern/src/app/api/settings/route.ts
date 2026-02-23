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

        // All saveable fields
        const data = {
            contactPhone: body.contactPhone ?? null,
            whatsappNumber: body.whatsappNumber ?? null,
            contactEmail: body.contactEmail ?? null,
            workingHours: body.workingHours ?? null,
            featuredItems: body.featuredItems ?? null,
            siteTitle: body.siteTitle ?? null,
            siteDescription: body.siteDescription ?? null,
            sallaStoreUrl: body.sallaStoreUrl ?? null,
            sallaBooksUrl: body.sallaBooksUrl ?? null,
            sallaDatesUrl: body.sallaDatesUrl ?? null,
            sallaDonationsUrl: body.sallaDonationsUrl ?? null,
            facebookUrl: body.facebookUrl ?? null,
            instagramUrl: body.instagramUrl ?? null,
            twitterUrl: body.twitterUrl ?? null,
            tiktokUrl: body.tiktokUrl ?? null,
            statCustomers: body.statCustomers ?? "10,000+",
            statZiyarats: body.statZiyarats ?? "500+",
            statYears: body.statYears ?? "10+",
        };

        // Upsert – find existing or create new
        const existing = await prisma.appSettings.findFirst();

        let settings;
        if (existing) {
            settings = await prisma.appSettings.update({
                where: { id: existing.id },
                data,
            });
        } else {
            settings = await prisma.appSettings.create({ data });
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
