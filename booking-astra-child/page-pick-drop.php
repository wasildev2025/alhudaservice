<?php
/**
 * Template: Pick & Drop — Professional Design
 * Slug: pick-drop
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>Pick & Drop Service</h1>
	<p>Reliable airport, hotel &amp; Ziyarat transport across Saudi Arabia</p>
</div>

<main id="content" class="site-main">
	<!-- Info Cards -->
	<section class="booking-page-section">
		<div class="booking-grid-3">
			<div class="booking-card booking-card-accent">
				<h3>Airport Transfers</h3>
				<p>Comfortable rides to/from Jeddah, Madinah &amp; Taif airports. We track your flight so we're always on time.</p>
			</div>
			<div class="booking-card booking-card-accent">
				<h3>Hotel &amp; Ziyarat</h3>
				<p>Seamless transport between hotels, Haram, and Ziyarat sites. Available 24/7 for your convenience.</p>
			</div>
			<div class="booking-card booking-card-accent">
				<h3>Group Transport</h3>
				<p>Sedans, vans &amp; Hiace available for any group size. Luggage-friendly with experienced drivers.</p>
			</div>
		</div>
	</section>

	<!-- Booking Form -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner">
			<div style="text-align:center;margin-bottom:40px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Book Now</span>
				<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Request Your Ride</h2>
				<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">Fill in the details below and we will confirm your booking via WhatsApp.</p>
			</div>
			<?php echo do_shortcode( '[booking_pick_drop]' ); ?>
		</div>
	</section>

	<!-- How It Works -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Process</span>
			<h2 style="color:var(--booking-green-dark);margin:0;">How It Works</h2>
		</div>
		<div class="booking-grid-4">
			<div class="booking-card" style="text-align:center;">
				<div style="font-size:2rem;margin-bottom:12px;color:var(--booking-gold);">1</div>
				<h3 style="font-size:1rem;">Submit Request</h3>
				<p>Fill the booking form above with your travel details.</p>
			</div>
			<div class="booking-card" style="text-align:center;">
				<div style="font-size:2rem;margin-bottom:12px;color:var(--booking-gold);">2</div>
				<h3 style="font-size:1rem;">We Confirm</h3>
				<p>Our team contacts you on WhatsApp within minutes.</p>
			</div>
			<div class="booking-card" style="text-align:center;">
				<div style="font-size:2rem;margin-bottom:12px;color:var(--booking-gold);">3</div>
				<h3 style="font-size:1rem;">Driver Assigned</h3>
				<p>A professional driver with the right vehicle is dispatched.</p>
			</div>
			<div class="booking-card" style="text-align:center;">
				<div style="font-size:2rem;margin-bottom:12px;color:var(--booking-gold);">4</div>
				<h3 style="font-size:1rem;">Enjoy Your Ride</h3>
				<p>Sit back and travel safely to your destination.</p>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>
