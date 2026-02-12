# COMPLETE PROJECT PLAN & IMPLEMENTATION ROADMAP
## Multi-Service Website Development

**Pick & Drop | Ziyarat Packages | Khajoor Services | Book Store | Donations**

**Prepared:** February 2026
**Platform:** WordPress + Salla E-Commerce Integration
**Timeline:** 6 Weeks
**Status:** DRAFT

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Target Audience](#2-target-audience)
3. [Core Modules & Features](#3-core-modules--features)
   - 3.1 Module A — Pick & Drop Booking
   - 3.2 Module B — Ziyarat Packages
   - 3.3 Module C — Khajoor Services
   - 3.4 Module D — Book Store (Salla E-Commerce)
   - 3.5 Module E — Donations (Ramadan / Sadaqah)
4. [Website Pages (Sitemap)](#4-website-pages-sitemap)
5. [Home Page Sections](#5-home-page-sections)
6. [Admin Panel Requirements](#6-admin-panel-requirements)
7. [Booking & Inquiry Form Fields (Complete Reference)](#7-booking--inquiry-form-fields-complete-reference)
8. [Design & Branding Requirements](#8-design--branding-requirements)
9. [Technical Requirements](#9-technical-requirements)
10. [Integrations](#10-integrations)
11. [Security Requirements](#11-security-requirements)
12. [Recommended Technology Stack](#12-recommended-technology-stack)
13. [Implementation Phases — Detailed Build Plan](#13-implementation-phases--detailed-build-plan)
14. [Development Timeline (6 Weeks)](#14-development-timeline-6-weeks)
15. [Developer Deliverables](#15-developer-deliverables)
16. [Acceptance Criteria](#16-acceptance-criteria)
17. [Risk & Dependency Analysis](#17-risk--dependency-analysis)
18. [Next Steps](#18-next-steps)

---

## 1. Executive Summary

This project involves the development of a comprehensive, single multi-service website that consolidates all business operations into one unified digital platform. The website will serve Saudi/GCC and Pakistani visitors with the following core services:

- **Pick & Drop Services** — Online transport booking for airport, hotel, and ziyarat pickup/drop-off.
- **Ziyarat Packages** — Display, inquiry, and booking of religious tourism packages across Saudi Arabia.
- **Khajoor (Dates) Services** — Product catalog, ordering, and inquiry for premium date varieties including bulk and gift packing.
- **Book Store** — Islamic book sales via integrated Salla e-commerce platform with payment collection and order management.
- **Ramadan Donations / Sadaqah** — Transparent donation collection with multiple giving categories and campaign progress tracking.
- **Salla Store Integration** — Centralized payment collection and order management through Salla e-commerce infrastructure.

The primary goal is to create a professional, mobile-first, Islamic-themed platform that simplifies customer interaction, consolidates service inquiries, and streamlines admin operations.

**Recommended Tech Stack:** WordPress + Salla Integration (cost-effective, fast to build).

---

## 2. Target Audience

| Audience Segment | Description | Key Needs |
|---|---|---|
| Saudi/GCC Visitors | Residents and visitors in Saudi Arabia and Gulf countries seeking local services | Transport, packages, local products |
| Pakistan Visitors | Pakistanis traveling to Saudi Arabia for Umrah, Hajj, or business purposes | Ziyarat packages, pickup/drop, khajoor gifts |
| Ziyarat Travelers | Families and groups looking for organized religious tourism packages | Curated itineraries, transparent pricing |
| Khajoor Buyers | Individuals and businesses seeking premium dates for gifts, wholesale, or personal use | Product variety, bulk ordering, delivery |
| Islamic Book Readers | Customers interested in purchasing Islamic literature and educational materials | Browse and buy online |
| Donation Donors | Individuals contributing to Ramadan campaigns, Sadaqah, Zakat, and general charitable causes | Transparent donation, campaign progress |

---

## 3. Core Modules & Features

The website comprises five core modules, each serving a distinct business function. All modules share a common admin panel and notification system.

---

### 3.1 Module A — Pick & Drop Booking

| Aspect | Details |
|---|---|
| **Purpose** | Transport booking (airport/hotel/Ziyarat pickup & drop) |
| **Vehicle Types** | Sedan / Van / Hiace (optional selection) |
| **Status Flow** | Pending → Confirmed → Completed / Cancelled |
| **Notifications** | Admin: Email/WhatsApp; User: "Booking Request Received" confirmation |

#### User Flow

1. User navigates to the "Pick & Drop" page from the main navigation.
2. User fills in the booking form with all required and optional fields.
3. User submits the form and receives a "Booking Request Received" confirmation message on screen.
4. Admin receives a notification (via Email and/or WhatsApp — optional).
5. Admin reviews the booking and sets the status: Pending / Confirmed / Completed / Cancelled.
6. A WhatsApp "Click to Chat" button is available with a pre-filled message containing booking details.

#### Booking Form Fields

| Field | Type | Required |
|---|---|---|
| Full Name | Text Input | Yes |
| Mobile Number | Phone Input | Yes |
| WhatsApp Number (same as mobile Y/N) | Phone + Toggle | Yes |
| Pickup Location | Text / Google Maps Link | Yes |
| Drop Location | Text / Google Maps Link | Yes |
| Date | Date Picker | Yes |
| Time | Time Picker | Yes |
| Passengers Count | Number Selector | Yes |
| Luggage (Yes/No) | Toggle / Checkbox | Yes |
| Vehicle Type (Sedan / Van / Hiace) | Dropdown | Optional |
| Special Notes | Textarea | Optional |

#### Developer Requirements

- Form with full client-side and server-side validation + reCAPTCHA.
- Database persistence (custom table or CPT) with timestamps.
- Admin panel listing with sorting, filtering, and status management.
- Auto confirmation email/SMS upon submission (optional enhancement).
- WhatsApp "Click to Chat" button with pre-filled booking summary.
- Optional: Google Maps for pickup/drop locations.

---

### 3.2 Module B — Ziyarat Packages

| Aspect | Details |
|---|---|
| **Purpose** | Package listing + booking/inquiry |
| **Future Upgrade** | Online advance payment via Salla (optional) |

#### Package Information Fields (Admin Managed)

| Field | Description | Example |
|---|---|---|
| Package Name | Title of the package | Makkah Ziyarat — Half Day |
| City | Location of the package | Makkah / Madinah / Taif / Badr |
| Duration | Total hours or days | 6 Hours / 2 Days |
| Price | Per person or per group + currency | SAR 150/person |
| Includes | What is covered in the price | Transport, Guide, Refreshments |
| Excludes | What is NOT included | Meals, Entry tickets |
| Itinerary Points | Step-by-step visit plan (bullet list) | Masjid al-Haram, Jabal Noor... |
| Pickup Point Rules | Where and when pickup happens | Hotel lobby, 30 min before |
| Images Gallery | Photos of locations and vehicles | Multiple high-quality images |
| Availability Notes | Seasonal/capacity restrictions | Available Sep–Dec, Max 15 pax |

#### User Flow

1. User visits the "Ziyarat Packages" page and browses available packages.
2. User clicks on a package to view full details (itinerary, pricing, gallery).
3. User clicks "Book Now / Inquiry" button.
4. Booking inquiry form auto-populates with the selected package name.
5. User fills in date, number of persons, pickup location, and contact details.
6. User submits the form and receives a confirmation message.
7. Admin receives notification and manages the inquiry from the admin panel.

#### Inquiry Form Fields

| Field | Type | Required |
|---|---|---|
| Package (auto-selected) | Dropdown / Auto-fill | Yes |
| Preferred Date | Date Picker | Yes |
| Number of Persons | Number Input | Yes |
| Pickup Location | Text Input | Yes |
| Full Name | Text Input | Yes |
| Mobile / WhatsApp | Phone Input | Yes |
| Special Notes | Textarea | Optional |

#### Developer Requirements

- Custom post type (or equivalent) for packages with admin CRUD.
- Package detail template with image gallery.
- Inquiry form linked to selected package with DB storage.
- Admin listing of inquiries with status management.
- Optional: Online advance payment via Salla payment link/product approach.

---

### 3.3 Module C — Khajoor (Dates) Services

| Aspect | Details |
|---|---|
| **Purpose** | Dates (Khajoor) product showcase + inquiry |
| **Recommended** | Products in Salla; website shows categories + "Buy on Store" CTA |

#### Integration Approach

**Recommended:** Khajoor products are managed within the Salla store (inventory, payment, shipping handled by Salla). The website displays a dedicated "Khajoor" page with product categories and "Buy on Store" buttons that redirect to the corresponding Salla product pages.

#### Content Sections on Website

- **Product Categories:** Ajwa, Safawi, Mabroom, Sukkari, Amber, and other premium varieties.
- **Bulk Order Inquiry Form:** For wholesale and large-quantity orders.
- **Gift Box Inquiry:** Custom gift packing options for special occasions.
- **Delivery Cities:** List of supported delivery locations and shipping information.
- **Product Images and Descriptions:** High-quality photos and detailed descriptions for each variety.

#### Bulk Khajoor Inquiry Form Fields

| Field | Type | Required |
|---|---|---|
| Required Type (Ajwa, Safawi, etc.) | Dropdown / Multi-select | Yes |
| Quantity (kg / boxes) | Number + Unit Selector | Yes |
| Delivery City | Text / Dropdown | Yes |
| Full Name | Text Input | Yes |
| Phone / WhatsApp | Phone Input | Yes |
| Special Notes | Textarea | Optional |

#### Developer Requirements

- Khajoor landing page with categories and product images.
- Bulk order inquiry form + database storage + admin listing.
- Gift box inquiry form + database storage.
- Links/buttons redirecting to Salla product pages.

---

### 3.4 Module D — Book Store (Salla E-Commerce)

| Aspect | Details |
|---|---|
| **Purpose** | Islamic books sale + payment via Salla |
| **Recommended** | Menu "Shop" → Salla store URL + selected "Buy Now" buttons |

#### Integration Approaches

| Approach | Description | Complexity |
|---|---|---|
| Approach 1: Simple Link | Website menu "Shop" links directly to Salla store (subdomain store.yourdomain.com or Salla URL) | Low |
| Approach 2: Semi-Embedded | Selected products displayed on website with "Buy Now" buttons redirecting to Salla product/cart pages | Medium |
| Approach 3: Headless API | Full headless integration using Salla APIs (only if APIs available and budget permits) | High |

**Recommended:** Approach 1 + Approach 2 combined — the main Shop menu links to the full Salla store, while featured books are showcased on the website with direct purchase buttons. Best balance of speed, stability, and cost.

#### Developer Requirements

- Salla store setup (subdomain or dedicated URL).
- "Shop" menu item linking to Salla store.
- Optional: Featured products on website with "Buy Now" buttons to Salla product/cart.

---

### 3.5 Module E — Donations (Ramadan / Sadaqah)

| Aspect | Details |
|---|---|
| **Purpose** | Ramadan/Sadaqah/Zakat donation with transparency |
| **Payment** | Option A (Recommended): Salla donation product; Option B: External gateway |
| **Post-Donation** | Success page + receipt message (email/SMS) |

#### Donation Types

| Donation Type | Description | Status |
|---|---|---|
| Sadaqah | General voluntary charity | Core |
| Zakat | Obligatory annual giving | Optional |
| Ramadan Iftar Sponsorship | Sponsor Iftar meals during Ramadan | Optional |
| General Donation | Unrestricted charitable contribution | Core |

#### User Flow

1. User visits the Donation page and selects a donation category.
2. User chooses a preset amount (SAR 50 / 100 / 200) or enters a custom amount.
3. User optionally provides personal details: name, phone, note/dua request.
4. User proceeds to payment via Salla donation product (recommended) or external payment gateway.
5. Success page is displayed with a receipt message and transaction confirmation.

#### Donation Form Fields

| Field | Type | Required |
|---|---|---|
| Donation Type | Radio / Dropdown | Yes |
| Amount (50 / 100 / 200 / Custom) | Preset Buttons + Custom Input | Yes |
| Donor Name | Text Input | Optional |
| Phone | Phone Input | Optional |
| Note / Dua Request | Textarea | Optional |

#### Admin Requirements

- Donation records with complete details accessible from the admin panel.
- CSV export functionality for all donation records.
- Campaign progress counter (manual or automatic) displayed on the donation page.
- Ability to create, activate, and deactivate donation campaigns.

#### Developer Requirements

- Donation page with amount selection UI.
- Salla donation product / payment link integration.
- Success page with receipt message.
- Admin: donation records view, CSV export, progress counter.

---

## 4. Website Pages (Sitemap)

| # | Page | Purpose |
|---|---|---|
| 1 | **Home** | Hero banner + CTAs (Book Pick & Drop / View Packages / Shop / Donate), featured packages, featured products, Why Choose Us, testimonials, WhatsApp contact strip, footer |
| 2 | **Pick & Drop** | Transport booking form and service information |
| 3 | **Ziyarat Packages** | Package listing + detail pages with inquiry forms |
| 4 | **Khajoor Services** | Categories, bulk inquiry, gift inquiry, Salla product links |
| 5 | **Book Store (Salla)** | Shop menu → Salla store |
| 6 | **Donations** | Donation categories, amount selection, payment flow |
| 7 | **About Us** | Company information, mission, and team |
| 8 | **Contact Us** | Contact form, phone, email, WhatsApp, location |
| 9 | **FAQ** | Frequently asked questions about all services |
| 10 | **Terms & Conditions** | Legal terms governing website usage and services |
| 11 | **Privacy Policy** | Data privacy and protection policy |

---

## 5. Home Page Sections

The Home page is the primary landing page and must immediately communicate the range of services with clear calls to action.

| Section | Details |
|---|---|
| Hero Banner + CTA Buttons | Full-width banner with tagline and prominent buttons: Book Pick & Drop / View Packages / Shop / Donate |
| Featured Ziyarat Packages | Top 3–4 packages displayed as cards with images, price, and Book Now button |
| Featured Products | Highlighted khajoor varieties and books with images and Buy links to Salla store |
| Why Choose Us | Trust points: Licensed service, experienced guides, customer support, transparent pricing |
| Testimonials | Customer reviews and feedback displayed as a carousel or grid |
| WhatsApp Contact Strip | Prominent banner/strip with WhatsApp click-to-chat for instant customer support |
| Footer | Quick links to all pages, social media icons, contact information, copyright notice |

---

## 6. Admin Panel Requirements

The admin panel provides centralized management of all bookings, inquiries, content, and settings.

| Feature | Description | Priority |
|---|---|---|
| Ziyarat Packages CRUD | Add, edit, delete, and reorder packages with all fields | High |
| Pick & Drop Bookings List | View all bookings with status management (Pending/Confirmed/Completed/Cancelled) | High |
| Ziyarat Inquiries List | View all package inquiries with status tracking | High |
| Bulk Khajoor Inquiry List | View and manage khajoor bulk order inquiries | High |
| Gift Box Inquiry List | View and manage gift box inquiries | High |
| Contact Form Messages | View and respond to messages submitted via Contact Us | High |
| Donation Records | View all donations with CSV export capability | High |
| Campaign Progress | Set and update donation campaign progress counter (manual/auto) | Medium |
| Homepage Featured Items | Manually select featured packages and products for homepage | Medium |
| Basic Settings | Phone number, WhatsApp number, email, working hours | High |
| Email Notification Config | Configure notification recipients and templates | Medium |

---

## 7. Booking & Inquiry Form Fields (Complete Reference)

### Contact Form

| Field | Type | Required |
|---|---|---|
| Name | Text Input | Yes |
| Email / Phone | Email or Phone Input | Yes |
| Message | Textarea | Yes |

> **Note:** All form fields for Pick & Drop (Section 3.1), Ziyarat Packages (Section 3.2), Bulk Khajoor Inquiry (Section 3.3), and Donations (Section 3.5) are detailed in their respective module sections above with full Field, Type, and Required specifications.

---

## 8. Design & Branding Requirements

| Requirement | Specification |
|---|---|
| Language Support | Urdu + English (optional) / Roman Urdu (optional) — RTL support for Urdu |
| Design Approach | Mobile-first responsive design (mobile, tablet, desktop) |
| Theme | Clean Islamic aesthetic — Gold, Green, White color palette (customizable) |
| CTA Buttons | Highly visible, contrasting colors, clear action labels on all pages |
| WhatsApp Button | Floating WhatsApp chat button visible on ALL pages |
| Loading Speed | Fast loading: optimized images, caching, minified assets |
| SEO | SEO-friendly: semantic HTML, meta tags, sitemap, structured data |
| Typography | Clean, readable fonts supporting both English and Urdu/Arabic scripts |
| Imagery | High-quality, relevant Islamic and service-related imagery throughout |
| Accessibility | Basic accessibility compliance (alt text, contrast ratios, keyboard navigation) |

---

## 9. Technical Requirements

### Frontend

- Fully responsive design across mobile, tablet, and desktop breakpoints.
- Client-side form validation with clear error messaging.
- reCAPTCHA integration on all forms for anti-spam protection.
- Speed optimization: browser caching, image compression, lazy loading, minified CSS/JS.
- Cross-browser compatibility (Chrome, Safari, Firefox, Edge).

### Backend

- Database for storing all bookings, inquiries, and contact form submissions with timestamps.
- Admin dashboard with authentication and role-based access.
- Email notification system for booking/inquiry alerts to admin.
- Optional: WhatsApp notification integration via API.
- Database backup and restore capabilities.

---

## 10. Integrations

| Integration | Purpose | Priority |
|---|---|---|
| Salla Store | E-commerce for books, khajoor, and donation payments (subdomain or linked) | High |
| WhatsApp Chat | Floating button + click-to-chat with pre-filled messages | High |
| Email Service | Transactional emails for notifications and confirmations | High |
| reCAPTCHA (Google) | Spam protection on all forms | High |
| Google Analytics | Website traffic and user behavior tracking | Optional |
| Meta Pixel (Facebook) | Ad tracking and remarketing pixel | Optional |
| Google Maps | Pickup/drop location links and embedded maps | Optional |

---

## 11. Security Requirements

- SSL Certificate (HTTPS) enabled across the entire website.
- Regular automated backup schedule (daily or weekly depending on hosting).
- Basic firewall plugin (e.g., Wordfence if WordPress) for intrusion prevention.
- Secure admin panel login with strong password enforcement.
- Input sanitization on all forms to prevent SQL injection and XSS attacks.
- File upload restrictions and validation (if applicable).
- Regular WordPress core, theme, and plugin updates.

---

## 12. Recommended Technology Stack

| Option | Stack | Description | Cost |
|---|---|---|---|
| Option 1 (Recommended) | WordPress + Salla | WordPress for website with custom pages, forms, and admin. Salla as external/subdomain store. | Low–Medium |
| Option 2 (Advanced) | Next.js / Laravel + Salla | Custom-built frontend and backend with better scalability. Higher development cost. | Medium–High |

**Recommendation:** WordPress + Salla integration provides the best balance of development speed, cost-effectiveness, ease of management, and scalability for this project.

---

## 13. Implementation Phases — Detailed Build Plan

### Phase 1: Foundation & UI (Weeks 1–2)

| Task # | Task | Deliverable |
|---|---|---|
| 1.1 | Set up WordPress + hosting environment | WordPress installed, configured, accessible |
| 1.2 | Choose and install theme (Islamic, mobile-first) | Theme activated and base-configured |
| 1.3 | Configure multi-language (EN/UR) if required | Language plugin installed, structure ready |
| 1.4 | Design Home page layout | Hero banner, CTA buttons, all sections |
| 1.5 | Create static pages | About Us, Contact Us, FAQ, Terms & Conditions, Privacy Policy |
| 1.6 | Implement global layout elements | Header navigation, footer, WhatsApp floating button |
| 1.7 | Create page templates for all modules | Pick & Drop, Ziyarat, Khajoor, Donations, Book Store templates |
| 1.8 | Set up branding assets | Logo, color scheme, typography, favicon |

**✅ Phase 1 Output:** Static site with full branding, navigation structure, and page templates.

---

### Phase 2: Forms & Admin Panel (Weeks 3–4)

| Task # | Task | Deliverable |
|---|---|---|
| 2.1 | Pick & Drop booking form | Form with validation + reCAPTCHA |
| 2.2 | Pick & Drop database table | DB storage with timestamps |
| 2.3 | Pick & Drop admin listing | Admin view with status management (Pending/Confirmed/Completed/Cancelled) |
| 2.4 | Ziyarat Package CPT setup | Custom post type with all package fields |
| 2.5 | Ziyarat Package admin CRUD | Add, edit, delete, reorder packages |
| 2.6 | Ziyarat Package detail template | Detail page with itinerary, pricing, image gallery |
| 2.7 | Ziyarat inquiry form | Inquiry form linked to package with DB storage |
| 2.8 | Ziyarat inquiry admin listing | Admin view with status management |
| 2.9 | Bulk Khajoor inquiry form | Form with DB storage |
| 2.10 | Gift Box Khajoor inquiry form | Form with DB storage |
| 2.11 | Khajoor admin listing | Admin view for bulk + gift inquiries |
| 2.12 | Contact form | Form with DB storage |
| 2.13 | Contact messages admin listing | Admin view for all contact submissions |
| 2.14 | Email notification system | Booking confirmation to user + admin alerts on all form submissions |
| 2.15 | Admin settings page | Phone, WhatsApp, email, working hours configuration |
| 2.16 | Homepage featured items | Admin-selectable featured packages and products |

**✅ Phase 2 Output:** All forms working, data stored in database, admin can manage all bookings/inquiries/messages.

---

### Phase 3: Salla Integration & Donations (Week 5)

| Task # | Task | Deliverable |
|---|---|---|
| 3.1 | Salla store setup | Store configured (subdomain or dedicated URL) |
| 3.2 | "Shop" menu integration | Menu item linking to Salla store |
| 3.3 | Featured product "Buy Now" buttons | Selected products on website linking to Salla product/cart |
| 3.4 | Khajoor page Salla integration | Product categories with "Buy on Store" links to Salla |
| 3.5 | Donation page UI | Amount selection (50/100/200/custom), donation type selection |
| 3.6 | Donation form | Donor details (optional) with dua request field |
| 3.7 | Salla donation product integration | Payment link / product approach for donation processing |
| 3.8 | Donation success page | Receipt message + transaction confirmation |
| 3.9 | Donation admin panel | Records view with CSV export |
| 3.10 | Campaign progress counter | Manual/automatic counter on donation page |

**✅ Phase 3 Output:** E-commerce fully connected, donation flow end-to-end, Salla integrated.

---

### Phase 4: Testing, Polish & Launch (Week 6)

| Task # | Task | Deliverable |
|---|---|---|
| 4.1 | Performance optimization | Caching, image optimization, lazy loading, minification |
| 4.2 | SEO setup | Page titles, meta descriptions, XML sitemap, robots.txt, structured data |
| 4.3 | Security setup | SSL verified, backups configured, firewall installed |
| 4.4 | Cross-browser testing | Chrome, Safari, Firefox, Edge verified |
| 4.5 | Mobile/tablet testing | Responsive design verified on multiple devices |
| 4.6 | Form validation testing | All forms tested end-to-end (submission, DB storage, email notifications) |
| 4.7 | WhatsApp button verification | Floating button working on all pages with correct number |
| 4.8 | Salla integration testing | Shop links, Buy Now buttons, donation payment all verified |
| 4.9 | Admin training session | 30–60 minute handover (video call or recorded video) |
| 4.10 | Production deployment | Launch on production domain |

**✅ Phase 4 Output:** Production-ready website, fully tested, deployed, and handed over.

---

## 14. Development Timeline (6 Weeks)

```
Week 1–2  │ Phase 1: Foundation, UI, branding, page templates
───────────────────────────────────────────────────────────
Week 3–4  │ Phase 2: Forms, database, admin panel, email notifications
───────────────────────────────────────────────────────────
Week 5    │ Phase 3: Salla integration, donations, e-commerce
───────────────────────────────────────────────────────────
Week 6    │ Phase 4: Testing, SEO, security, launch, handover
```

**Total Duration: 6 Weeks**

> Each phase has defined deliverables and must be reviewed/approved before proceeding to the next phase.

---

## 15. Developer Deliverables

Upon project completion, the developer shall deliver the following:

| # | Deliverable |
|---|---|
| 1 | Live website deployed and accessible on the client's domain |
| 2 | Admin login credentials with full documentation of admin panel features |
| 3 | Salla store connected and operational (Shop menu linking/redirecting correctly) |
| 4 | All forms (Pick & Drop, Ziyarat, Khajoor Bulk, Khajoor Gift, Contact, Donation) fully functional and storing data |
| 5 | Admin dashboard displaying all bookings, inquiries, and messages with status management |
| 6 | Email notification system configured and working for all form submissions |
| 7 | Basic SEO setup: page titles, meta descriptions, XML sitemap, robots.txt, site speed optimization |
| 8 | Developer handover: 30–60 minute training session (video call or recorded video) covering admin panel usage, content management, and basic maintenance |

---

## 16. Acceptance Criteria

The project will be considered complete when all of the following criteria are met:

| # | Criterion | Verified |
|---|---|---|
| 1 | All 11 pages are live and accessible with correct content | ☐ |
| 2 | Pick & Drop booking form submits, stores, and notifies correctly | ☐ |
| 3 | Ziyarat package listings display correctly with gallery and itinerary | ☐ |
| 4 | Ziyarat inquiry form works and stores data with admin visibility | ☐ |
| 5 | Khajoor page displays categories with working links to Salla store | ☐ |
| 6 | Khajoor bulk + gift inquiry forms work and store data | ☐ |
| 7 | Book Store menu redirects to Salla store correctly | ☐ |
| 8 | Donation flow works end-to-end with payment processing via Salla | ☐ |
| 9 | Donation CSV export and campaign counter functional | ☐ |
| 10 | Admin panel provides full CRUD for packages and status management for all inquiries | ☐ |
| 11 | Email notifications fire on all form submissions (user + admin) | ☐ |
| 12 | WhatsApp floating button appears and functions on all pages | ☐ |
| 13 | Website is mobile-responsive across all devices and browsers | ☐ |
| 14 | SSL certificate active (HTTPS enabled) | ☐ |
| 15 | Page load time under 3 seconds on mobile | ☐ |
| 16 | Basic SEO setup complete (titles, meta, sitemap, robots.txt) | ☐ |
| 17 | Salla store integrated and operational | ☐ |
| 18 | Backups and firewall configured | ☐ |
| 19 | Contact form works and admin can view messages | ☐ |
| 20 | Developer handover training completed | ☐ |

---

## 17. Risk & Dependency Analysis

| # | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| 1 | Salla API limitations or restrictions | High | Medium | Use simple link integration (Approach 1–2) initially; avoid headless dependency |
| 2 | Multi-language complexity (EN/UR/RTL) | Medium | High | Decide language scope in Phase 1 before development begins; use proven plugin |
| 3 | WhatsApp Business API access | Medium | Medium | Requires Business API or manual workflow; fallback to click-to-chat links |
| 4 | Payment gateway availability | High | Low | Use Salla for all payments where possible; external gateway only as fallback |
| 5 | Delayed client feedback between phases | High | Medium | Set clear review deadlines per phase; no phase proceeds without sign-off |
| 6 | Scope creep on optional features | Medium | High | Lock scope before Phase 2; any additions tracked as separate change requests |
| 7 | Hosting/domain readiness | Medium | Low | Confirm hosting and domain setup before Phase 1 begins |
| 8 | Content readiness (images, text, packages) | High | Medium | Client to provide all content (package details, images, About text) before Phase 2 |

---

## 18. Next Steps

| # | Action Item | Owner | Deadline |
|---|---|---|---|
| 1 | Confirm tech stack: WordPress vs. custom (Next.js/Laravel) | Client + Developer | Before Phase 1 |
| 2 | Finalize hosting provider and domain setup | Client | Before Phase 1 |
| 3 | Decide multi-language scope (English / Urdu / Roman Urdu / All) | Client | Before Phase 1 |
| 4 | Create Salla merchant account and configure store | Client + Developer | Before Phase 3 |
| 5 | Prepare content: package details, images, About Us text, FAQ content | Client | Before Phase 2 |
| 6 | Confirm WhatsApp Business number for integration | Client | Before Phase 2 |
| 7 | Approve branding (logo, colors, fonts) | Client | During Phase 1 |
| 8 | Start Phase 1: Setup and Design | Developer | Week 1 |

---

*This document is a merged comprehensive plan combining detailed project specifications with an actionable implementation roadmap.*
*Generated from: Project Overview, Website Development Requirement Document, and Website Build Plan analysis.*
*Last updated: February 12, 2026*