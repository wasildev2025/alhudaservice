<?php
/**
 * Email Notification System
 * Sends admin alerts on every form submission + user confirmation emails
 */
defined( 'ABSPATH' ) || exit;

/**
 * Get admin notification email. Falls back to Settings > General email.
 */
function booking_get_admin_email() {
	$notify = get_option( 'booking_notification_email', '' );
	if ( ! empty( $notify ) ) return $notify;
	$contact = get_option( 'booking_email', '' );
	if ( ! empty( $contact ) ) return $contact;
	return get_option( 'admin_email' );
}

/**
 * Get site name for email subjects
 */
function booking_get_site_name() {
	return wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
}

/**
 * Send styled HTML email
 */
function booking_send_email( $to, $subject, $body_html ) {
	$headers = array(
		'Content-Type: text/html; charset=UTF-8',
		'From: ' . booking_get_site_name() . ' <' . get_option( 'admin_email' ) . '>',
	);
	return wp_mail( $to, $subject, booking_email_template( $subject, $body_html ), $headers );
}

/**
 * Email HTML template
 */
function booking_email_template( $title, $body ) {
	$site_name = booking_get_site_name();
	return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
	<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
	<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 0;">
	<tr><td align="center">
		<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
			<tr><td style="background:linear-gradient(135deg,#004d2d,#006B3F);padding:24px 32px;text-align:center;">
				<h1 style="margin:0;color:#fff;font-size:20px;">' . esc_html( $site_name ) . '</h1>
			</td></tr>
			<tr><td style="padding:32px;">
				<h2 style="color:#006B3F;margin:0 0 20px;font-size:18px;">' . esc_html( $title ) . '</h2>
				' . $body . '
			</td></tr>
			<tr><td style="background:#f8f7f4;padding:16px 32px;text-align:center;color:#888;font-size:12px;">
				&copy; ' . date( 'Y' ) . ' ' . esc_html( $site_name ) . ' — All rights reserved.
			</td></tr>
		</table>
	</td></tr></table></body></html>';
}

/**
 * Helper: format a row for email table
 */
function booking_email_row( $label, $value ) {
	if ( empty( $value ) ) return '';
	return '<tr>
		<td style="padding:8px 12px;font-weight:600;color:#333;border-bottom:1px solid #eee;width:140px;vertical-align:top;">' . esc_html( $label ) . '</td>
		<td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;">' . esc_html( $value ) . '</td>
	</tr>';
}

/**
 * Build a detail table from key-value pairs
 */
function booking_email_detail_table( $rows ) {
	$html = '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:20px;">';
	foreach ( $rows as $label => $value ) {
		$html .= booking_email_row( $label, $value );
	}
	$html .= '</table>';
	return $html;
}

/* ============================================
   NOTIFICATION: Pick & Drop
   ============================================ */
function booking_notify_pick_drop( $data ) {
	$admin_email = booking_get_admin_email();
	$site_name   = booking_get_site_name();

	$details = array(
		'Name'     => $data['full_name'],
		'Mobile'   => $data['mobile'],
		'WhatsApp' => $data['whatsapp'],
		'Pickup'   => $data['pickup_location'],
		'Drop'     => $data['drop_location'],
		'Date'     => $data['booking_date'],
		'Time'     => $data['booking_time'],
		'Passengers' => $data['passengers'],
		'Vehicle'  => $data['vehicle_type'],
		'Luggage'  => ! empty( $data['luggage'] ) ? 'Yes' : 'No',
		'Notes'    => $data['notes'],
	);

	$body = '<p style="color:#555;">A new Pick & Drop booking has been submitted:</p>'
		. booking_email_detail_table( $details )
		. '<p><a href="' . esc_url( admin_url( 'admin.php?page=booking-pick-drop' ) ) . '" style="display:inline-block;padding:10px 20px;background:#006B3F;color:#fff;text-decoration:none;border-radius:6px;">View in Admin Panel</a></p>';

	booking_send_email( $admin_email, 'New Pick & Drop Booking — ' . $site_name, $body );
}

/* ============================================
   NOTIFICATION: Ziyarat Inquiry
   ============================================ */
