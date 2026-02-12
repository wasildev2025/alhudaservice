<?php
/**
 * Plugin Name: Booking Site Setup
 * Description: One-click setup: creates pages, menu, config. Run once then deactivate.
 * Version: 2.0
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
	/*
	 * Page templates in the child theme (page-{slug}.php) handle all layout/content.
	 * We just need the pages to exist with the correct slugs.
	 */
	$pages = array(
		array( 'Pick & Drop',         'pick-drop',         '' ),
		array( 'Ziyarat Packages',    'ziyarat-packages',  '' ),
		array( 'Khajoor',             'khajoor',           '' ),
		array( 'Shop',                'shop',              '' ),
		array( 'Donations',           'donations',         '' ),
		array( 'About Us',            'about-us',          '' ),
		array( 'Contact Us',          'contact-us',        '' ),
		array( 'FAQ',                 'faq',               '' ),
		array( 'Terms & Conditions',  'terms-conditions',  '' ),
		array( 'Privacy Policy',      'privacy-policy',    '' ),
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
		}
		/* Don't overwrite existing pages - user may have customized content */
	}
}

function booking_setup_create_menu() {
	$menu_name = 'Primary Menu';
	$menu_exists = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu_exists ) {
		$menu_id = wp_create_nav_menu( $menu_name );

		$items = array(
			'Home'              => home_url( '/' ),
			'Pick & Drop'       => home_url( '/pick-drop/' ),
			'Ziyarat Packages'  => home_url( '/ziyarat-packages/' ),
			'Khajoor'           => home_url( '/khajoor/' ),
			'Shop'              => home_url( '/shop/' ),
			'Donations'         => home_url( '/donations/' ),
			'About Us'          => home_url( '/about-us/' ),
			'Contact Us'        => home_url( '/contact-us/' ),
		);

		$position = 0;
		foreach ( $items as $title => $url ) {
			wp_update_nav_menu_item( $menu_id, 0, array(
				'menu-item-title'    => $title,
				'menu-item-url'      => $url,
				'menu-item-status'   => 'publish',
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
