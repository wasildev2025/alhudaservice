-- ============================================================
-- Al-Huda Services – Full Database Schema + Dummy Data
-- ============================================================
-- Import this file via phpMyAdmin → Import → Choose File
-- Compatible with MySQL 5.7+ / MariaDB 10.3+
--
-- DEFAULT ADMIN CREDENTIALS:
--   Email:    admin@alhuda.com
--   Password: Admin@123
--
-- ⚠ CHANGE THE PASSWORD AFTER FIRST LOGIN!
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- ─── Create Database (if not exists) ──────────────────────────
CREATE DATABASE IF NOT EXISTS `alhuda_db`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `alhuda_db`;

-- ============================================================
-- TABLE: User (Auth.js / NextAuth v5)
-- ============================================================
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) DEFAULT NULL,
  `email` VARCHAR(191) NOT NULL,
  `emailVerified` DATETIME(3) DEFAULT NULL,
  `image` VARCHAR(191) DEFAULT NULL,
  `password` VARCHAR(191) DEFAULT NULL,
  `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: Account (OAuth / Social Login)
-- ============================================================
CREATE TABLE IF NOT EXISTS `Account` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `provider` VARCHAR(191) NOT NULL,
  `providerAccountId` VARCHAR(191) NOT NULL,
  `refresh_token` TEXT DEFAULT NULL,
  `access_token` TEXT DEFAULT NULL,
  `expires_at` INT DEFAULT NULL,
  `token_type` VARCHAR(191) DEFAULT NULL,
  `scope` VARCHAR(191) DEFAULT NULL,
  `id_token` TEXT DEFAULT NULL,
  `session_state` VARCHAR(191) DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`, `providerAccountId`),
  KEY `Account_userId_fkey` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: Session
