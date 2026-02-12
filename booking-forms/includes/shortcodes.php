<?php
/**
 * Form shortcodes: [booking_pick_drop] [booking_ziyarat] [booking_khajoor_bulk] [booking_khajoor_gift] [booking_contact]
 */
defined( 'ABSPATH' ) || exit;

add_shortcode( 'booking_pick_drop', 'booking_forms_pick_drop_shortcode' );
function booking_forms_pick_drop_shortcode() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'pick_drop';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">Booking Request Received. We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="pick_drop">
			<p><label>Full Name *</label><input type="text" name="full_name" required></p>
			<p><label>Mobile *</label><input type="tel" name="mobile" required></p>
			<p><label><input type="checkbox" name="whatsapp_same" value="1" checked> WhatsApp same as mobile</label></p>
			<p><label>WhatsApp (if different)</label><input type="tel" name="whatsapp"></p>
			<p><label>Pickup Location *</label><textarea name="pickup_location" rows="2" required></textarea></p>
			<p><label>Drop Location *</label><textarea name="drop_location" rows="2" required></textarea></p>
			<p><label>Date *</label><input type="date" name="booking_date" required></p>
			<p><label>Time *</label><input type="time" name="booking_time" required></p>
			<p><label>Passengers</label><input type="number" name="passengers" value="1" min="1"></p>
			<p><label>Vehicle Type (optional)</label>
				<select name="vehicle_type">
					<option value="">Select</option>
					<option value="Sedan">Sedan</option>
					<option value="Van">Van</option>
					<option value="Hiace">Hiace</option>
				</select>
			</p>
			<p><label><input type="checkbox" name="luggage" value="1"> Luggage</label></p>
			<p><label>Notes</label><textarea name="notes" rows="3"></textarea></p>
			<p><button type="submit" class="ast-button">Submit Booking Request</button></p>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_ziyarat', 'booking_forms_ziyarat_shortcode' );
function booking_forms_ziyarat_shortcode( $atts ) {
	$pid = (int) ( $atts['package_id'] ?? 0 );
	$packages = get_posts( array( 'post_type' => 'ziyarat_package', 'posts_per_page' => -1, 'post_status' => 'publish' ) );
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'ziyarat';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">Inquiry submitted. We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="ziyarat">
			<p><label>Package *</label>
				<select name="package_id" required>
					<option value="">Select Package</option>
					<?php foreach ( $packages as $p ) : ?><option value="<?php echo (int) $p->ID; ?>" <?php selected( $pid, $p->ID ); ?>><?php echo esc_html( $p->post_title ); ?></option><?php endforeach; ?>
				</select>
			</p>
			<p><label>Date *</label><input type="date" name="inquiry_date" required></p>
			<p><label>Persons</label><input type="number" name="persons" value="1" min="1"></p>
			<p><label>Pickup Location</label><textarea name="pickup_location" rows="2"></textarea></p>
			<p><label>Full Name *</label><input type="text" name="full_name" required></p>
			<p><label>Mobile / WhatsApp *</label><input type="tel" name="mobile" required></p>
			<p><label>Notes</label><textarea name="notes" rows="3"></textarea></p>
			<p><button type="submit" class="ast-button">Submit Inquiry</button></p>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_khajoor_bulk', 'booking_forms_khajoor_bulk_shortcode' );
function booking_forms_khajoor_bulk_shortcode() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'khajoor_bulk';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">Bulk inquiry received. We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="khajoor_bulk">
			<p><label>Product Type (e.g. Ajwa, Safawi, Mabroom) *</label><input type="text" name="product_type" required></p>
			<p><label>Quantity (kg/boxes) *</label><input type="text" name="quantity" required></p>
			<p><label>Delivery City *</label><input type="text" name="delivery_city" required></p>
			<p><label>Full Name *</label><input type="text" name="full_name" required></p>
			<p><label>Phone / WhatsApp *</label><input type="tel" name="phone" required></p>
			<p><label>Notes</label><textarea name="notes" rows="3"></textarea></p>
			<p><button type="submit" class="ast-button">Submit Inquiry</button></p>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_khajoor_gift', 'booking_forms_khajoor_gift_shortcode' );
function booking_forms_khajoor_gift_shortcode() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'khajoor_gift';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">Gift box inquiry received. We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="khajoor_gift">
			<p><label>Full Name *</label><input type="text" name="full_name" required></p>
			<p><label>Phone / WhatsApp *</label><input type="tel" name="phone" required></p>
			<p><label>Gift Details</label><textarea name="gift_details" rows="3" placeholder="Type, quantity, preferences..."></textarea></p>
			<p><label>Delivery City</label><input type="text" name="delivery_city"></p>
			<p><label>Notes</label><textarea name="notes" rows="2"></textarea></p>
			<p><button type="submit" class="ast-button">Submit Inquiry</button></p>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_ziyarat_list', 'booking_forms_ziyarat_list_shortcode' );
function booking_forms_ziyarat_list_shortcode() {
	$packages = get_posts( array( 'post_type' => 'ziyarat_package', 'posts_per_page' => -1, 'post_status' => 'publish', 'orderby' => 'menu_order title' ) );
	if ( empty( $packages ) ) {
		return '<p>No packages yet. Add some in the admin.</p>';
	}
	ob_start();
	echo '<div class="booking-packages-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;">';
	foreach ( $packages as $p ) {
		$city = get_post_meta( $p->ID, '_ziyarat_city', true );
		$duration = get_post_meta( $p->ID, '_ziyarat_duration', true );
		$price = get_post_meta( $p->ID, '_ziyarat_price', true );
		$url = get_permalink( $p );
		echo '<div class="booking-package-card" style="border:1px solid #ddd;padding:20px;border-radius:8px;">';
		echo '<h3><a href="' . esc_url( $url ) . '">' . esc_html( $p->post_title ) . '</a></h3>';
		if ( $city ) echo '<p><strong>City:</strong> ' . esc_html( $city ) . '</p>';
		if ( $duration ) echo '<p><strong>Duration:</strong> ' . esc_html( $duration ) . '</p>';
		if ( $price ) echo '<p><strong>Price:</strong> ' . esc_html( $price ) . '</p>';
		echo '<p><a href="' . esc_url( $url ) . '" class="ast-button">View Details & Inquiry</a></p>';
		echo '</div>';
	}
	echo '</div>';
	return ob_get_clean();
}

add_shortcode( 'booking_contact', 'booking_forms_contact_shortcode' );
function booking_forms_contact_shortcode() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'contact';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">Message sent. We will get back to you soon.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="contact">
			<p><label>Name *</label><input type="text" name="name" required></p>
			<p><label>Email *</label><input type="email" name="email" required></p>
			<p><label>Phone</label><input type="tel" name="phone"></p>
			<p><label>Message *</label><textarea name="message" rows="5" required></textarea></p>
			<p><button type="submit" class="ast-button">Send Message</button></p>
		</form>
	</div>
	<?php
	return ob_get_clean();
}
