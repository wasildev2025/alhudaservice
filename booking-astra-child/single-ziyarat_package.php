<?php
/**
 * Single Ziyarat Package — Professional Design
 */
defined( 'ABSPATH' ) || exit;
get_header();

while ( have_posts() ) {
	the_post();
	$id        = get_the_ID();
	$city      = get_post_meta( $id, '_ziyarat_city', true );
	$duration  = get_post_meta( $id, '_ziyarat_duration', true );
	$price     = get_post_meta( $id, '_ziyarat_price', true );
	$includes  = get_post_meta( $id, '_ziyarat_includes', true );
	$excludes  = get_post_meta( $id, '_ziyarat_excludes', true );
	$itinerary = get_post_meta( $id, '_ziyarat_itinerary', true );
	$pickup    = get_post_meta( $id, '_ziyarat_pickup_rules', true );
	?>

	<!-- Banner -->
	<div class="booking-page-banner" style="padding:48px 24px;">
		<?php if ( $city ) : ?><span style="display:inline-block;background:var(--booking-gold);color:#fff;padding:4px 16px;border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:12px;position:relative;"><?php echo esc_html( $city ); ?></span><?php endif; ?>
		<h1><?php the_title(); ?></h1>
		<p>
			<?php if ( $duration ) : ?>Duration: <?php echo esc_html( $duration ); ?><?php endif; ?>
			<?php if ( $duration && $price ) : ?> &nbsp;|&nbsp; <?php endif; ?>
			<?php if ( $price ) : ?>Price: <?php echo esc_html( $price ); ?><?php endif; ?>
		</p>
	</div>

	<main id="content" class="site-main">
		<!-- Featured Image + Description -->
		<section class="booking-page-section">
			<?php if ( has_post_thumbnail() ) : ?>
				<div style="max-width:900px;margin:0 auto 32px;border-radius:var(--booking-radius);overflow:hidden;box-shadow:var(--booking-shadow-md);">
					<?php the_post_thumbnail( 'large', array( 'style' => 'width:100%;height:auto;display:block;' ) ); ?>
				</div>
			<?php endif; ?>

			<div style="max-width:800px;margin:0 auto;">
				<!-- Meta Pills -->
				<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:32px;">
					<?php if ( $city ) : ?><span class="booking-pill"><strong>City:</strong> <?php echo esc_html( $city ); ?></span><?php endif; ?>
					<?php if ( $duration ) : ?><span class="booking-pill"><strong>Duration:</strong> <?php echo esc_html( $duration ); ?></span><?php endif; ?>
					<?php if ( $price ) : ?><span class="booking-pill booking-pill-gold"><strong>Price:</strong> <?php echo esc_html( $price ); ?></span><?php endif; ?>
				</div>

				<!-- Description -->
				<div class="booking-card" style="margin-bottom:24px;">
					<h3 style="margin-top:0;">Package Description</h3>
					<div style="color:var(--booking-text-light);line-height:1.8;"><?php the_content(); ?></div>
				</div>

				<!-- Details Grid -->
				<div class="booking-grid-2" style="margin-bottom:24px;">
					<?php if ( $includes ) : ?>
					<div class="booking-card booking-card-accent">
						<h3 style="margin-top:0;color:var(--booking-green);">✓ Includes</h3>
						<div style="white-space:pre-wrap;color:var(--booking-text-light);line-height:1.8;"><?php echo esc_html( $includes ); ?></div>
					</div>
					<?php endif; ?>
					<?php if ( $excludes ) : ?>
					<div class="booking-card" style="border-left:4px solid #e74c3c;">
						<h3 style="margin-top:0;color:#c0392b;">✗ Excludes</h3>
						<div style="white-space:pre-wrap;color:var(--booking-text-light);line-height:1.8;"><?php echo esc_html( $excludes ); ?></div>
					</div>
					<?php endif; ?>
				</div>

				<?php if ( $itinerary ) : ?>
				<div class="booking-card" style="margin-bottom:24px;">
					<h3 style="margin-top:0;">📍 Itinerary</h3>
					<div style="white-space:pre-wrap;color:var(--booking-text-light);line-height:1.8;"><?php echo esc_html( $itinerary ); ?></div>
				</div>
				<?php endif; ?>

				<?php if ( $pickup ) : ?>
				<div class="booking-card" style="margin-bottom:24px;background:var(--booking-cream);">
					<h3 style="margin-top:0;">🚗 Pickup Rules</h3>
					<p style="color:var(--booking-text-light);margin:0;line-height:1.8;"><?php echo esc_html( $pickup ); ?></p>
				</div>
				<?php endif; ?>
			</div>
		</section>

		<!-- Inquiry Form -->
		<section class="booking-page-section bg-cream">
			<div class="booking-inner">
				<div style="text-align:center;margin-bottom:40px;">
					<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Book Now</span>
					<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Inquiry Form</h2>
					<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">Fill in your details and we'll confirm availability via WhatsApp.</p>
				</div>
				<?php echo do_shortcode( '[booking_ziyarat package_id="' . $id . '"]' ); ?>
			</div>
		</section>

		<!-- Back to Packages -->
		<section class="booking-page-section" style="text-align:center;padding:32px 24px;">
			<a href="<?php echo esc_url( home_url( '/ziyarat-packages/' ) ); ?>" class="booking-btn booking-btn-outline">← Back to All Packages</a>
		</section>
	</main>

	<?php
}

get_footer();
?>

<style>
.booking-pill {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 8px 16px;
	background: var(--booking-cream, #FAF9F6);
	border: 1px solid var(--booking-border, #e8e6e1);
	border-radius: 20px;
	font-size: 0.9rem;
	color: var(--booking-text, #2d2d2d);
}
.booking-pill-gold {
	background: var(--booking-gold, #C9A227);
	color: #fff;
	border-color: var(--booking-gold, #C9A227);
}
.booking-pill-gold strong { color: rgba(255,255,255,0.9); }
</style>
