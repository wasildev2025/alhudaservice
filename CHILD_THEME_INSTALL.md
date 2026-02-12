# Install Booking Astra Child Theme

## What's Included
- **Islamic branding** — Gold, green, white color scheme
- **Custom Home page** — Hero, CTAs, Featured packages, Why Choose Us, Testimonials, WhatsApp strip
- **Floating WhatsApp button** — On all pages
- **Auto-create pages** — Pick & Drop, Ziyarat, Khajoor, Shop, Donations, About, Contact, FAQ, Terms, Privacy
- **WhatsApp number** — Configurable in Customizer

---

## Method 1: Copy via Terminal (Recommended)

```bash
sudo cp -r /home/dev-ai/dev/Akmal/booking/booking-astra-child /opt/lampp/htdocs/booking/wp-content/themes/
sudo chown -R daemon:daemon /opt/lampp/htdocs/booking/wp-content/themes/booking-astra-child
```

---

## Method 2: Upload via WordPress Admin

1. Create a zip of the child theme:
   ```bash
   cd /home/dev-ai/dev/Akmal/booking
   zip -r booking-astra-child.zip booking-astra-child
   ```

2. In WordPress: **Appearance → Themes → Add New → Upload Theme**
3. Choose `booking-astra-child.zip` → **Install Now**
4. **Activate** the theme

---

## After Installation

1. **Activate** the child theme: **Appearance → Themes** → Activate "Booking Astra Child"
2. **Set WhatsApp number**: **Appearance → Customize → Booking Settings** → Enter your WhatsApp number (e.g. `966501234567`)
3. **Check Home page** — Visit http://localhost/booking/ to see the new layout
4. **Create menu**: **Appearance → Menus** — Add all pages to main navigation
5. **Multi-language** (optional): See `MULTILANG_SETUP.md` for Polylang setup

---

## Default Pages Created on Activation

| Page | Slug |
|------|------|
| Pick & Drop | /pick-drop/ |
| Ziyarat Packages | /ziyarat-packages/ |
| Khajoor | /khajoor/ |
| Shop | /shop/ |
| Donations | /donations/ |
| About Us | /about-us/ |
| Contact Us | /contact-us/ |
| FAQ | /faq/ |
| Terms & Conditions | /terms-conditions/ |
| Privacy Policy | /privacy-policy/ |

Add these to your menu in **Appearance → Menus**.
