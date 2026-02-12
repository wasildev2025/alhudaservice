<?php
/**
 * Custom Home Page Template - Professional Islamic Design
 * Inspired by Ehtesab, Alhambra, Taqwa, Tabligh themes
 *
 * @package Booking_Astra_Child
 */

defined( 'ABSPATH' ) || exit;

get_header();

$whatsapp_number = get_theme_mod( 'booking_whatsapp_number', '966500000000' );
$whatsapp_message = rawurlencode( 'Assalamu Alaikum, I would like to inquire about your services.' );
$whatsapp_link = 'https://wa.me/' . preg_replace( '/[^0-9]/', '', $whatsapp_number ) . '?text=' . $whatsapp_message;
$site_name = get_bloginfo( 'name' );
$site_desc = get_bloginfo( 'description' );
?>

<main id="content" class="site-main booking-home">
	<!-- Top Announcement Bar (Tabligh-style) -->
	<div class="booking-top-bar">
		<div class="booking-container">
			<p>Assalamu Alaikum — Welcome. Book transport, Ziyarat packages, Khajoor & more. <a href="<?php echo esc_url( $whatsapp_link ); ?>" target="_blank">Contact us on WhatsApp</a></p>
		</div>
	</div>

	<!-- Hero Section -->
	<section class="booking-hero-pro">
		<div class="booking-hero-bg"></div>
		<div class="booking-hero-content">
			<p class="booking-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
			<p class="booking-hero-tagline">Bismillah Hir Rahman Nir Rahim</p>
			<h1 class="booking-hero-title"><?php echo esc_html( $site_name ); ?></h1>
			<p class="booking-hero-desc"><?php echo esc_html( $site_desc ); ?></p>
			<div class="booking-cta-group">
				<a href="<?php echo esc_url( home_url( '/pick-drop/' ) ); ?>" class="booking-cta-btn booking-cta-primary">Book Pick & Drop</a>
				<a href="<?php echo esc_url( home_url( '/ziyarat-packages/' ) ); ?>" class="booking-cta-btn booking-cta-secondary">View Packages</a>
				<a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="booking-cta-btn booking-cta-secondary">Shop</a>
				<a href="<?php echo esc_url( home_url( '/donations/' ) ); ?>" class="booking-cta-btn booking-cta-accent">Donate</a>
			</div>
		</div>
	</section>

	<!-- Prayer Times (Tabligh-style) -->
	<section class="booking-section-pro booking-prayer">
		<div class="booking-container">
			<div class="booking-prayer-box">
				<div class="booking-prayer-header">
					<span class="booking-prayer-icon">🕌</span>
					<div>
						<h2>Today's Prayer Times</h2>
						<p class="booking-prayer-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p>
						<p class="booking-prayer-arabic">وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا</p>
					</div>
				</div>
				<div class="booking-prayer-grid">
					<div class="booking-prayer-item"><span class="name">Fajr</span><span class="time">—</span></div>
					<div class="booking-prayer-item"><span class="name">Dhuhr</span><span class="time">—</span></div>
					<div class="booking-prayer-item"><span class="name">Asr</span><span class="time">—</span></div>
					<div class="booking-prayer-item"><span class="name">Maghrib</span><span class="time">—</span></div>
					<div class="booking-prayer-item"><span class="name">Isha</span><span class="time">—</span></div>
				</div>
				<p class="booking-prayer-note"><em>Timings are indicative. Contact us for local prayer schedules.</em></p>
			</div>
		</div>
	</section>

	<!-- Our Services -->
	<section class="booking-section-pro booking-services">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">What We Offer</span>
				<h2>Our Services For You</h2>
				<p>Trusted transport, Ziyarat packages, premium dates, and more — all with Islamic values.</p>
			</div>
			<div class="booking-services-grid">
				<a href="<?php echo esc_url( home_url( '/pick-drop/' ) ); ?>" class="booking-service-card">
					<span class="booking-service-icon">🚗</span>
					<h3>Pick & Drop</h3>
					<p>Airport, hotel & Ziyarat transport. Reliable, on time, comfortable vehicles.</p>
					<span class="booking-service-link">Book Now →</span>
				</a>
				<a href="<?php echo esc_url( home_url( '/ziyarat-packages/' ) ); ?>" class="booking-service-card">
					<span class="booking-service-icon">🕋</span>
					<h3>Ziyarat Packages</h3>
					<p>Makkah, Madinah, Taif & Badr. Curated tours with experienced guides.</p>
					<span class="booking-service-link">View Packages →</span>
				</a>
				<a href="<?php echo esc_url( home_url( '/khajoor/' ) ); ?>" class="booking-service-card">
					<span class="booking-service-icon">🌴</span>
					<h3>Khajoor</h3>
					<p>Premium dates: Ajwa, Safawi, Mabroom. Bulk orders & gift boxes.</p>
					<span class="booking-service-link">Order Now →</span>
				</a>
				<a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="booking-service-card">
					<span class="booking-service-icon">📚</span>
					<h3>Islamic Books</h3>
					<p>Shop our collection of Islamic literature and educational materials.</p>
					<span class="booking-service-link">Visit Shop →</span>
				</a>
			</div>
		</div>
	</section>

	<!-- Featured Packages -->
	<section class="booking-section-pro booking-packages">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Ziyarat</span>
				<h2>Featured Packages</h2>
				<p>Discover our curated packages for Makkah, Madinah, and beyond.</p>
			</div>
			<div class="booking-packages-grid">
				<a href="<?php echo esc_url( home_url( '/ziyarat-packages/' ) ); ?>" class="booking-package-card">
					<div class="booking-package-image" style="background:linear-gradient(135deg, #004d2d 0%, #006B3F 100%);"></div>
					<div class="booking-package-body">
						<h3>Makkah Half Day</h3>
						<p>Visit key sites in Makkah with an experienced guide.</p>
						<span class="booking-package-cta">View Details</span>
					</div>
				</a>
				<a href="<?php echo esc_url( home_url( '/ziyarat-packages/' ) ); ?>" class="booking-package-card">
					<div class="booking-package-image" style="background:linear-gradient(135deg, #006B3F 0%, #028a4f 100%);"></div>
					<div class="booking-package-body">
						<h3>Madinah Ziyarat</h3>
						<p>Full day tour of Madinah's sacred places.</p>
						<span class="booking-package-cta">View Details</span>
					</div>
				</a>
				<a href="<?php echo esc_url( home_url( '/ziyarat-packages/' ) ); ?>" class="booking-package-card">
					<div class="booking-package-image" style="background:linear-gradient(135deg, #9A7B1A 0%, #C9A227 100%);"></div>
					<div class="booking-package-body">
						<h3>Taif & Badr</h3>
						<p>Extended trips to Taif, Badr, and historical sites.</p>
						<span class="booking-package-cta">View Details</span>
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- Why Choose Us -->
	<section class="booking-section-pro booking-trust alt-bg">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Trust</span>
				<h2>Why Choose Us</h2>
				<p>We serve with integrity, transparency, and dedication.</p>
			</div>
			<div class="booking-trust-grid">
				<div class="booking-trust-card">
					<span class="booking-trust-num">01</span>
					<h3>Trusted Service</h3>
					<p>Years of experience serving pilgrims and travelers in Saudi Arabia.</p>
				</div>
				<div class="booking-trust-card">
					<span class="booking-trust-num">02</span>
					<h3>Transparent Pricing</h3>
					<p>No hidden fees. Clear rates for all our services.</p>
				</div>
				<div class="booking-trust-card">
					<span class="booking-trust-num">03</span>
					<h3>24/7 Support</h3>
					<p>Contact us anytime via WhatsApp for quick assistance.</p>
				</div>
				<div class="booking-trust-card">
					<span class="booking-trust-num">04</span>
					<h3>Halal & Ethical</h3>
					<p>We operate with Islamic values in every service we provide.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Donation CTA -->
	<section class="booking-section-pro booking-donate-cta">
		<div class="booking-container">
			<div class="booking-donate-box">
				<h2>We Need Your Support</h2>
				<p>Your Sadaqah and donations help us serve the community. Every contribution makes a difference.</p>
				<a href="<?php echo esc_url( home_url( '/donations/' ) ); ?>" class="booking-cta-btn booking-cta-accent">Donate Now</a>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="booking-section-pro booking-testimonials">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Reviews</span>
				<h2>What Our Customers Say</h2>
			</div>
			<div class="booking-testimonials-grid">
				<blockquote class="booking-testimonial">
					<p>"Excellent pickup service from the airport. Very reliable and on time."</p>
					<footer>— Abdullah, Jeddah</footer>
				</blockquote>
				<blockquote class="booking-testimonial">
					<p>"The Ziyarat package was well organised. Highly recommend for families."</p>
					<footer>— Fatima, Pakistan</footer>
				</blockquote>
				<blockquote class="booking-testimonial">
					<p>"Great quality dates and fast delivery. Will order again!"</p>
					<footer>— Ahmed, Riyadh</footer>
				</blockquote>
			</div>
		</div>
	</section>

	<!-- WhatsApp Strip -->
	<section class="booking-whatsapp-pro">
		<div class="booking-container">
			<p class="booking-whatsapp-text">Need help? We're here for you.</p>
			<a href="<?php echo esc_url( $whatsapp_link ); ?>" target="_blank" rel="noopener" class="booking-whatsapp-btn">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				Chat on WhatsApp
			</a>
		</div>
	</section>
</main>

<?php
get_footer();
