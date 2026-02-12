<?php
/**
 * Plugin Name: Booking Site Setup
 * Description: One-click setup: creates pages, menu, config. Run once then deactivate.
 * Version: 1.0
 * Author: Booking Project
 */

defined( 'ABSPATH' ) || exit;

register_activation_hook( __FILE__, 'booking_setup_on_activate' );

function booking_setup_on_activate() {
	booking_setup_create_pages();
	booking_setup_create_menu();
	booking_setup_set_options();
}

function booking_setup_create_pages() {
	$pages = array(
		array( 'Pick & Drop', 'pick-drop', '[booking_pick_drop]' ),
		array( 'Ziyarat Packages', 'ziyarat-packages', '[booking_ziyarat_list]<h3>Inquiry Form</h3>[booking_ziyarat]' ),
		array( 'Khajoor', 'khajoor', '<h2>Premium Dates</h2><p>Ajwa, Safawi, Mabroom and more. Bulk orders and gift boxes available.</p><h3>Bulk Order Inquiry</h3>[booking_khajoor_bulk]<h3>Gift Box Inquiry</h3>[booking_khajoor_gift]<p><a href="/shop/" class="ast-button">Buy on Store</a></p>' ),
		array( 'Shop', 'shop', '<p>Visit our Salla store for Islamic books and Khajoor products.</p><p><a href="#" class="ast-button">Go to Shop</a></p>' ),
		array( 'Donations', 'donations', '[Donation form - Phase 3]' ),
		array( 'About Us', 'about-us', '<h2>About Us</h2><p>We provide trusted services for pilgrims and travelers in Saudi Arabia: transport, Ziyarat packages, premium dates, Islamic books, and donation collection.</p>' ),
		array( 'Contact Us', 'contact-us', '<h2>Contact Us</h2><p>Reach us via WhatsApp or the form below.</p>[booking_contact]' ),
		array( 'FAQ', 'faq', '<h2>Frequently Asked Questions</h2><p><strong>How do I book Pick & Drop?</strong> Fill the form on the Pick & Drop page and we will confirm via WhatsApp.</p><p><strong>Do you deliver Khajoor?</strong> Yes, we support delivery to major cities. Use the bulk inquiry form.</p>' ),
		array( 'Terms & Conditions', 'terms-conditions', '<h2>Terms & Conditions</h2><p>Terms content to be added.</p>' ),
		array( 'Privacy Policy', 'privacy-policy', '<h2>Privacy Policy</h2><p>We respect your privacy. Your data is used only to process bookings and inquiries.</p>' ),
	);

	foreach ( $pages as $p ) {
		$existing = get_page_by_path( $p[1] );
		if ( ! $existing ) {
			wp_insert_post( array(
				'post_title'   => $p[0],
				'post_name'    => $p[1],
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_content' => $p[2],
				'menu_order'   => 0,
			) );
		} else {
			wp_update_post( array(
				'ID'           => $existing->ID,
				'post_content' => $p[2],
			) );
		}
	}
}

function booking_setup_create_menu() {
	$menu_name = 'Primary Menu';
	$menu_exists = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu_exists ) {
		$menu_id = wp_create_nav_menu( $menu_name );

		$items = array(
			'Home' => home_url( '/' ),
			'Pick & Drop' => home_url( '/pick-drop/' ),
			'Ziyarat Packages' => home_url( '/ziyarat-packages/' ),
			'Khajoor' => home_url( '/khajoor/' ),
			'Shop' => home_url( '/shop/' ),
			'Donations' => home_url( '/donations/' ),
			'About Us' => home_url( '/about-us/' ),
			'Contact Us' => home_url( '/contact-us/' ),
		);

		$position = 0;
		foreach ( $items as $title => $url ) {
			wp_update_nav_menu_item( $menu_id, 0, array(
				'menu-item-title'   => $title,
				'menu-item-url'     => $url,
				'menu-item-status'  => 'publish',
				'menu-item-position' => $position++,
			) );
		}

		$locations = get_theme_mod( 'nav_menu_locations' );
		if ( ! is_array( $locations ) ) {
			$locations = array();
		}
		$locations['primary'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}
}

function booking_setup_set_options() {
	set_theme_mod( 'booking_whatsapp_number', '966500000000' );
}
