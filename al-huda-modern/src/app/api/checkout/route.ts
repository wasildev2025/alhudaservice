import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const checkoutSchema = z.object({
    customerDetails: z.object({
        fullName: z.string().min(2, "Full name required"),
        mobile: z.string().min(8, "Valid mobile number required"),
        whatsapp: z.string().optional(),
        pickupLocation: z.string().optional(),
        deliveryCity: z.string().optional(),
        date: z.string().optional(),
    }),
    items: z.array(z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(['PACKAGE', 'KHAJOOR', 'PICK_DROP']),
        quantity: z.number().min(1),
        price: z.number()
    })).min(1, "Cart cannot be empty")
});

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();

        // 1. Strict Input Validation
        const validated = checkoutSchema.parse(body);
        const { items, customerDetails } = validated;

        // 2. Database Transaction for Data Integrity
        const transactionOps = [];

        // Process Packages
        const packages = items.filter((i) => i.type === 'PACKAGE');
        for (const pkg of packages) {
            transactionOps.push(
                prisma.packageInquiry.create({
                    data: {
                        packageId: pkg.id,
                        fullName: customerDetails.fullName,
                        mobile: customerDetails.mobile,
                        whatsapp: customerDetails.whatsapp || null,
                        pickupLocation: customerDetails.pickupLocation || 'TBD',
                        date: customerDetails.date || new Date().toISOString(),
                        persons: pkg.quantity,
                        status: 'PENDING',
                        ...(session?.user?.id ? { userId: session.user.id } : {}),
                    }
                })
            );
        }

        // Process Khajoor (Dates)
        const khajoor = items.filter((i) => i.type === 'KHAJOOR');
        for (const item of khajoor) {
            transactionOps.push(
                prisma.khajoorInquiry.create({
                    data: {
                        fullName: customerDetails.fullName,
                        mobile: customerDetails.mobile,
                        whatsapp: customerDetails.whatsapp || null,
                        requiredType: item.name,
                        quantity: `${item.quantity} kg`,
                        deliveryCity: customerDetails.deliveryCity || 'TBD',
                        status: 'PENDING'
                    }
                })
            );
        }

        // Execute all creations atomically
        if (transactionOps.length > 0) {
            await prisma.$transaction(transactionOps);
        }

        // 3. Prepare for Payment Gateway
        // TODO: Integrate Stripe webhook, idempotency key handling, and session generation.
        // Currently bypassing to success for Phase 2 scoping.

        return NextResponse.json({ success: true, message: 'Order created successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        console.error('Checkout API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
