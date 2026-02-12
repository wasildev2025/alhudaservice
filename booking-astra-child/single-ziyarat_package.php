<?php
/**
 * Single Ziyarat Package template - shows package details + inquiry form
 */
defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) {
	the_post();
	$id = get_the_ID();
	$city = get_post_meta( $id, '_ziyarat_city', true );
	$duration = get_post_meta( $id, '_ziyarat_duration', true );
	$price = get_post_meta( $id, '_ziyarat_price', true );
	$includes = get_post_meta( $id, '_ziyarat_includes', true );
	$excludes = get_post_meta( $id, '_ziyarat_excludes', true );
	$itinerary = get_post_meta( $id, '_ziyarat_itinerary', true );
	$pickup_rules = get_post_meta( $id, '_ziyarat_pickup_rules', true );
	?>
	<main id="content" class="site-main ast-container">
		<article class="ziyarat-package-single">
			<h1><?php the_title(); ?></h1>
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="package-image"><?php the_post_thumbnail( 'large' ); ?></div>
			<?php endif; ?>
			<div class="package-meta" style="display:flex;gap:24px;margin:16px 0;flex-wrap:wrap;">
				<?php if ( $city ) : ?><span><strong>City:</strong> <?php echo esc_html( $city ); ?></span><?php endif; ?>
				<?php if ( $duration ) : ?><span><strong>Duration:</strong> <?php echo esc_html( $duration ); ?></span><?php endif; ?>
				<?php if ( $price ) : ?><span><strong>Price:</strong> <?php echo esc_html( $price ); ?></span><?php endif; ?>
			</div>
			<div class="package-content"><?php the_content(); ?></div>
			<?php if ( $includes ) : ?>
				<h3>Includes</h3>
				<div style="white-space:pre-wrap;"><?php echo esc_html( $includes ); ?></div>
			<?php endif; ?>
			<?php if ( $excludes ) : ?>
				<h3>Excludes</h3>
				<div style="white-space:pre-wrap;"><?php echo esc_html( $excludes ); ?></div>
			<?php endif; ?>
			<?php if ( $itinerary ) : ?>
				<h3>Itinerary</h3>
				<div style="white-space:pre-wrap;"><?php echo esc_html( $itinerary ); ?></div>
			<?php endif; ?>
			<?php if ( $pickup_rules ) : ?>
				<h3>Pickup Rules</h3>
				<p><?php echo esc_html( $pickup_rules ); ?></p>
			<?php endif; ?>
			<hr style="margin:32px 0;">
			<h2>Book Now / Inquiry</h2>
			<?php echo do_shortcode( '[booking_ziyarat package_id="' . $id . '"]' ); ?>
		</article>
	</main>
	<?php
}

get_footer();
