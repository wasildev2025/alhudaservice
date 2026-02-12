#!/bin/bash
# XAMPP WordPress Setup Script
# Run: ./setup-xampp.sh
# You may need to run some commands with sudo (password required)

set -e
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WP_DIR="$PROJECT_DIR/wordpress"
HTDOCS="/opt/lampp/htdocs"
MYSQL="/opt/lampp/bin/mysql"

echo "=== Booking Project - XAMPP Setup ==="
echo ""

# 1. Start XAMPP (requires sudo)
echo "Step 1: Starting XAMPP (Apache + MySQL)..."
echo "Run this command: sudo /opt/lampp/lampp start"
echo ""
read -p "Press Enter after XAMPP is running (or Ctrl+C to exit)..." _

# 2. Create database
echo ""
echo "Step 2: Creating database 'booking_wp'..."
if [ -x "$MYSQL" ]; then
    $MYSQL -u root -e "CREATE DATABASE IF NOT EXISTS booking_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null && echo "Database created successfully." || echo "Note: If MySQL connection failed, run manually: $MYSQL -u root -e \"CREATE DATABASE booking_wp;\""
else
    echo "MySQL not found at $MYSQL. Create database manually via phpMyAdmin: http://localhost/phpmyadmin"
fi

# 3. Symlink (requires sudo)
echo ""
echo "Step 3: Creating symlink to serve WordPress..."
echo "Run this command: sudo ln -sf $WP_DIR $HTDOCS/booking"
echo ""

# 4. Done
echo "=== Setup Complete ==="
echo ""
echo "Next: Open http://localhost/booking in your browser to run WordPress installation."
echo "See XAMPP_SETUP.md for full instructions."
