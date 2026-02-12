# Phase 2 Install — Forms & Admin Panel

## Step 1: Copy Phase 2 files

Run in terminal:

```bash
cd /home/dev-ai/dev/Akmal/booking
./run-setup.sh
```

This copies the updated child theme and the new **Booking Forms** plugin.

---

## Step 2: Activate Booking Forms plugin

1. Go to **http://localhost/booking/wp-admin**
2. **Plugins** → **Installed Plugins**
3. Find **Booking Forms & Admin**
4. Click **Activate**

(This creates the database tables.)

---

## Step 3: Update page content (if pages already exist)

If you ran the setup earlier, your pages may have placeholder content. Edit these pages and add the shortcodes:

| Page | Content to add |
|------|----------------|
| **Pick & Drop** | `[booking_pick_drop]` |
| **Ziyarat Packages** | `[booking_ziyarat_list]` + `[booking_ziyarat]` |
| **Khajoor** | `[booking_khajoor_bulk]` + `[booking_khajoor_gift]` |
| **Contact Us** | `[booking_contact]` |

If pages were created fresh by the setup plugin, they should already have these shortcodes.

---

## Step 4: Add a Ziyarat Package (test)

1. Go to **Ziyarat Packages** (in the left admin menu)
2. Click **Add Package**
3. Enter: Title (e.g. "Makkah Half Day"), City (Makkah), Duration, Price
4. **Publish**

---

## Step 5: Verify

- **Pick & Drop** page: Form displays, submission works
- **Booking** menu: Dashboard, Pick & Drop, Ziyarat, Khajoor, Contact, Settings
- Submit a test booking and check **Booking → Pick & Drop**

---

## Shortcodes Reference

| Shortcode | Use |
|-----------|-----|
| `[booking_pick_drop]` | Pick & Drop booking form |
| `[booking_ziyarat]` | Ziyarat inquiry form (optional: `package_id="123"`) |
| `[booking_ziyarat_list]` | List of packages |
| `[booking_khajoor_bulk]` | Bulk order inquiry |
| `[booking_khajoor_gift]` | Gift box inquiry |
| `[booking_contact]` | Contact form |
