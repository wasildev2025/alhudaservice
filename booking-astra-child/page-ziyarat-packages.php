<?php
/**
 * Template: Ziyarat Packages — Professional Design
 * Slug: ziyarat-packages
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>Ziyarat Packages</h1>
	<p>Curated guided tours to the sacred sites of Makkah, Madinah, Taif &amp; beyond</p>
</div>

<main id="content" class="site-main">
	<!-- Packages Listing -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Explore</span>
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Available Packages</h2>
			<p style="color:var(--booking-text-light);max-width:520px;margin:0 auto;">Choose from our professionally curated Ziyarat tours with experienced guides.</p>
		</div>
		<?php echo do_shortcode( '[booking_ziyarat_list]' ); ?>
	</section>

	<!-- Inquiry Form -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner">
			<div style="text-align:center;margin-bottom:40px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Inquire</span>
				<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">General Inquiry</h2>
				<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">Can't find the right package? Send us an inquiry and we'll create a custom tour for you.</p>
			</div>
			<?php echo do_shortcode( '[booking_ziyarat]' ); ?>
		</div>
	</section>

	<!-- Why Book With Us -->
	<section class="booking-page-section">
		<div class="booking-grid-3">
			<div class="booking-card booking-card-accent">
				<h3>Experienced Guides</h3>
				<p>Our guides are knowledgeable about Islamic history and speak multiple languages.</p>
			</div>
			<div class="booking-card booking-card-accent">
				<h3>Comfortable Transport</h3>
				<p>Air-conditioned vehicles, comfortable seating, and door-to-door pickup service.</p>
			</div>
			<div class="booking-card booking-card-accent">
				<h3>Flexible Scheduling</h3>
				<p>Choose your preferred date and time. We accommodate individual and group requests.</p>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>
