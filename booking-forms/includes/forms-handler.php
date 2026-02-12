<?php
/**
 * Form submission handlers
 */
defined( 'ABSPATH' ) || exit;

add_action( 'init', 'booking_forms_handle_submit' );
function booking_forms_handle_submit() {
	if ( $_SERVER['REQUEST_METHOD'] !== 'POST' || ! isset( $_POST['booking_form_type'] ) ) return;

	$type = sanitize_text_field( $_POST['booking_form_type'] );
	if ( ! wp_verify_nonce( $_POST['booking_nonce'] ?? '', 'booking_form' ) ) {
		wp_die( 'Security check failed.' );
	}

	switch ( $type ) {
		case 'pick_drop':
			booking_forms_handle_pick_drop();
			break;
		case 'ziyarat':
			booking_forms_handle_ziyarat();
			break;
		case 'khajoor_bulk':
			booking_forms_handle_khajoor_bulk();
			break;
		case 'khajoor_gift':
			booking_forms_handle_khajoor_gift();
			break;
		case 'contact':
			booking_forms_handle_contact();
			break;
	}
}

function booking_forms_handle_pick_drop() {
	global $wpdb;
	$required = array( 'full_name', 'mobile', 'pickup_location', 'drop_location', 'booking_date', 'booking_time' );
	foreach ( $required as $f ) {
		if ( empty( $_POST[ $f ] ) ) {
			wp_redirect( add_query_arg( 'booking_error', 'missing', wp_get_referer() ) );
			exit;
		}
	}
	$whatsapp = ! empty( $_POST['whatsapp'] ) ? sanitize_text_field( $_POST['whatsapp'] ) : sanitize_text_field( $_POST['mobile'] );
	$wpdb->insert( $wpdb->prefix . 'booking_pick_drop', array(
		'full_name' => sanitize_text_field( $_POST['full_name'] ),
		'mobile' => sanitize_text_field( $_POST['mobile'] ),
		'whatsapp' => $whatsapp,
		'whatsapp_same' => ! empty( $_POST['whatsapp_same'] ) ? 1 : 0,
		'pickup_location' => sanitize_textarea_field( $_POST['pickup_location'] ),
		'drop_location' => sanitize_textarea_field( $_POST['drop_location'] ),
		'booking_date' => sanitize_text_field( $_POST['booking_date'] ),
		'booking_time' => sanitize_text_field( $_POST['booking_time'] ),
		'passengers' => max( 1, (int) $_POST['passengers'] ?? 1 ),
		'vehicle_type' => sanitize_text_field( $_POST['vehicle_type'] ?? '' ),
		'luggage' => ! empty( $_POST['luggage'] ) ? 1 : 0,
		'notes' => sanitize_textarea_field( $_POST['notes'] ?? '' ),
		'status' => 'pending',
	) );
	wp_redirect( add_query_arg( 'booking_success', 'pick_drop', wp_get_referer() ) );
	exit;
}

function booking_forms_handle_ziyarat() {
	global $wpdb;
	$required = array( 'package_id', 'inquiry_date', 'full_name', 'mobile' );
	foreach ( $required as $f ) {
		if ( empty( $_POST[ $f ] ) ) {
			wp_redirect( add_query_arg( 'booking_error', 'missing', wp_get_referer() ) );
			exit;
		}
	}
	$wpdb->insert( $wpdb->prefix . 'booking_ziyarat_inquiries', array(
		'package_id' => (int) $_POST['package_id'],
		'inquiry_date' => sanitize_text_field( $_POST['inquiry_date'] ),
		'persons' => max( 1, (int) $_POST['persons'] ?? 1 ),
		'pickup_location' => sanitize_textarea_field( $_POST['pickup_location'] ?? '' ),
		'full_name' => sanitize_text_field( $_POST['full_name'] ),
		'mobile' => sanitize_text_field( $_POST['mobile'] ),
		'notes' => sanitize_textarea_field( $_POST['notes'] ?? '' ),
		'status' => 'pending',
	) );
	wp_redirect( add_query_arg( 'booking_success', 'ziyarat', wp_get_referer() ) );
	exit;
}

function booking_forms_handle_khajoor_bulk() {
	global $wpdb;
	$required = array( 'product_type', 'quantity', 'delivery_city', 'full_name', 'phone' );
	foreach ( $required as $f ) {
		if ( empty( $_POST[ $f ] ) ) {
			wp_redirect( add_query_arg( 'booking_error', 'missing', wp_get_referer() ) );
			exit;
		}
	}
	$wpdb->insert( $wpdb->prefix . 'booking_khajoor_bulk', array(
		'product_type' => sanitize_text_field( $_POST['product_type'] ),
		'quantity' => sanitize_text_field( $_POST['quantity'] ),
		'delivery_city' => sanitize_text_field( $_POST['delivery_city'] ),
		'full_name' => sanitize_text_field( $_POST['full_name'] ),
		'phone' => sanitize_text_field( $_POST['phone'] ),
		'notes' => sanitize_textarea_field( $_POST['notes'] ?? '' ),
		'status' => 'pending',
	) );
	wp_redirect( add_query_arg( 'booking_success', 'khajoor_bulk', wp_get_referer() ) );
	exit;
}

function booking_forms_handle_khajoor_gift() {
	global $wpdb;
	$required = array( 'full_name', 'phone' );
	foreach ( $required as $f ) {
		if ( empty( $_POST[ $f ] ) ) {
			wp_redirect( add_query_arg( 'booking_error', 'missing', wp_get_referer() ) );
			exit;
		}
	}
	$wpdb->insert( $wpdb->prefix . 'booking_khajoor_gift', array(
		'full_name' => sanitize_text_field( $_POST['full_name'] ),
		'phone' => sanitize_text_field( $_POST['phone'] ),
		'gift_details' => sanitize_textarea_field( $_POST['gift_details'] ?? '' ),
		'delivery_city' => sanitize_text_field( $_POST['delivery_city'] ?? '' ),
		'notes' => sanitize_textarea_field( $_POST['notes'] ?? '' ),
		'status' => 'pending',
	) );
	wp_redirect( add_query_arg( 'booking_success', 'khajoor_gift', wp_get_referer() ) );
	exit;
}

function booking_forms_handle_contact() {
	global $wpdb;
	$required = array( 'name', 'email', 'message' );
	foreach ( $required as $f ) {
		if ( empty( $_POST[ $f ] ) ) {
			wp_redirect( add_query_arg( 'booking_error', 'missing', wp_get_referer() ) );
			exit;
		}
	}
	$wpdb->insert( $wpdb->prefix . 'booking_contact', array(
		'name' => sanitize_text_field( $_POST['name'] ),
		'email' => sanitize_email( $_POST['email'] ),
		'phone' => sanitize_text_field( $_POST['phone'] ?? '' ),
		'message' => sanitize_textarea_field( $_POST['message'] ),
		'status' => 'unread',
	) );
	wp_redirect( add_query_arg( 'booking_success', 'contact', wp_get_referer() ) );
	exit;
}
