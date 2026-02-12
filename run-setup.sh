#!/bin/bash
# Booking Project - Deploy theme + plugins to WordPress (XAMPP)
# Run: ./run-setup.sh
# You will be prompted for your sudo password.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HTDOCS="/opt/lampp/htdocs/booking/wp-content"

echo "=============================================="
echo "  Booking Project — Full Redesign Deploy"
echo "=============================================="
echo ""
echo "Deploying child theme (v2.0), forms plugin, and setup plugin..."
echo ""

sudo cp -r "$SCRIPT_DIR/booking-astra-child" "$HTDOCS/themes/"
sudo cp -r "$SCRIPT_DIR/booking-setup" "$HTDOCS/plugins/"
sudo cp -r "$SCRIPT_DIR/booking-forms" "$HTDOCS/plugins/"
sudo chown -R daemon:daemon "$HTDOCS/themes/booking-astra-child"
sudo chown -R daemon:daemon "$HTDOCS/plugins/booking-setup"
sudo chown -R daemon:daemon "$HTDOCS/plugins/booking-forms"

echo ""
echo "✅ Deploy complete! Files:"
echo "   Theme:   booking-astra-child (v2.0 — full redesign)"
echo "   Plugin:  booking-forms (v1.0 + v2 shortcodes)"
echo "   Plugin:  booking-setup (v2.0)"
echo ""
echo "Next steps:"
echo "  1. Go to http://localhost/booking/wp-admin"
echo "  2. Ensure 'Booking Astra Child' theme is active"
echo "  3. Ensure 'Booking Forms & Admin' plugin is active"
echo "  4. Deactivate & re-activate 'Booking Site Setup' plugin"
echo "     (to create any missing pages)"
echo "  5. Visit http://localhost/booking/ and check all pages"
echo ""
