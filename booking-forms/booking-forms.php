<?php
/**
 * Plugin Name: Booking Forms & Admin
 * Description: Pick & Drop, Ziyarat, Khajoor, Contact forms with database storage and admin panel.
 * Version: 1.0
 * Author: Booking Project
 */

defined( 'ABSPATH' ) || exit;

define( 'BOOKING_FORMS_VERSION', '1.0' );
define( 'BOOKING_FORMS_PATH', plugin_dir_path( __FILE__ ) );
define( 'BOOKING_FORMS_URL', plugin_dir_url( __FILE__ ) );

require_once BOOKING_FORMS_PATH . 'includes/admin-pages.php';
require_once BOOKING_FORMS_PATH . 'includes/ziyarat-cpt.php';
require_once BOOKING_FORMS_PATH . 'includes/forms-handler.php';
require_once BOOKING_FORMS_PATH . 'includes/shortcodes.php';

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

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta( $sql_pick_drop );
	dbDelta( $sql_ziyarat );
	dbDelta( $sql_khajoor_bulk );
	dbDelta( $sql_khajoor_gift );
	dbDelta( $sql_contact );
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
	add_submenu_page( 'booking-forms', 'Settings', 'Settings', 'manage_options', 'booking-settings', 'booking_forms_settings_page' );
}

function booking_forms_admin_dashboard() {
	global $wpdb;
	$pick = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_pick_drop WHERE status = 'pending'" );
	$ziyarat = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_ziyarat_inquiries WHERE status = 'pending'" );
	$khajoor = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_khajoor_bulk WHERE status = 'pending'" ) + $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_khajoor_gift WHERE status = 'pending'" );
	$contact = $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->prefix}booking_contact WHERE status = 'unread'" );
	?>
	<div class="wrap">
		<h1>Booking Dashboard</h1>
		<div class="booking-dashboard-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:20px 0;">
			<div style="background:#fff;padding:20px;border-left:4px solid #006B3F;box-shadow:0 1px 3px rgba(0,0,0,.1);">
				<h3 style="margin:0 0 8px;">Pick & Drop (Pending)</h3>
				<p style="font-size:24px;margin:0;font-weight:bold;color:#006B3F;"><?php echo (int) $pick; ?></p>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-pick-drop' ) ); ?>">View all</a>
			</div>
			<div style="background:#fff;padding:20px;border-left:4px solid #C9A227;box-shadow:0 1px 3px rgba(0,0,0,.1);">
				<h3 style="margin:0 0 8px;">Ziyarat (Pending)</h3>
				<p style="font-size:24px;margin:0;font-weight:bold;color:#C9A227;"><?php echo (int) $ziyarat; ?></p>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-ziyarat' ) ); ?>">View all</a>
			</div>
			<div style="background:#fff;padding:20px;border-left:4px solid #006B3F;box-shadow:0 1px 3px rgba(0,0,0,.1);">
				<h3 style="margin:0 0 8px;">Khajoor (Pending)</h3>
				<p style="font-size:24px;margin:0;font-weight:bold;color:#006B3F;"><?php echo (int) $khajoor; ?></p>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-khajoor' ) ); ?>">View all</a>
			</div>
			<div style="background:#fff;padding:20px;border-left:4px solid #C9A227;box-shadow:0 1px 3px rgba(0,0,0,.1);">
				<h3 style="margin:0 0 8px;">Contact (Unread)</h3>
				<p style="font-size:24px;margin:0;font-weight:bold;color:#C9A227;"><?php echo (int) $contact; ?></p>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=booking-contact' ) ); ?>">View all</a>
			</div>
		</div>
	</div>
	<?php
}
