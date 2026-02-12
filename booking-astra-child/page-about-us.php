<?php
/**
 * Template: About Us — Professional Design
 * Slug: about-us
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>About Us</h1>
	<p>Serving pilgrims &amp; travelers with trust, excellence, and Islamic values</p>
</div>

<main id="content" class="site-main">
	<!-- Story -->
	<section class="booking-page-section">
		<div class="booking-grid-2" style="align-items:center;gap:48px;">
			<div>
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Our Story</span>
				<h2 style="color:var(--booking-green-dark);margin:0 0 16px;">Who We Are</h2>
				<p style="color:var(--booking-text-light);line-height:1.8;">We are a team of dedicated professionals based in Saudi Arabia, serving pilgrims and travelers with excellence. Our services span transport, guided Ziyarat tours, premium Khajoor (dates), Islamic books, and community donation programs.</p>
				<p style="color:var(--booking-text-light);line-height:1.8;">Every service we provide is rooted in Islamic values — honesty, transparency, and a genuine desire to serve the Ummah. Whether you're visiting for Hajj, Umrah, or business, we're here to make your journey comfortable and blessed.</p>
			</div>
			<div class="booking-card" style="background:linear-gradient(135deg, var(--booking-green-dark), var(--booking-green));padding:48px;text-align:center;color:#fff;border:none;">
				<p style="font-family:'Amiri',serif;font-size:2rem;color:rgba(255,255,255,0.95);margin:0 0 16px;line-height:1.5;">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
				<p style="color:rgba(255,255,255,0.85);margin:0;">In the Name of Allah, the Most Gracious, the Most Merciful</p>
			</div>
		</div>
	</section>

	<!-- Values -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner">
			<div style="text-align:center;margin-bottom:40px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Values</span>
				<h2 style="color:var(--booking-green-dark);margin:0;">Our Core Values</h2>
			</div>
			<div class="booking-grid-4">
				<div class="booking-card" style="text-align:center;padding:32px 20px;">
					<div style="font-size:2.5rem;margin-bottom:12px;">🤝</div>
					<h3 style="font-size:1rem;">Trust</h3>
					<p>Transparent pricing, honest dealings, and reliable service you can count on.</p>
				</div>
				<div class="booking-card" style="text-align:center;padding:32px 20px;">
					<div style="font-size:2.5rem;margin-bottom:12px;">⭐</div>
					<h3 style="font-size:1rem;">Excellence</h3>
					<p>We strive for the highest quality in every service we deliver.</p>
				</div>
				<div class="booking-card" style="text-align:center;padding:32px 20px;">
					<div style="font-size:2.5rem;margin-bottom:12px;">💚</div>
					<h3 style="font-size:1rem;">Islamic Ethics</h3>
					<p>Halal practices, fair trade, and community-first mindset in all our work.</p>
				</div>
				<div class="booking-card" style="text-align:center;padding:32px 20px;">
					<div style="font-size:2.5rem;margin-bottom:12px;">🌍</div>
					<h3 style="font-size:1rem;">Community</h3>
					<p>Serving the global Muslim community with care and dedication.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Summary -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Services</span>
			<h2 style="color:var(--booking-green-dark);margin:0;">What We Offer</h2>
		</div>
		<div class="booking-grid-2" style="max-width:800px;margin:0 auto;">
			<div class="booking-card booking-card-accent"><h3>Pick & Drop</h3><p>Airport, hotel, and Ziyarat transport with professional drivers.</p></div>
			<div class="booking-card booking-card-accent"><h3>Ziyarat Packages</h3><p>Guided tours to Makkah, Madinah, Taif, Badr, and historical sites.</p></div>
			<div class="booking-card booking-card-accent"><h3>Khajoor & Shop</h3><p>Premium dates, Islamic books, and gift items from Saudi Arabia.</p></div>
			<div class="booking-card booking-card-accent"><h3>Donations</h3><p>Community support through Sadaqah collection and distribution.</p></div>
		</div>
	</section>

	<!-- CTA -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner" style="text-align:center;padding:40px 24px;">
			<h2 style="color:var(--booking-green-dark);margin:0 0 12px;">Ready to Get Started?</h2>
			<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto 24px;">Browse our services or contact us directly — we'd love to help.</p>
			<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
				<a href="<?php echo esc_url( home_url( '/pick-drop/' ) ); ?>" class="booking-btn booking-btn-primary">Book Transport</a>
				<a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>" class="booking-btn booking-btn-outline">Contact Us</a>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>
