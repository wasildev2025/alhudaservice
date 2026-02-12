<?php
/**
 * Redesigned Shortcodes — Professional UI
 * Replaces original shortcodes with modern markup
 */
defined( 'ABSPATH' ) || exit;

/* Remove old shortcodes and register new ones */
remove_shortcode( 'booking_pick_drop' );
remove_shortcode( 'booking_ziyarat' );
remove_shortcode( 'booking_ziyarat_list' );
remove_shortcode( 'booking_khajoor_bulk' );
remove_shortcode( 'booking_khajoor_gift' );
remove_shortcode( 'booking_contact' );

add_shortcode( 'booking_pick_drop', 'booking_v2_pick_drop' );
function booking_v2_pick_drop() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'pick_drop';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">✓ Booking Request Received! We will contact you shortly via WhatsApp.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="pick_drop">
			<div class="form-row">
				<div class="form-group"><label>Full Name <span class="required">*</span></label><input type="text" name="full_name" required placeholder="Enter your full name"></div>
				<div class="form-group"><label>Mobile <span class="required">*</span></label><input type="tel" name="mobile" required placeholder="+966 5XX XXX XXXX"></div>
			</div>
			<div class="form-checkbox"><input type="checkbox" name="whatsapp_same" value="1" id="wa_same" checked><label for="wa_same">WhatsApp same as mobile</label></div>
			<div class="form-group"><label>WhatsApp (if different)</label><input type="tel" name="whatsapp" placeholder="+966 5XX XXX XXXX"></div>
			<div class="form-row">
				<div class="form-group"><label>Pickup Location <span class="required">*</span></label><textarea name="pickup_location" rows="2" required placeholder="Hotel name, address, or Google Maps link"></textarea></div>
				<div class="form-group"><label>Drop Location <span class="required">*</span></label><textarea name="drop_location" rows="2" required placeholder="Destination address or location"></textarea></div>
			</div>
			<div class="form-row">
				<div class="form-group"><label>Date <span class="required">*</span></label><input type="date" name="booking_date" required></div>
				<div class="form-group"><label>Time <span class="required">*</span></label><input type="time" name="booking_time" required></div>
			</div>
			<div class="form-row">
				<div class="form-group"><label>Passengers</label><input type="number" name="passengers" value="1" min="1" max="50"></div>
				<div class="form-group"><label>Vehicle Type</label><select name="vehicle_type"><option value="">Select vehicle</option><option value="Sedan">Sedan</option><option value="Van">Van</option><option value="Hiace">Hiace</option></select></div>
			</div>
			<div class="form-checkbox"><input type="checkbox" name="luggage" value="1" id="luggage_cb"><label for="luggage_cb">I have luggage</label></div>
			<div class="form-group"><label>Notes</label><textarea name="notes" rows="3" placeholder="Any special requirements..."></textarea></div>
			<div class="form-group"><button type="submit" class="booking-btn booking-btn-primary" style="width:100%;">Submit Booking Request</button></div>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_ziyarat_list', 'booking_v2_ziyarat_list' );
function booking_v2_ziyarat_list() {
	$packages = get_posts( array( 'post_type' => 'ziyarat_package', 'posts_per_page' => -1, 'post_status' => 'publish', 'orderby' => 'menu_order title' ) );
	if ( empty( $packages ) ) {
		return '<div class="booking-card" style="text-align:center;padding:48px;"><p style="color:var(--booking-text-muted);">No packages available yet. Check back soon!</p></div>';
	}
	ob_start();
	echo '<div class="booking-grid-3">';
	foreach ( $packages as $p ) {
		$city = get_post_meta( $p->ID, '_ziyarat_city', true );
		$duration = get_post_meta( $p->ID, '_ziyarat_duration', true );
		$price = get_post_meta( $p->ID, '_ziyarat_price', true );
		$url = get_permalink( $p );
		$thumb = has_post_thumbnail( $p ) ? get_the_post_thumbnail_url( $p, 'medium_large' ) : '';
		?>
		<a href="<?php echo esc_url( $url ); ?>" class="booking-card" style="padding:0;overflow:hidden;text-decoration:none;">
			<div style="height:180px;background:<?php echo $thumb ? 'url(' . esc_url( $thumb ) . ') center/cover' : 'linear-gradient(135deg, var(--booking-green-dark), var(--booking-green))'; ?>;position:relative;">
				<?php if ( $city ) : ?><span style="position:absolute;top:12px;left:12px;background:var(--booking-gold);color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;"><?php echo esc_html( $city ); ?></span><?php endif; ?>
			</div>
			<div style="padding:24px;">
				<h3 style="margin:0 0 8px;"><?php echo esc_html( $p->post_title ); ?></h3>
				<?php if ( $duration ) : ?><p style="font-size:0.9rem;margin:0 0 4px;">Duration: <?php echo esc_html( $duration ); ?></p><?php endif; ?>
				<?php if ( $price ) : ?><p style="font-size:1rem;font-weight:600;color:var(--booking-gold);margin:0 0 12px;"><?php echo esc_html( $price ); ?></p><?php endif; ?>
				<span class="booking-btn booking-btn-primary" style="width:100%;padding:10px 20px !important;font-size:0.85rem !important;">View Details & Book</span>
			</div>
		</a>
		<?php
	}
	echo '</div>';
	return ob_get_clean();
}

