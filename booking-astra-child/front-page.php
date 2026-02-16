<?php
/**
 * Custom Home Page Template — Premium Al-Huda Design v3.0
 * Cinematic hero, glass cards, SVG icons, scroll animations
 *
 * @package Booking_Astra_Child
 */

defined('ABSPATH') || exit;

get_header();

$whatsapp_number = get_theme_mod('booking_whatsapp_number', '966500000000');
$whatsapp_message = rawurlencode('Assalamu Alaikum, I would like to inquire about your services.');
$whatsapp_link = 'https://wa.me/' . preg_replace('/[^0-9]/', '', $whatsapp_number) . '?text=' . $whatsapp_message;
$site_name = get_bloginfo('name');
$site_desc = get_bloginfo('description');
?>

<main id="content" class="site-main booking-home">
	<!-- Top Announcement Bar -->
	<div class="booking-top-bar">
		<div class="booking-container">
			<p>Assalamu Alaikum — Welcome. Book transport, Ziyarat packages, Khajoor & more. <a
					href="<?php echo esc_url($whatsapp_link); ?>" target="_blank">Contact us on WhatsApp</a></p>
		</div>
	</div>

	<!-- Hero Section — Cinematic -->
	<section class="booking-hero-pro">
		<div class="booking-hero-bg"></div>
		<div class="booking-hero-content">
			<p class="booking-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
			<p class="booking-hero-tagline">Bismillah Hir Rahman Nir Rahim</p>
			<h1 class="booking-hero-title"><?php echo esc_html($site_name); ?></h1>
			<p class="booking-hero-desc"><?php echo esc_html($site_desc); ?></p>
			<div class="booking-cta-group">
				<a href="<?php echo esc_url(home_url('/pick-drop/')); ?>"
					class="booking-cta-btn booking-cta-primary">Book Pick & Drop</a>
				<a href="<?php echo esc_url(home_url('/ziyarat-packages/')); ?>"
					class="booking-cta-btn booking-cta-secondary">View Packages</a>
				<a href="<?php echo esc_url(home_url('/shop/')); ?>"
					class="booking-cta-btn booking-cta-secondary">Shop</a>
				<a href="<?php echo esc_url(home_url('/donations/')); ?>"
					class="booking-cta-btn booking-cta-accent">Donate</a>
			</div>
		</div>
	</section>

	<!-- Prayer Times -->
	<section class="booking-section-pro booking-prayer booking-animate">
		<div class="booking-container">
			<div class="booking-prayer-box">
				<div class="booking-prayer-header">
					<span class="booking-prayer-icon">🕌</span>
					<div>
						<h2>Today's Prayer Times</h2>
						<p class="booking-prayer-date"><?php echo esc_html(date_i18n('l, j F Y')); ?></p>
						<p class="booking-prayer-arabic">وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا</p>
					</div>
				</div>
				<div class="booking-prayer-grid">
					<?php
					$times = booking_get_prayer_times();
					$labels = array('Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha');
					$icons = array('Fajr' => '🌙', 'Dhuhr' => '☀️', 'Asr' => '🌤️', 'Maghrib' => '🌅', 'Isha' => '🌠');
					foreach ($labels as $l):
						$val = ($times && !empty($times[$l])) ? $times[$l] : '--:--';
						?>
						<div class="booking-prayer-item">
							<span class="prayer-icon"><?php echo $icons[$l]; ?></span>
							<span class="name"><?php echo $l; ?></span>
							<span class="time"><?php echo $val; ?></span>
						</div>
					<?php endforeach; ?>
				</div>
				<p class="booking-prayer-note"><em>Timings are indicative. Contact us for local prayer schedules.</em>
				</p>
			</div>
		</div>
	</section>

	<!-- Our Services -->
	<section class="booking-section-pro booking-services booking-animate">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">What We Offer</span>
				<h2>Our Services For You</h2>
				<p>Trusted transport, Ziyarat packages, premium dates, and more — all with Islamic values.</p>
			</div>
			<div class="booking-services-grid">
				<a href="<?php echo esc_url(home_url('/pick-drop/')); ?>"
					class="booking-service-card booking-animate booking-animate-delay-1">
					<span class="booking-service-icon">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
						</svg>
					</span>
					<h3>Pick & Drop</h3>
					<p>Airport, hotel & Ziyarat transport. Reliable, on time, comfortable vehicles.</p>
					<span class="booking-service-link">Book Now →</span>
				</a>
				<a href="<?php echo esc_url(home_url('/ziyarat-packages/')); ?>"
					class="booking-service-card booking-animate booking-animate-delay-2">
					<span class="booking-service-icon">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
							<path d="M12 5.5l-3 5h6z" />
						</svg>
					</span>
					<h3>Ziyarat Packages</h3>
					<p>Makkah, Madinah, Taif & Badr. Curated tours with experienced guides.</p>
					<span class="booking-service-link">View Packages →</span>
				</a>
				<a href="<?php echo esc_url(home_url('/khajoor/')); ?>"
					class="booking-service-card booking-animate booking-animate-delay-3">
					<span class="booking-service-icon">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.7c.67.86 1.64 1.52 2.78 1.86A4.07 4.07 0 0 0 12 21c.83 0 1.63-.21 2.33-.6a5.02 5.02 0 0 0 3.49-1.74l.95 2.7 1.89-.66C18.1 16.17 17 10 17 8zM10.5 18.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
							<path d="M12 2C9.24 2 7 4.24 7 7h2c0-1.65 1.35-3 3-3s3 1.35 3 3h2c0-2.76-2.24-5-5-5z" />
						</svg>
					</span>
					<h3>Khajoor</h3>
					<p>Premium dates: Ajwa, Safawi, Mabroom. Bulk orders & gift boxes.</p>
					<span class="booking-service-link">Order Now →</span>
				</a>
				<a href="<?php echo esc_url(home_url('/shop/')); ?>"
					class="booking-service-card booking-animate booking-animate-delay-4">
					<span class="booking-service-icon">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
						</svg>
					</span>
					<h3>Islamic Books</h3>
					<p>Shop our collection of Islamic literature and educational materials.</p>
					<span class="booking-service-link">Visit Shop →</span>
				</a>
			</div>
		</div>
	</section>

	<!-- Featured Packages -->
	<section class="booking-section-pro booking-packages booking-animate">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Ziyarat</span>
				<h2>Featured Packages</h2>
				<p>Discover our curated packages for Makkah, Madinah, and beyond.</p>
			</div>
			<div class="booking-packages-grid">
				<?php
				$featured_packages = new WP_Query(array(
					'post_type' => 'ziyarat_package',
					'posts_per_page' => 3,
					'post_status' => 'publish',
					'orderby' => 'menu_order date',
				));

				if ($featured_packages->have_posts()):
					while ($featured_packages->have_posts()):
						$featured_packages->the_post();
						$thumb = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
						$city = get_post_meta(get_the_ID(), '_ziyarat_city', true);
						?>
						<a href="<?php the_permalink(); ?>" class="booking-package-card booking-animate">
							<div class="booking-package-image"
								style="background:<?php echo $thumb ? 'url(' . esc_url($thumb) . ') center/cover' : 'linear-gradient(135deg, var(--booking-brown) 0%, var(--booking-brown-light) 100%)'; ?>;">
								<?php if ($city): ?><span
										class="booking-package-badge"><?php echo esc_html($city); ?></span><?php endif; ?>
							</div>
							<div class="booking-package-body">
								<h3><?php the_title(); ?></h3>
								<p><?php echo wp_trim_words(get_the_excerpt(), 10); ?></p>
								<span class="booking-package-cta">View Details →</span>
							</div>
						</a>
						<?php
					endwhile;
					wp_reset_postdata();
				else:
					?>
					<div class="booking-card" style="grid-column:1/-1;text-align:center;padding:40px;">
						<p style="color:var(--booking-text-muted);">No packages added yet. Please add them in the Admin
							Panel.</p>
					</div>
					<?php
				endif;
				?>
			</div>
		</div>
	</section>

	<!-- Shop Showcase: Books & Dates -->
	<section class="booking-section-pro booking-shop-showcase alt-bg booking-animate">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Our Shop</span>
				<h2>Featured Items</h2>
				<p>Explore our selection of premium Islamic books and Madinah dates.</p>
			</div>

			<div class="booking-grid-2">
				<!-- Featured Books -->
				<div class="booking-card booking-animate booking-animate-delay-1">
					<div class="booking-shop-img"
						style="background: linear-gradient(135deg, var(--booking-brown-dark), var(--booking-brown));">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							style="width:64px;height:64px;fill:rgba(255,255,255,0.85);filter:drop-shadow(0 2px 8px rgba(0,0,0,0.2))">
							<path
								d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
						</svg>
					</div>
					<div class="booking-shop-body">
						<h3>Islamic Books Collection</h3>
						<p>Authentic literature, Quran, and educational resources direct to you.</p>
						<a href="<?php echo esc_url(home_url('/shop/')); ?>" class="booking-btn booking-btn-outline"
							style="width:100%;">Browse Books</a>
					</div>
				</div>
				<!-- Premium Dates -->
				<div class="booking-card booking-animate booking-animate-delay-2">
					<div class="booking-shop-img"
						style="background: linear-gradient(135deg, var(--booking-brown), var(--booking-brown-light));">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							style="width:64px;height:64px;fill:rgba(255,255,255,0.85);filter:drop-shadow(0 2px 8px rgba(0,0,0,0.2))">
							<path
								d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.7c.67.86 1.64 1.52 2.78 1.86A4.07 4.07 0 0 0 12 21c.83 0 1.63-.21 2.33-.6a5.02 5.02 0 0 0 3.49-1.74l.95 2.7 1.89-.66C18.1 16.17 17 10 17 8zM10.5 18.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
							<path d="M12 2C9.24 2 7 4.24 7 7h2c0-1.65 1.35-3 3-3s3 1.35 3 3h2c0-2.76-2.24-5-5-5z" />
						</svg>
					</div>
					<div class="booking-shop-body">
						<h3>Premium Madinah Dates</h3>
						<p>Finest Ajwa, Safawi, and Mabroom dates sourced from the Holy City.</p>
						<a href="<?php echo esc_url(home_url('/khajoor/')); ?>" class="booking-btn booking-btn-gold"
							style="width:100%;">Order Dates</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Why Choose Us -->
	<section class="booking-section-pro booking-trust booking-animate">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Trust</span>
				<h2>Why Choose Us</h2>
				<p>We serve with integrity, transparency, and dedication.</p>
			</div>
			<div class="booking-trust-grid">
				<div class="booking-trust-card booking-animate booking-animate-delay-1">
					<span class="booking-trust-num">01</span>
					<h3>Trusted Service</h3>
					<p>Years of experience serving pilgrims and travelers in Saudi Arabia.</p>
				</div>
				<div class="booking-trust-card booking-animate booking-animate-delay-2">
					<span class="booking-trust-num">02</span>
					<h3>Transparent Pricing</h3>
					<p>No hidden fees. Clear rates for all our services.</p>
				</div>
				<div class="booking-trust-card booking-animate booking-animate-delay-3">
					<span class="booking-trust-num">03</span>
					<h3>24/7 Support</h3>
					<p>Contact us anytime via WhatsApp for quick assistance.</p>
				</div>
				<div class="booking-trust-card booking-animate booking-animate-delay-4">
					<span class="booking-trust-num">04</span>
					<h3>Halal & Ethical</h3>
					<p>We operate with Islamic values in every service we provide.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Donation CTA -->
	<section class="booking-section-pro booking-donate-cta booking-animate">
		<div class="booking-container">
			<div class="booking-donate-box">
				<h2>We Need Your Support</h2>
				<p>Your Sadaqah and donations help us serve the community. Every contribution makes a difference.</p>
				<a href="<?php echo esc_url(home_url('/donations/')); ?>"
					class="booking-cta-btn booking-cta-accent">Donate Now</a>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="booking-section-pro booking-testimonials booking-animate">
		<div class="booking-container">
			<div class="booking-section-header">
				<span class="booking-section-label">Reviews</span>
				<h2>What Our Customers Say</h2>
			</div>
			<div class="booking-testimonials-grid">
				<blockquote class="booking-testimonial booking-animate booking-animate-delay-1">
					<span class="booking-testimonial-stars">★★★★★</span>
					<p>"Excellent pickup service from the airport. Very reliable and on time."</p>
					<footer>— Abdullah, Jeddah</footer>
				</blockquote>
				<blockquote class="booking-testimonial booking-animate booking-animate-delay-2">
					<span class="booking-testimonial-stars">★★★★★</span>
					<p>"The Ziyarat package was well organised. Highly recommend for families."</p>
					<footer>— Fatima, Pakistan</footer>
				</blockquote>
				<blockquote class="booking-testimonial booking-animate booking-animate-delay-3">
					<span class="booking-testimonial-stars">★★★★★</span>
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
			<a href="<?php echo esc_url($whatsapp_link); ?>" target="_blank" rel="noopener"
				class="booking-whatsapp-btn">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				Chat on WhatsApp
			</a>
		</div>
	</section>
</main>

<?php
get_footer();
