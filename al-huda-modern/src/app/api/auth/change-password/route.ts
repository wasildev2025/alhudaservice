import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

// POST – Change password (admin only – also protected by middleware)
export async function POST(req: NextRequest) {
    try {
        // Get current session
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { currentPassword, newPassword } = await req.json();

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, message: "Both current and new passwords are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { success: false, message: "New password must be at least 8 characters" },
                { status: 400 }
            );
        }

        // Password complexity: at least 1 uppercase, 1 lowercase, 1 number
        const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!complexityRegex.test(newPassword)) {
            return NextResponse.json(
                { success: false, message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number" },
                { status: 400 }
            );
        }

        // Fetch user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: "Current password is incorrect" },
                { status: 403 }
            );
        }

        // Prevent reusing the same password
        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            return NextResponse.json(
                { success: false, message: "New password must be different from the current one" },
                { status: 400 }
            );
        }

        // Hash and save
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to change password" },
            { status: 500 }
        );
    }
}