function booking_notify_ziyarat( $data ) {
	$admin_email = booking_get_admin_email();
	$site_name   = booking_get_site_name();
	$pkg_name    = get_the_title( (int) $data['package_id'] ) ?: 'ID ' . $data['package_id'];

	$details = array(
		'Package'   => $pkg_name,
		'Name'      => $data['full_name'],
		'Mobile'    => $data['mobile'],
		'Date'      => $data['inquiry_date'],
		'Persons'   => $data['persons'],
		'Pickup'    => $data['pickup_location'],
		'Notes'     => $data['notes'],
	);

	$body = '<p style="color:#555;">A new Ziyarat inquiry has been received:</p>'
		. booking_email_detail_table( $details )
		. '<p><a href="' . esc_url( admin_url( 'admin.php?page=booking-ziyarat' ) ) . '" style="display:inline-block;padding:10px 20px;background:#006B3F;color:#fff;text-decoration:none;border-radius:6px;">View in Admin Panel</a></p>';

	booking_send_email( $admin_email, 'New Ziyarat Inquiry — ' . $site_name, $body );
}

/* ============================================
   NOTIFICATION: Khajoor Bulk
   ============================================ */
function booking_notify_khajoor_bulk( $data ) {
	$admin_email = booking_get_admin_email();
	$site_name   = booking_get_site_name();

	$details = array(
		'Type'     => $data['product_type'],
		'Quantity' => $data['quantity'],
		'City'     => $data['delivery_city'],
		'Name'     => $data['full_name'],
		'Phone'    => $data['phone'],
		'Notes'    => $data['notes'],
	);

	$body = '<p style="color:#555;">A new bulk Khajoor inquiry has been received:</p>'
		. booking_email_detail_table( $details )
		. '<p><a href="' . esc_url( admin_url( 'admin.php?page=booking-khajoor' ) ) . '" style="display:inline-block;padding:10px 20px;background:#006B3F;color:#fff;text-decoration:none;border-radius:6px;">View in Admin Panel</a></p>';

	booking_send_email( $admin_email, 'New Khajoor Bulk Inquiry — ' . $site_name, $body );
}

/* ============================================
   NOTIFICATION: Khajoor Gift
   ============================================ */
function booking_notify_khajoor_gift( $data ) {
	$admin_email = booking_get_admin_email();
	$site_name   = booking_get_site_name();

	$details = array(
		'Name'    => $data['full_name'],
		'Phone'   => $data['phone'],
		'Details' => $data['gift_details'],
		'City'    => $data['delivery_city'],
		'Notes'   => $data['notes'],
	);

	$body = '<p style="color:#555;">A new Khajoor gift box inquiry has been received:</p>'
		. booking_email_detail_table( $details )
		. '<p><a href="' . esc_url( admin_url( 'admin.php?page=booking-khajoor' ) ) . '" style="display:inline-block;padding:10px 20px;background:#006B3F;color:#fff;text-decoration:none;border-radius:6px;">View in Admin Panel</a></p>';

	booking_send_email( $admin_email, 'New Khajoor Gift Inquiry — ' . $site_name, $body );
}

/* ============================================
   NOTIFICATION: Contact Form
   ============================================ */
function booking_notify_contact( $data ) {
	$admin_email = booking_get_admin_email();
	$site_name   = booking_get_site_name();

	$details = array(
		'Name'    => $data['name'],
		'Email'   => $data['email'],
		'Phone'   => $data['phone'],
		'Message' => $data['message'],
	);

	$body = '<p style="color:#555;">A new contact message has been received:</p>'
		. booking_email_detail_table( $details )
		. '<p><a href="' . esc_url( admin_url( 'admin.php?page=booking-contact' ) ) . '" style="display:inline-block;padding:10px 20px;background:#006B3F;color:#fff;text-decoration:none;border-radius:6px;">View in Admin Panel</a></p>';

	booking_send_email( $admin_email, 'New Contact Message — ' . $site_name, $body );
}

/* ============================================
   NOTIFICATION: Donation
   ============================================ */
function booking_notify_donation( $data ) {
	$admin_email = booking_get_admin_email();
	$site_name   = booking_get_site_name();

	$details = array(
		'Type'        => $data['donation_type'],
		'Amount'      => 'SAR ' . $data['amount'],
		'Name'        => $data['donor_name'],
		'Phone'       => $data['donor_phone'],
		'Note / Dua'  => $data['dua_request'],
	);

	$body = '<p style="color:#555;">A new donation has been submitted:</p>'
		. booking_email_detail_table( $details )
		. '<p><a href="' . esc_url( admin_url( 'admin.php?page=booking-donations' ) ) . '" style="display:inline-block;padding:10px 20px;background:#C9A227;color:#fff;text-decoration:none;border-radius:6px;">View in Admin Panel</a></p>';

	booking_send_email( $admin_email, 'New Donation — SAR ' . $data['amount'] . ' — ' . $site_name, $body );
}
