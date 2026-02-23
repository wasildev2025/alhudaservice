import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@alhuda.com" },
        update: {},
        create: {
            email: "admin@alhuda.com",
            name: "Admin",
            password: hashedPassword,
            role: "ADMIN",
        },
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // Create default settings
    const existingSettings = await prisma.appSettings.findFirst();
    if (!existingSettings) {
        await prisma.appSettings.create({
            data: {
                contactPhone: "+966 xxx xxx xxxx",
                whatsappNumber: "+966 xxx xxx xxxx",
                contactEmail: "info@alhuda.com",
                workingHours: "Sun–Thu: 9 AM – 6 PM",
            },
        });
        console.log("✅ Default settings created");
    }

    // Create sample Ziyarat packages
    const samplePackages = [
        {
            name: "Makkah Full Day Ziyarat",
            city: "Makkah",
            duration: "8 hours",
            price: 250,
            currency: "SAR",
            includes: "AC Transport, Guide, Water",
            excludes: "Meals, Personal expenses",
            itinerary:
                "1. Hotel Pickup\n2. Jabal Noor\n3. Jabal Thawr\n4. Mina, Muzdalifah, Arafat\n5. Return to Hotel",
            isActive: true,
        },
        {
            name: "Madinah Half Day Ziyarat",
            city: "Madinah",
            duration: "4 hours",
            price: 150,
            currency: "SAR",
            includes: "AC Transport, Guide",
            excludes: "Meals",
            itinerary:
                "1. Hotel Pickup\n2. Masjid Quba\n3. Masjid Qiblatain\n4. Uhud Mountain\n5. Return to Hotel",
            isActive: true,
        },
        {
            name: "Taif Day Trip",
            city: "Taif",
            duration: "10 hours",
            price: 400,
            currency: "SAR",
            includes: "AC Transport, Guide, Lunch",
            excludes: "Personal expenses, Shopping",
            itinerary:
                "1. Hotel Pickup from Makkah\n2. Shubra Palace\n3. Al Hada Mountain\n4. Rose Garden\n5. Taif City Tour\n6. Return",
            isActive: true,
        },
    ];

    for (const pkg of samplePackages) {
        await prisma.ziyaratPackage.create({ data: pkg });
    }
    console.log(`✅ ${samplePackages.length} sample packages created`);

    console.log("\n🎉 Seeding complete!");
    console.log("📧 Admin login: admin@alhuda.com / admin123");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
