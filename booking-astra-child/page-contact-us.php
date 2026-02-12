<?php
/**
 * Template: Contact Us — Professional Design
 * Slug: contact-us
 */
defined( 'ABSPATH' ) || exit;
get_header();

$wa_number = get_theme_mod( 'booking_whatsapp_number', '966500000000' );
$wa_clean = preg_replace( '/[^0-9]/', '', $wa_number );
$settings = get_option( 'booking_forms_settings', array() );
$phone = $settings['phone'] ?? '';
$email = $settings['email'] ?? '';
$hours = $settings['working_hours'] ?? '24/7';
?>

<div class="booking-page-banner">
	<h1>Contact Us</h1>
	<p>We'd love to hear from you — reach out anytime</p>
</div>

<main id="content" class="site-main">
	<!-- Contact Info Cards -->
	<section class="booking-page-section">
		<div class="booking-grid-3">
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:2.5rem;margin-bottom:12px;">💬</div>
				<h3>WhatsApp</h3>
				<p>The fastest way to reach us.<br>Available <?php echo esc_html( $hours ); ?></p>
				<a href="https://wa.me/<?php echo esc_attr( $wa_clean ); ?>" target="_blank" class="booking-btn booking-btn-primary" style="margin-top:12px;">Chat Now</a>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:2.5rem;margin-bottom:12px;">📞</div>
				<h3>Phone</h3>
				<p>Call us directly for urgent inquiries.</p>
				<?php if ( $phone ) : ?>
					<a href="tel:<?php echo esc_attr( $phone ); ?>" class="booking-btn booking-btn-outline" style="margin-top:12px;"><?php echo esc_html( $phone ); ?></a>
				<?php else : ?>
					<p style="color:var(--booking-text-muted);font-size:0.9rem;">Contact via WhatsApp</p>
				<?php endif; ?>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:2.5rem;margin-bottom:12px;">📧</div>
				<h3>Email</h3>
				<p>For formal inquiries and documentation.</p>
				<?php if ( $email ) : ?>
					<a href="mailto:<?php echo esc_attr( $email ); ?>" class="booking-btn booking-btn-outline" style="margin-top:12px;"><?php echo esc_html( $email ); ?></a>
				<?php else : ?>
					<p style="color:var(--booking-text-muted);font-size:0.9rem;">Contact via WhatsApp</p>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<!-- Contact Form -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner">
			<div style="text-align:center;margin-bottom:40px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Message</span>
				<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Send Us a Message</h2>
				<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">We aim to respond within 24 hours.</p>
			</div>
			<?php echo do_shortcode( '[booking_contact]' ); ?>
		</div>
	</section>

	<!-- Location / Info -->
	<section class="booking-page-section">
		<div class="booking-grid-2" style="max-width:800px;margin:0 auto;">
			<div class="booking-card booking-card-accent">
				<h3>Location</h3>
				<p>Based in Saudi Arabia, serving Makkah, Madinah, Jeddah, Taif, and surrounding areas.</p>
			</div>
			<div class="booking-card booking-card-accent">
				<h3>Working Hours</h3>
				<p><?php echo esc_html( $hours ); ?> — We're here when you need us. WhatsApp is the quickest way to connect.</p>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>