add_shortcode( 'booking_ziyarat', 'booking_v2_ziyarat_form' );
function booking_v2_ziyarat_form( $atts ) {
	$pid = (int) ( $atts['package_id'] ?? 0 );
	$packages = get_posts( array( 'post_type' => 'ziyarat_package', 'posts_per_page' => -1, 'post_status' => 'publish' ) );
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'ziyarat';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">✓ Inquiry submitted! We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="ziyarat">
			<div class="form-group"><label>Package <span class="required">*</span></label>
				<select name="package_id" required>
					<option value="">Select a package</option>
					<?php foreach ( $packages as $p ) : ?><option value="<?php echo (int) $p->ID; ?>" <?php selected( $pid, $p->ID ); ?>><?php echo esc_html( $p->post_title ); ?></option><?php endforeach; ?>
				</select>
			</div>
			<div class="form-row">
				<div class="form-group"><label>Preferred Date <span class="required">*</span></label><input type="date" name="inquiry_date" required></div>
				<div class="form-group"><label>Persons</label><input type="number" name="persons" value="1" min="1"></div>
			</div>
			<div class="form-group"><label>Pickup Location</label><textarea name="pickup_location" rows="2" placeholder="Hotel or meeting point"></textarea></div>
			<div class="form-row">
				<div class="form-group"><label>Full Name <span class="required">*</span></label><input type="text" name="full_name" required placeholder="Your name"></div>
				<div class="form-group"><label>Mobile / WhatsApp <span class="required">*</span></label><input type="tel" name="mobile" required placeholder="+966 5XX XXX XXXX"></div>
			</div>
			<div class="form-group"><label>Notes</label><textarea name="notes" rows="3" placeholder="Special requests..."></textarea></div>
			<div class="form-group"><button type="submit" class="booking-btn booking-btn-primary" style="width:100%;">Submit Inquiry</button></div>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_khajoor_bulk', 'booking_v2_khajoor_bulk' );
function booking_v2_khajoor_bulk() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'khajoor_bulk';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">✓ Bulk inquiry received! We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="khajoor_bulk">
			<div class="form-row">
				<div class="form-group"><label>Product Type <span class="required">*</span></label><select name="product_type" required><option value="">Select type</option><option value="Ajwa">Ajwa</option><option value="Safawi">Safawi</option><option value="Mabroom">Mabroom</option><option value="Sukkari">Sukkari</option><option value="Mixed">Mixed</option><option value="Other">Other</option></select></div>
				<div class="form-group"><label>Quantity (kg/boxes) <span class="required">*</span></label><input type="text" name="quantity" required placeholder="e.g. 10 kg or 5 boxes"></div>
			</div>
			<div class="form-row">
				<div class="form-group"><label>Delivery City <span class="required">*</span></label><input type="text" name="delivery_city" required placeholder="City name"></div>
				<div class="form-group"><label>Full Name <span class="required">*</span></label><input type="text" name="full_name" required placeholder="Your name"></div>
			</div>
			<div class="form-group"><label>Phone / WhatsApp <span class="required">*</span></label><input type="tel" name="phone" required placeholder="+966 5XX XXX XXXX"></div>
			<div class="form-group"><label>Notes</label><textarea name="notes" rows="3" placeholder="Any special requirements..."></textarea></div>
			<div class="form-group"><button type="submit" class="booking-btn booking-btn-gold" style="width:100%;">Submit Bulk Inquiry</button></div>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_khajoor_gift', 'booking_v2_khajoor_gift' );
function booking_v2_khajoor_gift() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'khajoor_gift';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">✓ Gift box inquiry received! We will contact you shortly.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="khajoor_gift">
			<div class="form-row">
				<div class="form-group"><label>Full Name <span class="required">*</span></label><input type="text" name="full_name" required placeholder="Your name"></div>
				<div class="form-group"><label>Phone / WhatsApp <span class="required">*</span></label><input type="tel" name="phone" required placeholder="+966 5XX XXX XXXX"></div>
			</div>
			<div class="form-group"><label>Gift Details</label><textarea name="gift_details" rows="3" placeholder="Type, quantity, preferences, recipient details..."></textarea></div>
			<div class="form-group"><label>Delivery City</label><input type="text" name="delivery_city" placeholder="City name"></div>
			<div class="form-group"><label>Notes</label><textarea name="notes" rows="2" placeholder="Any additional notes..."></textarea></div>
			<div class="form-group"><button type="submit" class="booking-btn booking-btn-gold" style="width:100%;">Submit Gift Inquiry</button></div>
		</form>
	</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'booking_contact', 'booking_v2_contact' );
function booking_v2_contact() {
	ob_start();
	$success = isset( $_GET['booking_success'] ) && $_GET['booking_success'] === 'contact';
	$error = isset( $_GET['booking_error'] );
	?>
	<div class="booking-form-wrap">
		<?php if ( $success ) : ?><div class="booking-success">✓ Message sent! We will get back to you soon.</div><?php endif; ?>
		<?php if ( $error ) : ?><div class="booking-error">Please fill all required fields.</div><?php endif; ?>
		<form method="post" class="booking-form">
			<?php wp_nonce_field( 'booking_form', 'booking_nonce' ); ?>
			<input type="hidden" name="booking_form_type" value="contact">
			<div class="form-row">
				<div class="form-group"><label>Name <span class="required">*</span></label><input type="text" name="name" required placeholder="Your name"></div>
				<div class="form-group"><label>Email <span class="required">*</span></label><input type="email" name="email" required placeholder="you@example.com"></div>
			</div>
			<div class="form-group"><label>Phone</label><input type="tel" name="phone" placeholder="+966 5XX XXX XXXX"></div>
			<div class="form-group"><label>Message <span class="required">*</span></label><textarea name="message" rows="5" required placeholder="How can we help you?"></textarea></div>
			<div class="form-group"><button type="submit" class="booking-btn booking-btn-primary" style="width:100%;">Send Message</button></div>
		</form>
	</div>
	<?php
	return ob_get_clean();
}
