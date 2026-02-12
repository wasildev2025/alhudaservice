<?php
/**
 * Plugin Name: Booking Forms & Admin
 * Description: Pick & Drop, Ziyarat, Khajoor, Contact, Donation forms with database storage, admin panel, and email notifications.
 * Version: 2.0
 * Author: Booking Project
 */

defined( 'ABSPATH' ) || exit;

define( 'BOOKING_FORMS_VERSION', '2.0' );
define( 'BOOKING_FORMS_PATH', plugin_dir_path( __FILE__ ) );
define( 'BOOKING_FORMS_URL', plugin_dir_url( __FILE__ ) );

require_once BOOKING_FORMS_PATH . 'includes/admin-pages.php';
require_once BOOKING_FORMS_PATH . 'includes/ziyarat-cpt.php';
require_once BOOKING_FORMS_PATH . 'includes/email-notifications.php';
require_once BOOKING_FORMS_PATH . 'includes/forms-handler.php';
require_once BOOKING_FORMS_PATH . 'includes/shortcodes.php';

/* Enqueue admin styles */
add_action( 'admin_enqueue_scripts', 'booking_forms_admin_styles' );
function booking_forms_admin_styles( $hook ) {
	if ( strpos( $hook, 'booking' ) !== false ) {
		wp_enqueue_style( 'booking-admin-styles', BOOKING_FORMS_URL . 'admin-styles.css', array(), BOOKING_FORMS_VERSION );
	}
}

/* Database setup */
register_activation_hook( __FILE__, 'booking_forms_activate' );
function booking_forms_activate() {
	booking_forms_create_tables();
	flush_rewrite_rules();
}

function booking_forms_create_tables() {
	global $wpdb;
	$charset = $wpdb->get_charset_collate();

	$sql_pick_drop = "CREATE TABLE {$wpdb->prefix}booking_pick_drop (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		full_name varchar(100) NOT NULL,
		mobile varchar(20) NOT NULL,
		whatsapp varchar(20) NOT NULL,
		whatsapp_same tinyint(1) DEFAULT 1,
		pickup_location text NOT NULL,
		drop_location text NOT NULL,
		booking_date date NOT NULL,
		booking_time time NOT NULL,
		passengers int(11) DEFAULT 1,
		vehicle_type varchar(50) DEFAULT NULL,
		luggage tinyint(1) DEFAULT 0,
		notes text,
		status varchar(20) DEFAULT 'pending',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	) $charset;";

	$sql_ziyarat = "CREATE TABLE {$wpdb->prefix}booking_ziyarat_inquiries (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		package_id bigint(20) unsigned NOT NULL,
		inquiry_date date NOT NULL,
		persons int(11) DEFAULT 1,
		pickup_location text,
		full_name varchar(100) NOT NULL,
		mobile varchar(20) NOT NULL,
		notes text,
		status varchar(20) DEFAULT 'pending',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	) $charset;";

	$sql_khajoor_bulk = "CREATE TABLE {$wpdb->prefix}booking_khajoor_bulk (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		product_type varchar(100) NOT NULL,
		quantity varchar(50) NOT NULL,
		delivery_city varchar(100) NOT NULL,
		full_name varchar(100) NOT NULL,
		phone varchar(20) NOT NULL,
		notes text,
		status varchar(20) DEFAULT 'pending',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	) $charset;";

	$sql_khajoor_gift = "CREATE TABLE {$wpdb->prefix}booking_khajoor_gift (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		full_name varchar(100) NOT NULL,
		phone varchar(20) NOT NULL,
		gift_details text,
		delivery_city varchar(100),
		notes text,
		status varchar(20) DEFAULT 'pending',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	) $charset;";

	$sql_contact = "CREATE TABLE {$wpdb->prefix}booking_contact (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		name varchar(100) NOT NULL,
		email varchar(100) NOT NULL,
		phone varchar(20),
		message text NOT NULL,
		status varchar(20) DEFAULT 'unread',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	) $charset;";

	$sql_donations = "CREATE TABLE {$wpdb->prefix}booking_donations (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		donation_type varchar(50) NOT NULL DEFAULT 'general',
		amount decimal(10,2) NOT NULL DEFAULT 0.00,
		donor_name varchar(100) DEFAULT '',
		donor_phone varchar(20) DEFAULT '',
		dua_request text,
		payment_method varchar(50) DEFAULT 'bank_transfer',
		status varchar(20) DEFAULT 'pending',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	) $charset;";

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta( $sql_pick_drop );
	dbDelta( $sql_ziyarat );
	dbDelta( $sql_khajoor_bulk );
	dbDelta( $sql_khajoor_gift );
	dbDelta( $sql_contact );
	dbDelta( $sql_donations );
}

