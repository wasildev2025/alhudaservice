<?php
/**
 * Template: Terms & Conditions — Professional Design
 * Slug: terms-conditions
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>Terms &amp; Conditions</h1>
	<p>Please read our terms carefully before using our services</p>
</div>

<main id="content" class="site-main">
	<section class="booking-page-section" style="max-width:800px;margin:0 auto;">
		<div class="booking-card" style="padding:40px;">
			<h2 style="margin-top:0;">1. General Terms</h2>
			<p>By using our services (transport, Ziyarat packages, Khajoor sales, donations), you agree to the following terms and conditions. These terms apply to all users of our website and services.</p>

			<h2>2. Booking &amp; Cancellation</h2>
			<p>All bookings are subject to availability. Once confirmed via WhatsApp, cancellations must be made at least 24 hours in advance. Late cancellations may incur charges depending on the service.</p>

			<h2>3. Pick &amp; Drop Service</h2>
			<p>Transport bookings are confirmed via WhatsApp after submission. We strive to be on time but cannot guarantee against delays caused by traffic or unforeseen circumstances. Waiting charges may apply after 30 minutes.</p>

			<h2>4. Ziyarat Packages</h2>
			<p>Package itineraries are indicative and may change based on weather, road conditions, or site closures. Full payment or deposit is required before the tour date as communicated by our team.</p>

			<h2>5. Khajoor &amp; Products</h2>
			<p>Product quality is guaranteed. If you receive damaged goods, contact us within 48 hours with photos for a replacement or refund. Delivery times are estimates and may vary by location.</p>

			<h2>6. Donations</h2>
			<p>All donations are voluntary. We aim to use funds as specified by the donor. Donation receipts can be provided upon request.</p>

			<h2>7. Privacy</h2>
			<p>Your personal data is used only to process your bookings, inquiries, and orders. See our <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a> for full details.</p>

			<h2>8. Changes to Terms</h2>
			<p>We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>

			<p style="color:var(--booking-text-muted);margin-top:32px;font-size:0.9rem;"><em>Last updated: <?php echo esc_html( date_i18n( 'F Y' ) ); ?></em></p>
		</div>
	</section>
</main>

<?php get_footer(); ?>
