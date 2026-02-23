import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/admin/login");
    }

    // Check for ADMIN role
    const user = session.user as { role?: string };
    if (user.role !== "ADMIN") {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#0a1a0f] flex">
            <AdminSidebar user={session.user} />
            <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
                <div className="p-4 md:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
