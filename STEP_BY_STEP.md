# Step-by-Step Setup — Complete Guide

Follow these steps **in order**. Do not skip.

---

## Step 1: Copy Child Theme + Setup Plugin to WordPress

Open a terminal and run (enter your password when prompted):

```bash
sudo cp -r /home/dev-ai/dev/Akmal/booking/booking-astra-child /opt/lampp/htdocs/booking/wp-content/themes/
sudo cp -r /home/dev-ai/dev/Akmal/booking/booking-setup /opt/lampp/htdocs/booking/wp-content/plugins/
sudo chown -R daemon:daemon /opt/lampp/htdocs/booking/wp-content/themes/booking-astra-child
sudo chown -R daemon:daemon /opt/lampp/htdocs/booking/wp-content/plugins/booking-setup
```

---

## Step 2: Activate Child Theme

1. Go to **http://localhost/booking/wp-admin**
2. Log in
3. Click **Appearance** → **Themes**
4. Find **Booking Astra Child**
5. Click **Activate**

---

## Step 3: Activate Setup Plugin (Creates Pages + Menu)

1. Click **Plugins** → **Installed Plugins**
2. Find **Booking Site Setup**
3. Click **Activate**
4. Pages and menu are created automatically

---

## Step 4: Set WhatsApp Number

1. Click **Appearance** → **Customize**
2. Find **Booking Settings** in the left sidebar
3. Set **WhatsApp Number** (e.g. `966501234567` — country code + number, no + or spaces)
4. Click **Publish**

---

## Step 5: Assign Menu to Header (if needed)

1. Go to **Appearance** → **Menus**
2. Select **Primary Menu** (or create one)
3. Add: Home, Pick & Drop, Ziyarat Packages, Khajoor, Shop, Donations, About Us, Contact Us
4. Under **Display location**, check **Primary Menu**
5. Click **Save Menu**

---

## Step 6: Install Polylang (Multi-Language)

1. Click **Plugins** → **Add New**
2. Search **Polylang**
3. Click **Install Now** → **Activate**
4. Go to **Languages** → **Languages**
5. Add **English** and **Urdu**
6. Set **English** as default → **Save**

---

## Step 7: Verify Home Page

1. Visit **http://localhost/booking/**
2. You should see: Hero, CTAs, Featured Packages, Why Choose Us, Testimonials, WhatsApp strip
3. Check the floating WhatsApp button (bottom-right)

---

## Step 8: Optional — Deactivate Setup Plugin

After setup is complete, you can deactivate **Booking Site Setup** (Plugins → Deactivate). It only runs on activation.

---

## Summary Checklist

- [ ] Step 1: Copy theme + plugin
- [ ] Step 2: Activate Booking Astra Child
- [ ] Step 3: Activate Booking Site Setup
- [ ] Step 4: Set WhatsApp number in Customizer
- [ ] Step 5: Menu assigned to header
- [ ] Step 6: Polylang installed (optional)
- [ ] Step 7: Home page verified