/* Admin menu */
add_action( 'admin_menu', 'booking_forms_admin_menu' );
function booking_forms_admin_menu() {
	add_menu_page(
		'Booking',
		'Booking',
		'manage_options',
		'booking-forms',
		'booking_forms_admin_dashboard',
		'dashicons-calendar-alt',
		30
	);
	add_submenu_page( 'booking-forms', 'Pick & Drop', 'Pick & Drop', 'manage_options', 'booking-pick-drop', 'booking_forms_pick_drop_page' );
	add_submenu_page( 'booking-forms', 'Ziyarat Inquiries', 'Ziyarat Inquiries', 'manage_options', 'booking-ziyarat', 'booking_forms_ziyarat_page' );
	add_submenu_page( 'booking-forms', 'Khajoor Inquiries', 'Khajoor Inquiries', 'manage_options', 'booking-khajoor', 'booking_forms_khajoor_page' );
	add_submenu_page( 'booking-forms', 'Contact Messages', 'Contact Messages', 'manage_options', 'booking-contact', 'booking_forms_contact_page' );
	add_submenu_page( 'booking-forms', 'Donations', 'Donations', 'manage_options', 'booking-donations', 'booking_forms_donations_page' );
	add_submenu_page( 'booking-forms', 'Settings', 'Settings', 'manage_options', 'booking-settings', 'booking_forms_settings_page' );
}

function booking_forms_admin_dashboard() {
	global $wpdb;
	$pick = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_pick_drop WHERE status = 'pending'" );
	$ziyarat = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_ziyarat_inquiries WHERE status = 'pending'" );
	$khajoor = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_khajoor_bulk WHERE status = 'pending'" ) + $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_khajoor_gift WHERE status = 'pending'" );
	$contact = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_contact WHERE status = 'unread'" );
	$donations = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_donations WHERE status = 'pending'" );
	$donation_total = $wpdb->get_var( "SELECT COALESCE(SUM(amount),0) FROM {$wpdb->prefix}booking_donations WHERE status IN ('confirmed','completed')" );
	$total_pick = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_pick_drop" );
	$total_ziyarat = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_ziyarat_inquiries" );
	?>
	<div class="wrap">
		<h1 style="font-size:1.75rem;font-weight:700;color:#111;margin-bottom:4px;">Booking Dashboard</h1>
		<p style="color:#6b7280;margin:0 0 24px;">Overview of pending bookings, inquiries, and messages.</p>
		<div class="booking-dashboard-cards">
			<div class="booking-dash-card">
				<h3>Pick & Drop</h3>
				<div class="number green"><?php echo (int) $pick; ?></div>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-pick-drop' ) ); ?>">View all (<?php echo (int) $total_pick; ?> total) →</a>
			</div>
			<div class="booking-dash-card gold">
				<h3>Ziyarat Inquiries</h3>
				<div class="number gold"><?php echo (int) $ziyarat; ?></div>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-ziyarat' ) ); ?>">View all (<?php echo (int) $total_ziyarat; ?> total) →</a>
			</div>
			<div class="booking-dash-card">
				<h3>Khajoor Inquiries</h3>
				<div class="number green"><?php echo (int) $khajoor; ?></div>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-khajoor' ) ); ?>">View all →</a>
			</div>
			<div class="booking-dash-card gold">
				<h3>Contact Messages</h3>
				<div class="number gold"><?php echo (int) $contact; ?></div>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-contact' ) ); ?>">View all →</a>
			</div>
			<div class="booking-dash-card" style="border-left-color:#C9A227;">
				<h3>Donations (Pending)</h3>
				<div class="number gold"><?php echo (int) $donations; ?></div>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-donations' ) ); ?>">View all →</a>
			</div>
			<div class="booking-dash-card" style="border-left-color:#006B3F;">
				<h3>Total Donations (Confirmed)</h3>
				<div class="number green">SAR <?php echo number_format( $donation_total, 0 ); ?></div>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-donations' ) ); ?>">Manage →</a>
			</div>
		</div>
	</div>
	<?php
}
