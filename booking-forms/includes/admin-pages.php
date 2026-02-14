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

/* ============================================
   DONATIONS ADMIN PAGE + CSV EXPORT + CAMPAIGN
   ============================================ */
function booking_forms_donations_page() {
	global $wpdb;
	$table = $wpdb->prefix . 'booking_donations';

	/* CSV Export */
	if ( isset( $_GET['booking_export_csv'] ) && $_GET['booking_export_csv'] === 'donations' && current_user_can( 'manage_options' ) ) {
		$all = $wpdb->get_results( "SELECT * FROM $table ORDER BY created_at DESC", ARRAY_A );
		header( 'Content-Type: text/csv; charset=UTF-8' );
		header( 'Content-Disposition: attachment; filename=donations_' . date( 'Y-m-d' ) . '.csv' );
		$out = fopen( 'php://output', 'w' );
		if ( ! empty( $all ) ) {
			fputcsv( $out, array_keys( $all[0] ) );
			foreach ( $all as $row ) {
				fputcsv( $out, $row );
			}
		}
		fclose( $out );
		exit;
	}

	/* Update status */
	if ( isset( $_POST['booking_update_status'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_donation_status' ) ) {
		$id = (int) $_POST['id'];
		$status = sanitize_text_field( $_POST['status'] );
		if ( in_array( $status, array( 'pending', 'confirmed', 'completed', 'cancelled' ), true ) ) {
			$wpdb->update( $table, array( 'status' => $status ), array( 'id' => $id ) );
			echo '<div class="notice notice-success"><p>Status updated.</p></div>';
		}
	}

	/* Save campaign settings */
	if ( isset( $_POST['booking_save_campaign'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_campaign' ) ) {
		update_option( 'booking_campaign_name', sanitize_text_field( $_POST['campaign_name'] ?? '' ) );
		update_option( 'booking_campaign_goal', floatval( $_POST['campaign_goal'] ?? 0 ) );
		update_option( 'booking_campaign_mode', sanitize_text_field( $_POST['campaign_mode'] ?? 'auto' ) );
		update_option( 'booking_campaign_manual_amount', floatval( $_POST['campaign_manual_amount'] ?? 0 ) );
		update_option( 'booking_campaign_active', ! empty( $_POST['campaign_active'] ) ? 1 : 0 );
		echo '<div class="notice notice-success"><p>Campaign settings saved.</p></div>';
	}

	$rows = $wpdb->get_results( "SELECT * FROM $table ORDER BY created_at DESC" );
	$total_confirmed = $wpdb->get_var( "SELECT COALESCE(SUM(amount),0) FROM $table WHERE status IN ('confirmed','completed')" );
	$total_count = $wpdb->get_var( "SELECT COUNT(*) FROM $table" );

	/* Campaign settings */
	$camp_name   = get_option( 'booking_campaign_name', '' );
	$camp_goal   = floatval( get_option( 'booking_campaign_goal', 0 ) );
	$camp_mode   = get_option( 'booking_campaign_mode', 'auto' );
	$camp_manual = floatval( get_option( 'booking_campaign_manual_amount', 0 ) );
	$camp_active = get_option( 'booking_campaign_active', 0 );
	$camp_current = ( $camp_mode === 'auto' ) ? $total_confirmed : $camp_manual;
	$camp_percent = ( $camp_goal > 0 ) ? min( 100, round( ( $camp_current / $camp_goal ) * 100, 1 ) ) : 0;
	?>
	<div class="wrap">
		<h1 style="font-size:1.5rem;font-weight:700;">Donations</h1>
		<p style="color:#6b7280;">Total confirmed: <strong>SAR <?php echo number_format( $total_confirmed, 2 ); ?></strong> | Total records: <?php echo (int) $total_count; ?></p>

		<div style="display:flex;gap:12px;margin:16px 0;">
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-donations&booking_export_csv=donations' ) ); ?>" class="button button-secondary">Export CSV</a>
		</div>

		<!-- Campaign Progress -->
		<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin:20px 0;">
			<h3 style="margin:0 0 16px;font-size:1rem;">Campaign Progress</h3>
			<form method="post">
				<?php wp_nonce_field( 'booking_campaign' ); ?>
				<table class="form-table">
					<tr>
						<th><label>Campaign Active</label></th>
						<td><input type="checkbox" name="campaign_active" value="1" <?php checked( $camp_active, 1 ); ?>></td>
					</tr>
					<tr>
						<th><label>Campaign Name</label></th>
						<td><input type="text" name="campaign_name" value="<?php echo esc_attr( $camp_name ); ?>" class="regular-text" placeholder="e.g. Ramadan 2026"></td>
					</tr>
					<tr>
						<th><label>Goal (SAR)</label></th>
						<td><input type="number" name="campaign_goal" value="<?php echo esc_attr( $camp_goal ); ?>" step="0.01" class="regular-text" placeholder="50000"></td>
					</tr>
					<tr>
						<th><label>Progress Mode</label></th>
						<td>
							<select name="campaign_mode">
								<option value="auto" <?php selected( $camp_mode, 'auto' ); ?>>Automatic (from confirmed donations)</option>
								<option value="manual" <?php selected( $camp_mode, 'manual' ); ?>>Manual amount</option>
							</select>
						</td>
					</tr>
					<tr>
						<th><label>Manual Amount (SAR)</label></th>
						<td><input type="number" name="campaign_manual_amount" value="<?php echo esc_attr( $camp_manual ); ?>" step="0.01" class="regular-text" placeholder="Only used in manual mode"></td>
					</tr>
				</table>
				<?php if ( $camp_active && $camp_goal > 0 ) : ?>
				<div style="margin:16px 0;background:#f3f4f6;border-radius:8px;overflow:hidden;height:28px;position:relative;">
					<div style="height:100%;background:linear-gradient(90deg,#006B3F,#028a4f);width:<?php echo $camp_percent; ?>%;transition:width 0.5s;border-radius:8px;"></div>
					<span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:0.8rem;font-weight:600;color:#333;">SAR <?php echo number_format( $camp_current, 0 ); ?> / <?php echo number_format( $camp_goal, 0 ); ?> (<?php echo $camp_percent; ?>%)</span>
				</div>
				<?php endif; ?>
				<p class="submit"><button type="submit" name="booking_save_campaign" class="button button-primary">Save Campaign</button></p>
			</form>
		</div>

		<!-- Donations Table -->
		<table class="wp-list-table widefat fixed striped" style="margin-top:20px;">
			<thead><tr>
				<th>ID</th><th>Type</th><th>Amount</th><th>Name</th><th>Phone</th><th>Dua/Note</th><th>Payment</th><th>Status</th><th>Date</th><th>Actions</th>
			</tr></thead>
			<tbody>
			<?php foreach ( $rows as $r ) : ?>
				<tr>
					<td><?php echo (int) $r->id; ?></td>
					<td><?php echo esc_html( ucfirst( $r->donation_type ) ); ?></td>
					<td><strong>SAR <?php echo number_format( $r->amount, 2 ); ?></strong></td>
					<td><?php echo esc_html( $r->donor_name ?: '—' ); ?></td>
					<td><?php echo esc_html( $r->donor_phone ?: '—' ); ?></td>
					<td><?php echo esc_html( wp_trim_words( $r->dua_request ?: '—', 10 ) ); ?></td>
					<td><?php echo esc_html( ucfirst( str_replace( '_', ' ', $r->payment_method ) ) ); ?></td>
					<td><span class="booking-status <?php echo esc_attr( $r->status ); ?>"><?php echo esc_html( ucfirst( $r->status ) ); ?></span></td>
					<td><?php echo esc_html( $r->created_at ); ?></td>
					<td>
						<form method="post" style="display:inline;">
							<?php wp_nonce_field( 'booking_donation_status' ); ?>
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
			<?php if ( empty( $rows ) ) : ?><tr><td colspan="10">No donations yet.</td></tr><?php endif; ?>
			</tbody>
		</table>
	</div>
	<?php
}

	if ( isset( $_POST['booking_save_settings'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_settings' ) ) {
		$opts = array( 'phone', 'whatsapp', 'email', 'working_hours', 'salla_store_url', 'shop_btn_text', 'notification_email' );
		foreach ( $opts as $k ) {
			if ( isset( $_POST[ 'booking_' . $k ] ) ) {
				update_option( 'booking_' . $k, sanitize_text_field( $_POST[ 'booking_' . $k ] ) );
			}
		}
		/* Also update theme mod for WhatsApp */
		if ( ! empty( $_POST['booking_whatsapp'] ) ) {
			set_theme_mod( 'booking_whatsapp_number', sanitize_text_field( $_POST['booking_whatsapp'] ) );
		}
		echo '<div class="notice notice-success"><p>Settings saved.</p></div>';
	}
	
	/* Send Test Email */
	if ( isset( $_POST['booking_send_test_email'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'booking_test_email' ) ) {
		$to = get_option( 'booking_notification_email' ) ?: get_option( 'admin_email' );
		$sent = wp_mail( $to, 'Test Email from Booking System', 'This is a test email to verify that your WordPress email sending is working correctly.' );
		if ( $sent ) {
			echo '<div class="notice notice-success"><p>Test email sent to ' . esc_html( $to ) . '.</p></div>';
		} else {
			echo '<div class="notice notice-error"><p>Failed to send email. Please check your SMTP settings.</p></div>';
		}
	}

	$phone    = get_option( 'booking_phone', '' );
	$whatsapp = get_option( 'booking_whatsapp', '' );
	$email    = get_option( 'booking_email', '' );
	$hours    = get_option( 'booking_working_hours', '' );
	$salla    = get_option( 'booking_salla_store_url', '' );
	$shop_btn = get_option( 'booking_shop_btn_text', 'Go to Salla Store' );
	$notify   = get_option( 'booking_notification_email', '' );
	?>
	<div class="wrap">
		<h1 style="font-size:1.5rem;font-weight:700;">Booking Settings</h1>
		
		<h2 class="nav-tab-wrapper">
			<a href="#settings" class="nav-tab nav-tab-active">General Settings</a>
			<a href="#status" class="nav-tab">System Status</a>
		</h2>

		<div id="settings-tab-content">
			<form method="post">
				<?php wp_nonce_field( 'booking_settings' ); ?>

				<h2 class="title" style="font-size:1.1rem;margin-top:24px;">Contact Information</h2>
				<table class="form-table">
					<tr><th><label for="booking_phone">Phone</label></th><td><input type="text" id="booking_phone" name="booking_phone" value="<?php echo esc_attr( $phone ); ?>" class="regular-text" placeholder="+966 5XX XXX XXXX"></td></tr>
					<tr><th><label for="booking_whatsapp">WhatsApp Number</label></th><td><input type="text" id="booking_whatsapp" name="booking_whatsapp" value="<?php echo esc_attr( $whatsapp ); ?>" class="regular-text" placeholder="966501234567"><p class="description">With country code, no +. Used for floating button and click-to-chat.</p></td></tr>
					<tr><th><label for="booking_email">Contact Email</label></th><td><input type="email" id="booking_email" name="booking_email" value="<?php echo esc_attr( $email ); ?>" class="regular-text" placeholder="info@yourdomain.com"></td></tr>
					<tr><th><label for="booking_working_hours">Working Hours</label></th><td><input type="text" id="booking_working_hours" name="booking_working_hours" value="<?php echo esc_attr( $hours ); ?>" class="regular-text" placeholder="24/7"></td></tr>
				</table>

				<h2 class="title" style="font-size:1.1rem;margin-top:24px;">Notifications</h2>
				<table class="form-table">
					<tr><th><label for="booking_notification_email">Notification Email</label></th><td><input type="email" id="booking_notification_email" name="booking_notification_email" value="<?php echo esc_attr( $notify ); ?>" class="regular-text" placeholder="admin@yourdomain.com"><p class="description">Receives alerts for all new bookings, inquiries, and donations. Falls back to WordPress admin email if empty.</p></td></tr>
				</table>

				<h2 class="title" style="font-size:1.1rem;margin-top:24px;">Salla Store Integration</h2>
				<table class="form-table">
					<tr><th><label for="booking_salla_store_url">Salla Store URL</label></th><td><input type="url" id="booking_salla_store_url" name="booking_salla_store_url" value="<?php echo esc_attr( $salla ); ?>" class="regular-text" placeholder="https://store.yourdomain.com"><p class="description">Your Salla store URL. Used for Shop, Buy Now buttons, and product links.</p></td></tr>
					<tr><th><label for="booking_shop_btn_text">Shop Button Text</label></th><td><input type="text" id="booking_shop_btn_text" name="booking_shop_btn_text" value="<?php echo esc_attr( $shop_btn ); ?>" class="regular-text" placeholder="Go to Salla Store"></td></tr>
				</table>

				<p class="submit"><button type="submit" name="booking_save_settings" class="button button-primary">Save Settings</button></p>
			</form>
		</div>

		<div id="status-tab-content" style="margin-top:40px;border-top:1px solid #ddd;padding-top:20px;">
			<h2 class="title">System Status</h2>
			<table class="widefat striped" style="max-width:800px;">
				<thead><tr><th>Check</th><th>Status</th><th>Details</th></tr></thead>
				<tbody>
					<!-- Pages Check -->
					<?php 
					$pages = array( 'pick-drop', 'ziyarat-packages', 'khajoor', 'shop', 'donations', 'contact-us' );
					foreach ( $pages as $slug ) {
						$p = get_page_by_path( $slug );
						echo '<tr>';
						echo '<td>Page: <strong>' . esc_html( $slug ) . '</strong></td>';
						echo '<td>' . ( $p ? '<span style="color:green;">&#10004; Exists</span>' : '<span style="color:red;">&#10008; Missing</span>' ) . '</td>';
						echo '<td>' . ( $p ? 'ID: ' . $p->ID : 'Run setup plugin again' ) . '</td>';
						echo '</tr>';
					}
					?>
					<!-- Email Check -->
					<tr>
						<td>Email System</td>
						<td><form method="post"><?php wp_nonce_field( 'booking_test_email' ); ?><button type="submit" name="booking_send_test_email" class="button button-secondary">Send Test Email</button></form></td>
						<td>Sends to: <?php echo esc_html( $notify ?: get_option('admin_email') ); ?></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<?php
}
