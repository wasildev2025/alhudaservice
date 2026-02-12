<?php
/**
 * Template: Privacy Policy — Professional Design
 * Slug: privacy-policy
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>Privacy Policy</h1>
	<p>How we collect, use, and protect your personal information</p>
</div>

<main id="content" class="site-main">
	<section class="booking-page-section" style="max-width:800px;margin:0 auto;">
		<div class="booking-card" style="padding:40px;">
			<h2 style="margin-top:0;">Information We Collect</h2>
			<p>When you use our booking forms, contact form, or inquiry forms, we collect the following personal data:</p>
			<ul style="color:var(--booking-text-light);line-height:2;">
				<li>Full name</li>
				<li>Phone number / WhatsApp number</li>
				<li>Email address (contact form only)</li>
				<li>Booking details (dates, locations, preferences)</li>
			</ul>

			<h2>How We Use Your Data</h2>
			<p>Your data is used exclusively for:</p>
			<ul style="color:var(--booking-text-light);line-height:2;">
				<li>Processing your bookings, inquiries, and orders</li>
				<li>Contacting you via WhatsApp or phone to confirm services</li>
				<li>Improving our services based on aggregate, anonymized usage patterns</li>
			</ul>

			<h2>Data Storage &amp; Security</h2>
			<p>All data is stored securely in our database. We implement standard security measures including encrypted connections (SSL), access controls, and regular backups. Only authorized team members can access your data.</p>

			<h2>Third-Party Sharing</h2>
			<p>We do not sell, trade, or share your personal data with third parties. Your information stays with us and is used only for the purposes stated above.</p>

			<h2>Cookies</h2>
			<p>Our website uses standard WordPress cookies for session management and basic analytics. No personally identifiable information is stored in cookies.</p>

			<h2>Your Rights</h2>
			<p>You have the right to:</p>
			<ul style="color:var(--booking-text-light);line-height:2;">
				<li>Request access to your personal data</li>
				<li>Request correction or deletion of your data</li>
				<li>Withdraw consent for data processing</li>
			</ul>
			<p>To exercise these rights, <a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>">contact us</a>.</p>

			<h2>Changes to This Policy</h2>
			<p>We may update this privacy policy from time to time. Changes will be reflected on this page with an updated date.</p>

			<p style="color:var(--booking-text-muted);margin-top:32px;font-size:0.9rem;"><em>Last updated: <?php echo esc_html( date_i18n( 'F Y' ) ); ?></em></p>
		</div>
	</section>
</main>

<?php get_footer(); ?>
