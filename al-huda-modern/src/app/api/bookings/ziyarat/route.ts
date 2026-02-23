import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail, packageInquiryEmail } from "@/lib/email";

const inquirySchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    mobile: z.string().min(5, "Mobile is required"),
    whatsapp: z.string().optional(),
    pickupLocation: z.string().min(2, "Pickup location is required"),
    date: z.string().min(1, "Date is required"),
    persons: z.number().min(1, "At least 1 person"),
    notes: z.string().optional(),
    packageId: z.string().min(1, "Package is required"),
});

// POST – Create new package inquiry
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = inquirySchema.parse(body);

        // Verify package exists
        const pkg = await prisma.ziyaratPackage.findUnique({
            where: { id: validated.packageId },
        });
        if (!pkg) {
            return NextResponse.json(
                { success: false, message: "Package not found" },
                { status: 404 }
            );
        }

        const inquiry = await prisma.packageInquiry.create({
            data: validated,
        });

        // Send admin notification
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
            sendEmail({
                to: adminEmail,
                subject: `New Ziyarat Inquiry – ${validated.fullName} – ${pkg.name}`,
                html: packageInquiryEmail({ ...validated, packageName: pkg.name }),
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
        console.error("Package inquiry error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

// GET – List inquiries
export async function GET() {
    try {
        const inquiries = await prisma.packageInquiry.findMany({
            include: { package: { select: { name: true, city: true } } },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: inquiries });
    } catch (error) {
        console.error("Fetch inquiries error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch inquiries" },
            { status: 500 }
        );
    }
}
