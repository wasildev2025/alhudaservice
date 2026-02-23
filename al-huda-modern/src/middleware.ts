import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// ─── Public API routes (no auth required) ───────────────────
const PUBLIC_API_PATTERNS = [
    { path: "/api/packages", methods: ["GET"] },
    { path: "/api/khajoor", methods: ["GET"] },
    { path: "/api/settings", methods: ["GET"] },
    { path: "/api/contact", methods: ["POST"] },
    { path: "/api/bookings/pick-drop", methods: ["POST"] },
    { path: "/api/bookings/khajoor", methods: ["POST"] },
    { path: "/api/bookings/ziyarat", methods: ["POST"] },
    { path: "/api/auth", methods: ["GET", "POST"] },
];

function isPublicApiRoute(pathname: string, method: string): boolean {
    return PUBLIC_API_PATTERNS.some((pattern) => {
        const pathMatch =
            pathname === pattern.path || pathname.startsWith(pattern.path + "/");
        return pathMatch && pattern.methods.includes(method);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
    const { pathname } = req.nextUrl;
    const method = req.method;

    // Only protect /api/ routes
    if (!pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    // Allow public API routes
    if (isPublicApiRoute(pathname, method)) {
        return NextResponse.next();
    }

    // Everything else requires ADMIN session
    const session = req.auth;

    if (!session?.user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized – please log in" },
            { status: 401 }
        );
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json(
            { success: false, message: "Forbidden – admin access required" },
            { status: 403 }
        );
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/api/:path*"],
};
