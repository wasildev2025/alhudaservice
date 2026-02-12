# XAMPP + WordPress Local Setup

WordPress is ready in the project folder. Complete these steps to run it locally with XAMPP.

---

## Step 1: Start XAMPP

Open a terminal and run:

```bash
sudo /opt/lampp/lampp start
```

This starts Apache and MySQL. Verify with:

```bash
/opt/lampp/lampp status
```

---

## Step 2: Create the Database

XAMPP MySQL uses user `root` with no password by default. Create the WordPress database:

```bash
/opt/lampp/bin/mysql -u root -e "CREATE DATABASE IF NOT EXISTS booking_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## Step 3: Link WordPress to XAMPP

Link the project's WordPress folder so Apache can serve it:

```bash
sudo ln -sf /home/dev-ai/dev/Akmal/booking/wordpress /opt/lampp/htdocs/booking
```

---

## Step 4: Run WordPress Installation

1. Open in your browser: **http://localhost/booking/**
2. Choose language (English or Urdu)
3. Fill in site details:
   - **Site Title:** (e.g., Your Site Name)
   - **Username:** (admin username)
   - **Password:** (strong password)
   - **Email:** (your email)
4. Click **Install WordPress**
5. Log in at **http://localhost/booking/wp-admin**

---

## Quick Reference

| Item | Value |
|------|-------|
| **Site URL** | http://localhost/booking |
| **Admin URL** | http://localhost/booking/wp-admin |
| **Database** | booking_wp |
| **DB User** | root |
| **DB Password** | (empty) |

---

## Troubleshooting

- **404 or "Not Found"**: Ensure the symlink was created (Step 3)
- **Error establishing database connection**: Start MySQL (Step 1) and create DB (Step 2)
- **Permission errors**: Ensure `/opt/lampp/htdocs` is writable or use the symlink
