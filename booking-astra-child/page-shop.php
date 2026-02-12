<?php
/**
 * Template: Shop — Professional Design
 * Slug: shop
 */
defined( 'ABSPATH' ) || exit;
get_header();
$salla_url = get_option( 'booking_salla_store_url', '#' );
if ( empty( $salla_url ) ) $salla_url = '#';
?>

<div class="booking-page-banner">
	<h1>Shop</h1>
	<p>Islamic books, Khajoor products &amp; more — direct from Saudi Arabia</p>
</div>

<main id="content" class="site-main">
	<!-- Categories -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Categories</span>
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Browse Our Store</h2>
			<p style="color:var(--booking-text-light);max-width:520px;margin:0 auto;">Shop from our curated collection of Islamic products, all sourced with quality and authenticity in mind.</p>
		</div>
		<div class="booking-grid-3">
			<div class="booking-card" style="text-align:center;padding:48px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">📚</div>
				<h3>Islamic Books</h3>
				<p>Quran, Hadith collections, Islamic history, children's books, and more.</p>
				<a href="<?php echo esc_url( $salla_url ); ?>" target="_blank" class="booking-btn booking-btn-outline" style="margin-top:16px;">Browse Books</a>
			</div>
			<div class="booking-card" style="text-align:center;padding:48px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🌴</div>
				<h3>Premium Dates</h3>
				<p>Ajwa, Safawi, Mabroom, Sukkari — freshly packed from Madinah farms.</p>
				<a href="<?php echo esc_url( home_url( '/khajoor/' ) ); ?>" class="booking-btn booking-btn-gold" style="margin-top:16px;">Order Dates</a>
			</div>
			<div class="booking-card" style="text-align:center;padding:48px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🎁</div>
				<h3>Gift Items</h3>
				<p>Hajj/Umrah gift sets, prayer accessories, and souvenirs from the Holy Land.</p>
				<a href="<?php echo esc_url( $salla_url ); ?>" target="_blank" class="booking-btn booking-btn-outline" style="margin-top:16px;">View Gifts</a>
			</div>
		</div>
	</section>

	<!-- Salla Store CTA -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner" style="text-align:center;padding:48px 24px;">
			<div style="font-size:3rem;margin-bottom:16px;">🛒</div>
			<h2 style="color:var(--booking-green-dark);margin:0 0 12px;">Visit Our Online Store</h2>
			<p style="color:var(--booking-text-light);max-width:520px;margin:0 auto 24px;">Our full product catalog is available on our Salla store. Browse, order, and get delivery to your doorstep.</p>
			<a href="<?php echo esc_url( $salla_url ); ?>" target="_blank" class="booking-btn booking-btn-primary" style="padding:16px 40px !important;font-size:1.05rem !important;">Go to Salla Store</a>
			<?php if ( $salla_url === '#' ) : ?><p style="color:var(--booking-text-muted);font-size:0.85rem;margin-top:16px;">Salla store link will be configured in admin Settings.</p><?php endif; ?>
		</div>
	</section>

	<!-- Khajoor Quick Link -->
	<section class="booking-page-section">
		<div class="booking-grid-2" style="max-width:800px;margin:0 auto;">
			<div class="booking-card booking-card-accent">
				<h3>Bulk Orders</h3>
				<p>Need large quantities for events, distribution, or resale? We offer competitive bulk pricing.</p>
				<a href="<?php echo esc_url( home_url( '/khajoor/' ) ); ?>" style="color:var(--booking-gold);font-weight:600;text-decoration:none;">Bulk Inquiry →</a>
			</div>
			<div class="booking-card booking-card-accent">
				<h3>Custom Gifts</h3>
				<p>Beautiful gift boxes with custom packaging for Hajj, Umrah, Ramadan, or any occasion.</p>
				<a href="<?php echo esc_url( home_url( '/khajoor/' ) ); ?>" style="color:var(--booking-gold);font-weight:600;text-decoration:none;">Gift Inquiry →</a>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>