-- ============================================================
CREATE TABLE IF NOT EXISTS `Session` (
  `id` VARCHAR(191) NOT NULL,
  `sessionToken` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: VerificationToken
-- ============================================================
CREATE TABLE IF NOT EXISTS `VerificationToken` (
  `identifier` VARCHAR(191) NOT NULL,
  `token` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`identifier`, `token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: ZiyaratPackage
-- ============================================================
CREATE TABLE IF NOT EXISTS `ZiyaratPackage` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,
  `duration` VARCHAR(191) NOT NULL,
  `price` DOUBLE NOT NULL,
  `currency` VARCHAR(191) NOT NULL DEFAULT 'SAR',
  `includes` TEXT NOT NULL,
  `excludes` TEXT NOT NULL,
  `itinerary` TEXT NOT NULL,
  `pickupRules` TEXT DEFAULT NULL,
  `images` TEXT DEFAULT NULL,
  `availability` VARCHAR(191) DEFAULT NULL,
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: PickDropBooking
-- ============================================================
CREATE TABLE IF NOT EXISTS `PickDropBooking` (
  `id` VARCHAR(191) NOT NULL,
  `fullName` VARCHAR(191) NOT NULL,
  `mobile` VARCHAR(191) NOT NULL,
  `whatsapp` VARCHAR(191) DEFAULT NULL,
  `pickupLocation` VARCHAR(191) NOT NULL,
  `dropLocation` VARCHAR(191) NOT NULL,
  `date` VARCHAR(191) NOT NULL,
  `time` VARCHAR(191) NOT NULL,
  `passengers` INT NOT NULL,
  `vehicleType` VARCHAR(191) DEFAULT NULL,
  `luggage` TINYINT(1) NOT NULL DEFAULT 0,
  `notes` TEXT DEFAULT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: PackageInquiry
-- ============================================================
CREATE TABLE IF NOT EXISTS `PackageInquiry` (
  `id` VARCHAR(191) NOT NULL,
  `fullName` VARCHAR(191) NOT NULL,
  `mobile` VARCHAR(191) NOT NULL,
  `whatsapp` VARCHAR(191) DEFAULT NULL,
  `pickupLocation` VARCHAR(191) NOT NULL,
  `date` VARCHAR(191) NOT NULL,
  `persons` INT NOT NULL,
  `notes` TEXT DEFAULT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
  `packageId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PackageInquiry_packageId_fkey` (`packageId`),
  CONSTRAINT `PackageInquiry_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `ZiyaratPackage`(`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: KhajoorProduct
-- ============================================================
CREATE TABLE IF NOT EXISTS `KhajoorProduct` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `price` VARCHAR(191) NOT NULL,
  `image` VARCHAR(191) DEFAULT NULL,
  `popular` TINYINT(1) NOT NULL DEFAULT 0,
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: KhajoorInquiry
-- ============================================================
CREATE TABLE IF NOT EXISTS `KhajoorInquiry` (
  `id` VARCHAR(191) NOT NULL,
  `fullName` VARCHAR(191) NOT NULL,
  `mobile` VARCHAR(191) NOT NULL,
  `whatsapp` VARCHAR(191) DEFAULT NULL,
  `requiredType` VARCHAR(191) NOT NULL,
  `quantity` VARCHAR(191) NOT NULL,
  `deliveryCity` VARCHAR(191) NOT NULL,
  `notes` TEXT DEFAULT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: ContactMessage
-- ============================================================
CREATE TABLE IF NOT EXISTS `ContactMessage` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `emailOrPhone` VARCHAR(191) NOT NULL,
  `message` TEXT NOT NULL,
  `category` VARCHAR(191) NOT NULL DEFAULT 'General',
  `status` VARCHAR(191) NOT NULL DEFAULT 'UNREAD',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: AppSettings (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS `AppSettings` (
  `id` VARCHAR(191) NOT NULL,
  `contactPhone` VARCHAR(191) DEFAULT NULL,
  `whatsappNumber` VARCHAR(191) DEFAULT NULL,
  `contactEmail` VARCHAR(191) DEFAULT NULL,
  `workingHours` VARCHAR(191) DEFAULT NULL,
  `featuredItems` TEXT DEFAULT NULL,
  `siteTitle` VARCHAR(191) DEFAULT NULL,
  `siteDescription` TEXT DEFAULT NULL,
  `sallaStoreUrl` VARCHAR(191) DEFAULT NULL,
  `sallaBooksUrl` VARCHAR(191) DEFAULT NULL,
  `sallaDatesUrl` VARCHAR(191) DEFAULT NULL,
  `sallaDonationsUrl` VARCHAR(191) DEFAULT NULL,
  `facebookUrl` VARCHAR(191) DEFAULT NULL,
  `instagramUrl` VARCHAR(191) DEFAULT NULL,
  `twitterUrl` VARCHAR(191) DEFAULT NULL,
  `tiktokUrl` VARCHAR(191) DEFAULT NULL,
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- ██████  DUMMY DATA  ████████████████████████████████████████
-- ============================================================

-- ─── Default Admin User ──────────────────────────────────────
-- Email:    admin@alhuda.com
-- Password: Admin@123  (bcrypt hashed)
INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('cm_admin_001', 'Al-Huda Admin', 'admin@alhuda.com', '$2a$10$ODBjehxJIevM7TSUh4oFVuFSnzpp8jU3DnNicGpv4GPW8m01D54bq', 'ADMIN', NOW(3), NOW(3));

-- ─── Ziyarat Packages ────────────────────────────────────────
INSERT INTO `ZiyaratPackage` (`id`, `name`, `city`, `duration`, `price`, `currency`, `includes`, `excludes`, `itinerary`, `pickupRules`, `images`, `availability`, `isActive`, `createdAt`, `updatedAt`) VALUES
('pkg_makkah_half', 'Makkah Ziyarat – Half Day', 'Makkah', '4 hours', 350, 'SAR',
 'Air-conditioned vehicle, Professional guide, Water bottles',
 'Meals, Shopping time, Entry tickets (if any)',
 '1. Pickup from hotel\n2. Jabal Al-Noor (Hira Cave viewpoint)\n3. Jabal Thawr\n4. Hudaybiyyah Mosque\n5. Return to hotel',
 'Pickup between 7:00 AM – 8:00 AM from Makkah hotels only',
 NULL, 'Daily', 1, NOW(3), NOW(3)),

('pkg_madinah_full', 'Madinah Ziyarat – Full Day', 'Madinah', '8 hours', 500, 'SAR',
 'AC vehicle, Lunch box, Guide, All entrance coordination',
 'Personal expenses, Tips',
 '1. Masjid Quba\n2. Masjid Qiblatain\n3. Uhud Mountain & Martyrs Cemetery\n4. Date farms visit\n5. Masjid Jummah\n6. Seven Mosques\n7. Return to hotel',
 'Pickup from any Madinah hotel at 8:00 AM',
 NULL, 'Daily', 1, NOW(3), NOW(3)),

('pkg_taif_day', 'Taif Day Trip', 'Taif', '10 hours', 800, 'SAR',
 'AC Hiace, Driver, Rose garden visit, Lunch',
 'Shopping, Personal items',
 '1. Pickup from Makkah hotel\n2. Al Hada mountain drive\n3. Rose factory\n4. Al-Shafa viewpoint\n5. Taif park\n6. Return to Makkah',
 'Starts at 7:00 AM from Makkah',
 NULL, 'Mon/Wed/Fri', 1, NOW(3), NOW(3));

-- ─── Khajoor Products ────────────────────────────────────────
INSERT INTO `KhajoorProduct` (`id`, `name`, `description`, `price`, `image`, `popular`, `isActive`, `createdAt`, `updatedAt`) VALUES
('khj_ajwa', 'Ajwa Al-Madinah', 'The blessed dark dates from Madinah, known for their rich soft texture and extraordinary health benefits. The Prophet ﷺ recommended eating seven Ajwa dates each morning.', 'From 120 SAR / kg', NULL, 1, 1, NOW(3), NOW(3)),
('khj_safawi', 'Safawi Dates', 'Semi-dry dark dates with a mild sweetness and soft texture. An excellent everyday choice from the farms of Madinah.', 'From 60 SAR / kg', NULL, 0, 1, NOW(3), NOW(3)),
('khj_mabroom', 'Mabroom Dates', 'Elongated, chewy dates with a caramel-like flavor. Popular as gifts and widely appreciated for their unique taste.', 'From 80 SAR / kg', NULL, 1, 1, NOW(3), NOW(3)),
('khj_sukkari', 'Sukkari Dates', 'Golden, crystal-textured dates known as the "queen of dates." Sweet and crunchy with a butterscotch flavor.', 'From 90 SAR / kg', NULL, 0, 1, NOW(3), NOW(3));

-- ─── Sample Pick & Drop Bookings ─────────────────────────────
INSERT INTO `PickDropBooking` (`id`, `fullName`, `mobile`, `whatsapp`, `pickupLocation`, `dropLocation`, `date`, `time`, `passengers`, `vehicleType`, `luggage`, `notes`, `status`, `createdAt`, `updatedAt`) VALUES
('bk_001', 'Ahmad Khan', '+966501234567', '+966501234567', 'Jeddah Airport (JED)', 'Makkah – Hilton Hotel', '2026-03-15', '14:00', 3, 'Sedan', 1, 'Will have one wheelchair passenger', 'PENDING', NOW(3), NOW(3)),
('bk_002', 'Fatima Ali', '+966559876543', NULL, 'Madinah Airport (MED)', 'Madinah – Oberoi Hotel', '2026-03-18', '09:30', 2, 'Sedan', 1, NULL, 'CONFIRMED', NOW(3), NOW(3)),
('bk_003', 'Muhammad Bilal', '+966512345678', '+966512345678', 'Makkah Hotel', 'Madinah Hotel', '2026-03-20', '06:00', 5, 'Hiace', 1, 'Family with children', 'PENDING', NOW(3), NOW(3));

-- ─── Sample Khajoor Inquiries ────────────────────────────────
INSERT INTO `KhajoorInquiry` (`id`, `fullName`, `mobile`, `whatsapp`, `requiredType`, `quantity`, `deliveryCity`, `notes`, `status`, `createdAt`, `updatedAt`) VALUES
('ki_001', 'Hassan Merchant', '+966508765432', '+966508765432', 'Ajwa Al-Madinah', '50 kg', 'Riyadh', 'For Ramadan distribution at our mosque', 'PENDING', NOW(3), NOW(3)),
('ki_002', 'Sara Ahmed', '+966551234567', NULL, 'Mixed Variety', '10 gift boxes', 'Jeddah', 'Corporate Eid gifts – need premium packaging', 'PENDING', NOW(3), NOW(3));

-- ─── Sample Contact Messages ─────────────────────────────────
INSERT INTO `ContactMessage` (`id`, `name`, `emailOrPhone`, `message`, `category`, `status`, `createdAt`, `updatedAt`) VALUES
('msg_001', 'Yusuf Ibrahim', 'yusuf@gmail.com', '[General Inquiry] I would like to know about group discounts for Ziyarat packages for 20+ people.', 'General', 'UNREAD', NOW(3), NOW(3)),
('msg_002', 'Aisha Khan', '+966507654321', '[Donation Request] We want to sponsor Iftar meals for 100 people at Masjid Al-Nabawi during Ramadan.', 'Donation', 'UNREAD', NOW(3), NOW(3)),
('msg_003', 'Omar Farooq', 'omar.farooq@company.com', '[Custom Ziyarat] Need a 3-day custom Ziyarat covering Makkah, Madinah, and Badr for a group of 8.', 'Ziyarat Custom', 'READ', NOW(3), NOW(3));

-- ─── Sample Package Inquiries ────────────────────────────────
INSERT INTO `PackageInquiry` (`id`, `fullName`, `mobile`, `whatsapp`, `pickupLocation`, `date`, `persons`, `notes`, `status`, `packageId`, `createdAt`, `updatedAt`) VALUES
('pi_001', 'Khalid Al-Rashid', '+966503456789', '+966503456789', 'Hilton Makkah Convention Hotel', '2026-04-01', 4, 'Prefer English-speaking guide', 'PENDING', 'pkg_makkah_half', NOW(3), NOW(3)),
('pi_002', 'Noor Fatima', '+966554321098', NULL, 'Oberoi Madinah', '2026-04-05', 2, NULL, 'CONFIRMED', 'pkg_madinah_full', NOW(3), NOW(3));

-- ─── App Settings ────────────────────────────────────────────
INSERT INTO `AppSettings` (`id`, `contactPhone`, `whatsappNumber`, `contactEmail`, `workingHours`, `siteTitle`, `siteDescription`, `sallaStoreUrl`, `sallaBooksUrl`, `sallaDatesUrl`, `sallaDonationsUrl`, `facebookUrl`, `instagramUrl`, `twitterUrl`, `tiktokUrl`, `updatedAt`) VALUES
('settings_001', '+966 50 123 4567', '+966501234567', 'info@alhudaservices.com', '24 Hours / 7 Days', 'Al-Huda Services', 'Professional transport, Ziyarat packages and Islamic products in Makkah & Madinah', 'https://salla.sa/al-huda', NULL, NULL, NULL, 'https://facebook.com/alhudaservices', 'https://instagram.com/alhudaservices', NULL, NULL, NOW(3));

COMMIT;

-- ============================================================
-- DONE! You can now access the admin panel at:
--   URL:      http://yourdomain.com/admin
--   Email:    admin@alhuda.com
--   Password: Admin@123
--
-- ⚠ IMPORTANT: Change the admin password immediately after login!
-- ============================================================
