#!/bin/bash
# Booking Project - Step 1: Copy theme + plugin to WordPress
# Run: ./run-setup.sh
# You will be prompted for your sudo password.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HTDOCS="/opt/lampp/htdocs/booking/wp-content"

echo "=============================================="
echo "  Booking Project - Setup (Step 1)"
echo "=============================================="
echo ""
echo "Copying child theme and setup plugin..."
echo ""

sudo cp -r "$SCRIPT_DIR/booking-astra-child" "$HTDOCS/themes/"
sudo cp -r "$SCRIPT_DIR/booking-setup" "$HTDOCS/plugins/"
sudo cp -r "$SCRIPT_DIR/booking-forms" "$HTDOCS/plugins/"
sudo chown -R daemon:daemon "$HTDOCS/themes/booking-astra-child"
sudo chown -R daemon:daemon "$HTDOCS/plugins/booking-setup"
sudo chown -R daemon:daemon "$HTDOCS/plugins/booking-forms"

echo ""
echo "✅ Step 1 complete!"
echo ""
echo "Next steps (in your browser):"
echo "  1. Go to http://localhost/booking/wp-admin"
echo "  2. Plugins → Activate 'Booking Forms & Admin'"
echo "  3. Appearance → Themes → Activate 'Booking Astra Child' (if not already)"
echo "  4. Plugins → Activate 'Booking Site Setup' (if not already)"
echo "  5. Appearance → Customize → Booking Settings → Set WhatsApp number"
echo "  6. See PHASE2_INSTALL.md for forms setup"
echo ""
