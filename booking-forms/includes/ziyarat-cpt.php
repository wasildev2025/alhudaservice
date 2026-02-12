<?php
/**
 * Ziyarat Package Custom Post Type
 */
defined( 'ABSPATH' ) || exit;

add_action( 'init', 'booking_forms_ziyarat_cpt' );
function booking_forms_ziyarat_cpt() {
	register_post_type( 'ziyarat_package', array(
		'labels' => array(
			'name' => 'Ziyarat Packages',
			'singular_name' => 'Ziyarat Package',
			'add_new' => 'Add Package',
			'add_new_item' => 'Add New Package',
			'edit_item' => 'Edit Package',
		),
		'public' => true,
		'has_archive' => true,
		'rewrite' => array( 'slug' => 'packages' ),
		'supports' => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
		'menu_icon' => 'dashicons-location-alt',
	) );
}

add_action( 'add_meta_boxes', 'booking_forms_ziyarat_meta' );
function booking_forms_ziyarat_meta() {
	add_meta_box( 'ziyarat_details', 'Package Details', 'booking_forms_ziyarat_meta_cb', 'ziyarat_package', 'normal' );
}

function booking_forms_ziyarat_meta_cb( $post ) {
	$city = get_post_meta( $post->ID, '_ziyarat_city', true );
	$duration = get_post_meta( $post->ID, '_ziyarat_duration', true );
	$price = get_post_meta( $post->ID, '_ziyarat_price', true );
	$includes = get_post_meta( $post->ID, '_ziyarat_includes', true );
	$excludes = get_post_meta( $post->ID, '_ziyarat_excludes', true );
	$itinerary = get_post_meta( $post->ID, '_ziyarat_itinerary', true );
	$pickup_rules = get_post_meta( $post->ID, '_ziyarat_pickup_rules', true );
	wp_nonce_field( 'ziyarat_save', 'ziyarat_nonce' );
	?>
	<table class="form-table">
		<tr><th>City</th><td><input type="text" name="ziyarat_city" value="<?php echo esc_attr( $city ); ?>" class="regular-text" placeholder="Makkah, Madinah, Taif, Badr"></td></tr>
		<tr><th>Duration</th><td><input type="text" name="ziyarat_duration" value="<?php echo esc_attr( $duration ); ?>" placeholder="Half Day / 2 Days"></td></tr>
		<tr><th>Price (e.g. 100 SAR per person)</th><td><input type="text" name="ziyarat_price" value="<?php echo esc_attr( $price ); ?>" class="regular-text"></td></tr>
		<tr><th>Includes</th><td><textarea name="ziyarat_includes" rows="3" class="large-text"><?php echo esc_textarea( $includes ); ?></textarea></td></tr>
		<tr><th>Excludes</th><td><textarea name="ziyarat_excludes" rows="2" class="large-text"><?php echo esc_textarea( $excludes ); ?></textarea></td></tr>
		<tr><th>Itinerary (bullet points)</th><td><textarea name="ziyarat_itinerary" rows="5" class="large-text"><?php echo esc_textarea( $itinerary ); ?></textarea></td></tr>
		<tr><th>Pickup Rules</th><td><textarea name="ziyarat_pickup_rules" rows="2" class="large-text"><?php echo esc_textarea( $pickup_rules ); ?></textarea></td></tr>
	</table>
	<?php
}

add_action( 'save_post_ziyarat_package', 'booking_forms_ziyarat_save' );
function booking_forms_ziyarat_save( $post_id ) {
	if ( ! isset( $_POST['ziyarat_nonce'] ) || ! wp_verify_nonce( $_POST['ziyarat_nonce'], 'ziyarat_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	$fields = array( 'city', 'duration', 'price', 'includes', 'excludes', 'itinerary', 'pickup_rules' );
	foreach ( $fields as $f ) {
		if ( isset( $_POST[ 'ziyarat_' . $f ] ) ) {
			update_post_meta( $post_id, '_ziyarat_' . $f, sanitize_textarea_field( $_POST[ 'ziyarat_' . $f ] ) );
		}
	}
}
