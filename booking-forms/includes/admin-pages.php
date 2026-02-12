<?php
/**
 * Admin list pages for Pick & Drop, Ziyarat, Khajoor, Contact
 */
defined( 'ABSPATH' ) || exit;

function booking_forms_pick_drop_page() {
	global $wpdb;
	$table = $wpdb->prefix . 'booking_pick_drop';

	if ( isset( $_POST['booking_update_status'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_status' ) ) {
		$id = (int) $_POST['id'];
		$status = sanitize_text_field( $_POST['status'] );
		if ( in_array( $status, array( 'pending', 'confirmed', 'completed', 'cancelled' ), true ) ) {
			$wpdb->update( $table, array( 'status' => $status ), array( 'id' => $id ) );
			echo '<div class="notice notice-success"><p>Status updated.</p></div>';
		}
	}

	$rows = $wpdb->get_results( "SELECT * FROM $table ORDER BY created_at DESC" );
	?>
	<div class="wrap">
		<h1>Pick & Drop Bookings</h1>
		<table class="wp-list-table widefat fixed striped">
			<thead><tr>
				<th>ID</th><th>Name</th><th>Mobile</th><th>Pickup</th><th>Drop</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th>
			</tr></thead>
			<tbody>
			<?php foreach ( $rows as $r ) : ?>
				<tr>
					<td><?php echo (int) $r->id; ?></td>
					<td><?php echo esc_html( $r->full_name ); ?></td>
					<td><?php echo esc_html( $r->mobile ); ?></td>
					<td><?php echo esc_html( wp_trim_words( $r->pickup_location, 8 ) ); ?></td>
					<td><?php echo esc_html( wp_trim_words( $r->drop_location, 8 ) ); ?></td>
					<td><?php echo esc_html( $r->booking_date ); ?></td>
					<td><?php echo esc_html( $r->booking_time ); ?></td>
					<td><span class="booking-status booking-status-<?php echo esc_attr( $r->status ); ?>"><?php echo esc_html( ucfirst( $r->status ) ); ?></span></td>
					<td>
						<form method="post" style="display:inline;">
							<?php wp_nonce_field( 'booking_status' ); ?>
							<input type="hidden" name="id" value="<?php echo (int) $r->id; ?>">
							<select name="status">
								<option value="pending" <?php selected( $r->status, 'pending' ); ?>>Pending</option>
								<option value="confirmed" <?php selected( $r->status, 'confirmed' ); ?>>Confirmed</option>
								<option value="completed" <?php selected( $r->status, 'completed' ); ?>>Completed</option>
								<option value="cancelled" <?php selected( $r->status, 'cancelled' ); ?>>Cancelled</option>
							</select>
							<button type="submit" name="booking_update_status" class="button button-small">Update</button>
						</form>
					</td>
				</tr>
			<?php endforeach; ?>
			<?php if ( empty( $rows ) ) : ?><tr><td colspan="9">No bookings yet.</td></tr><?php endif; ?>
			</tbody>
		</table>
	</div>
	<?php
}

function booking_forms_ziyarat_page() {
	global $wpdb;
	$table = $wpdb->prefix . 'booking_ziyarat_inquiries';

	if ( isset( $_POST['booking_update_status'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_status' ) ) {
		$id = (int) $_POST['id'];
		$status = sanitize_text_field( $_POST['status'] );
		if ( in_array( $status, array( 'pending', 'confirmed', 'completed', 'cancelled' ), true ) ) {
			$wpdb->update( $table, array( 'status' => $status ), array( 'id' => $id ) );
			echo '<div class="notice notice-success"><p>Status updated.</p></div>';
		}
	}

	$rows = $wpdb->get_results( "SELECT z.*, p.post_title as package_name FROM $table z LEFT JOIN {$wpdb->posts} p ON z.package_id = p.ID ORDER BY z.created_at DESC" );
	?>
	<div class="wrap">
		<h1>Ziyarat Inquiries</h1>
		<table class="wp-list-table widefat fixed striped">
			<thead><tr>
				<th>ID</th><th>Package</th><th>Name</th><th>Date</th><th>Persons</th><th>Status</th><th>Actions</th>
			</tr></thead>
			<tbody>
			<?php foreach ( $rows as $r ) : ?>
				<tr>
					<td><?php echo (int) $r->id; ?></td>
					<td><?php echo esc_html( $r->package_name ?: 'ID ' . $r->package_id ); ?></td>
					<td><?php echo esc_html( $r->full_name ); ?></td>
					<td><?php echo esc_html( $r->inquiry_date ); ?></td>
					<td><?php echo (int) $r->persons; ?></td>
					<td><span class="booking-status booking-status-<?php echo esc_attr( $r->status ); ?>"><?php echo esc_html( ucfirst( $r->status ) ); ?></span></td>
					<td>
						<form method="post" style="display:inline;">
							<?php wp_nonce_field( 'booking_status' ); ?>
							<input type="hidden" name="id" value="<?php echo (int) $r->id; ?>">
							<select name="status">
								<option value="pending" <?php selected( $r->status, 'pending' ); ?>>Pending</option>
								<option value="confirmed" <?php selected( $r->status, 'confirmed' ); ?>>Confirmed</option>
								<option value="completed" <?php selected( $r->status, 'completed' ); ?>>Completed</option>
								<option value="cancelled" <?php selected( $r->status, 'cancelled' ); ?>>Cancelled</option>
							</select>
							<button type="submit" name="booking_update_status" class="button button-small">Update</button>
						</form>
					</td>
				</tr>
			<?php endforeach; ?>
			<?php if ( empty( $rows ) ) : ?><tr><td colspan="7">No inquiries yet.</td></tr><?php endif; ?>
			</tbody>
		</table>
	</div>
	<?php
}

function booking_forms_khajoor_page() {
	global $wpdb;
	$bulk = $wpdb->prefix . 'booking_khajoor_bulk';
	$gift = $wpdb->prefix . 'booking_khajoor_gift';

	if ( isset( $_POST['booking_update_status'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_status' ) ) {
		$id = (int) $_POST['id'];
		$type = sanitize_text_field( $_POST['type'] );
		$status = sanitize_text_field( $_POST['status'] );
		if ( in_array( $status, array( 'pending', 'confirmed', 'completed', 'cancelled' ), true ) ) {
			$t = ( $type === 'gift' ) ? $gift : $bulk;
			$wpdb->update( $t, array( 'status' => $status ), array( 'id' => $id ) );
			echo '<div class="notice notice-success"><p>Status updated.</p></div>';
		}
	}

	$bulk_rows = $wpdb->get_results( "SELECT *, 'bulk' as inquiry_type FROM $bulk ORDER BY created_at DESC" );
	$gift_rows = $wpdb->get_results( "SELECT *, 'gift' as inquiry_type FROM $gift ORDER BY created_at DESC" );
	$rows = array_merge( $bulk_rows, $gift_rows );
	usort( $rows, function( $a, $b ) { return strtotime( $b->created_at ) - strtotime( $a->created_at ); } );
	?>
	<div class="wrap">
		<h1>Khajoor Inquiries</h1>
		<table class="wp-list-table widefat fixed striped">
			<thead><tr>
				<th>ID</th><th>Type</th><th>Name</th><th>Details</th><th>Status</th><th>Actions</th>
			</tr></thead>
			<tbody>
			<?php foreach ( $rows as $r ) : ?>
				<tr>
					<td><?php echo (int) $r->id; ?></td>
					<td><?php echo esc_html( $r->inquiry_type === 'gift' ? 'Gift Box' : 'Bulk' ); ?></td>
					<td><?php echo esc_html( $r->full_name ); ?></td>
					<td><?php
						if ( $r->inquiry_type === 'gift' ) {
							echo esc_html( wp_trim_words( $r->gift_details ?? $r->notes ?? '-', 10 ) );
						} else {
							echo esc_html( ( $r->product_type ?? '' ) . ' - ' . ( $r->quantity ?? '' ) . ' - ' . ( $r->delivery_city ?? '' ) );
						}
					?></td>
					<td><span class="booking-status booking-status-<?php echo esc_attr( $r->status ); ?>"><?php echo esc_html( ucfirst( $r->status ) ); ?></span></td>
					<td>
						<form method="post" style="display:inline;">
							<?php wp_nonce_field( 'booking_status' ); ?>
							<input type="hidden" name="id" value="<?php echo (int) $r->id; ?>">
							<input type="hidden" name="type" value="<?php echo esc_attr( $r->inquiry_type ); ?>">
							<select name="status">
								<option value="pending" <?php selected( $r->status, 'pending' ); ?>>Pending</option>
								<option value="confirmed" <?php selected( $r->status, 'confirmed' ); ?>>Confirmed</option>
								<option value="completed" <?php selected( $r->status, 'completed' ); ?>>Completed</option>
								<option value="cancelled" <?php selected( $r->status, 'cancelled' ); ?>>Cancelled</option>
							</select>
							<button type="submit" name="booking_update_status" class="button button-small">Update</button>
						</form>
					</td>
				</tr>
			<?php endforeach; ?>
			<?php if ( empty( $rows ) ) : ?><tr><td colspan="6">No inquiries yet.</td></tr><?php endif; ?>
			</tbody>
		</table>
	</div>
	<?php
}

function booking_forms_contact_page() {
	global $wpdb;
	$table = $wpdb->prefix . 'booking_contact';

	if ( isset( $_POST['booking_mark_read'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_contact' ) ) {
		$id = (int) $_POST['id'];
		$wpdb->update( $table, array( 'status' => 'read' ), array( 'id' => $id ) );
		echo '<div class="notice notice-success"><p>Marked as read.</p></div>';
	}

	$rows = $wpdb->get_results( "SELECT * FROM $table ORDER BY created_at DESC" );
	?>
	<div class="wrap">
		<h1>Contact Messages</h1>
		<table class="wp-list-table widefat fixed striped">
			<thead><tr>
				<th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th>
			</tr></thead>
			<tbody>
			<?php foreach ( $rows as $r ) : ?>
				<tr <?php echo $r->status === 'unread' ? 'style="background:#fff3cd"' : ''; ?>>
					<td><?php echo (int) $r->id; ?></td>
					<td><?php echo esc_html( $r->name ); ?></td>
					<td><?php echo esc_html( $r->email ); ?></td>
					<td><?php echo esc_html( wp_trim_words( $r->message, 15 ) ); ?></td>
					<td><?php echo esc_html( ucfirst( $r->status ) ); ?></td>
					<td><?php echo esc_html( $r->created_at ); ?></td>
					<td>
						<?php if ( $r->status === 'unread' ) : ?>
						<form method="post" style="display:inline;">
							<?php wp_nonce_field( 'booking_contact' ); ?>
							<input type="hidden" name="id" value="<?php echo (int) $r->id; ?>">
							<button type="submit" name="booking_mark_read" class="button button-small">Mark Read</button>
						</form>
						<?php endif; ?>
					</td>
				</tr>
			<?php endforeach; ?>
			<?php if ( empty( $rows ) ) : ?><tr><td colspan="7">No messages yet.</td></tr><?php endif; ?>
			</tbody>
		</table>
	</div>
	<?php
}

function booking_forms_settings_page() {
	if ( isset( $_POST['booking_save_settings'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_settings' ) ) {
		$opts = array( 'phone', 'whatsapp', 'email', 'working_hours' );
		foreach ( $opts as $k ) {
			if ( isset( $_POST[ 'booking_' . $k ] ) ) {
				update_option( 'booking_' . $k, sanitize_text_field( $_POST[ 'booking_' . $k ] ) );
			}
		}
		echo '<div class="notice notice-success"><p>Settings saved.</p></div>';
	}
	$phone = get_option( 'booking_phone', '' );
	$whatsapp = get_option( 'booking_whatsapp', '' );
	$email = get_option( 'booking_email', '' );
	$hours = get_option( 'booking_working_hours', '' );
	?>
	<div class="wrap">
		<h1>Booking Settings</h1>
		<form method="post">
			<?php wp_nonce_field( 'booking_settings' ); ?>
			<table class="form-table">
				<tr><th><label for="booking_phone">Phone</label></th><td><input type="text" id="booking_phone" name="booking_phone" value="<?php echo esc_attr( $phone ); ?>" class="regular-text"></td></tr>
				<tr><th><label for="booking_whatsapp">WhatsApp (with country code)</label></th><td><input type="text" id="booking_whatsapp" name="booking_whatsapp" value="<?php echo esc_attr( $whatsapp ); ?>" class="regular-text" placeholder="966501234567"></td></tr>
				<tr><th><label for="booking_email">Email</label></th><td><input type="email" id="booking_email" name="booking_email" value="<?php echo esc_attr( $email ); ?>" class="regular-text"></td></tr>
				<tr><th><label for="booking_working_hours">Working Hours</label></th><td><input type="text" id="booking_working_hours" name="booking_working_hours" value="<?php echo esc_attr( $hours ); ?>" class="regular-text" placeholder="9 AM - 6 PM"></td></tr>
			</table>
			<p class="submit"><button type="submit" name="booking_save_settings" class="button button-primary">Save Settings</button></p>
		</form>
	</div>
	<?php
}
