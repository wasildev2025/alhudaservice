<?php
/**
 * Template: Khajoor — Professional Design
 * Slug: khajoor
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>Premium Khajoor (Dates)</h1>
	<p>Finest quality Ajwa, Safawi, Mabroom &amp; more — direct from Madinah</p>
</div>

<main id="content" class="site-main">
	<!-- Products Overview -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Our Collection</span>
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Premium Date Varieties</h2>
			<p style="color:var(--booking-text-light);max-width:520px;margin:0 auto;">Hand-selected, freshly packed dates sourced directly from Madinah farms.</p>
		</div>
		<div class="booking-grid-3">
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🌴</div>
				<h3>Ajwa</h3>
				<p>The Prophet's (ﷺ) favorite. Premium Madinah Ajwa dates, rich and soft.</p>
				<span style="display:inline-block;margin-top:12px;padding:6px 16px;background:var(--booking-gold);color:#fff;border-radius:20px;font-size:0.8rem;font-weight:600;">Most Popular</span>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🌴</div>
				<h3>Safawi</h3>
				<p>Semi-dry, dark-colored dates. Rich taste with a slightly chewy texture.</p>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🌴</div>
				<h3>Mabroom</h3>
				<p>Elongated, soft and chewy. A premium variety loved by connoisseurs.</p>
			</div>
		</div>
		<div class="booking-grid-2" style="margin-top:24px;">
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🌴</div>
				<h3>Sukkari</h3>
				<p>Sweet, soft and golden. Perfect as a dessert or with Arabic coffee.</p>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:3rem;margin-bottom:16px;">🎁</div>
				<h3>Gift Boxes</h3>
				<p>Beautifully packaged assortments — perfect for Hajj/Umrah gifts.</p>
			</div>
		</div>
	</section>

	<!-- Bulk Order -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner">
			<div style="text-align:center;margin-bottom:40px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Wholesale</span>
				<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Bulk Order Inquiry</h2>
				<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">Ordering in large quantities? Get special pricing and delivery options.</p>
			</div>
			<?php echo do_shortcode( '[booking_khajoor_bulk]' ); ?>
		</div>
	</section>

	<!-- Gift Box -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Gifts</span>
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Gift Box Inquiry</h2>
			<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">Custom gift packaging for Hajj, Umrah, Ramadan or any special occasion.</p>
		</div>
		<div style="max-width:680px;margin:0 auto;">
			<?php echo do_shortcode( '[booking_khajoor_gift]' ); ?>
		</div>
	</section>

	<!-- Shop CTA -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner" style="text-align:center;padding:40px 24px;">
			<h2 style="color:var(--booking-green-dark);margin:0 0 12px;">Shop Online</h2>
			<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto 24px;">Browse our full collection on the online store. Order individual packs and gift sets with delivery.</p>
			<a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="booking-btn booking-btn-gold">Visit Store</a>
		</div>
	</section>
</main>

<?php get_footer(); ?>
