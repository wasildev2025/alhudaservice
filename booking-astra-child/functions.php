<?php
/**
 * Booking Astra Child Theme Functions
 *
 * @package Booking_Astra_Child
 */

defined('ABSPATH') || exit;

/* ============================================
   BODY CLASSES
   ============================================ */
add_filter('body_class', 'booking_astra_body_class');
function booking_astra_body_class($classes)
{
	/* Full-width layout on front page - Tabligh style */
	if (is_front_page()) {
		$classes[] = 'ast-page-builder-template';
	}
	/* Full-width on inner pages too */
	if (is_page() && !is_front_page()) {
		$classes[] = 'ast-page-builder-template';
		$classes[] = 'booking-inner-page';
	}
	/* Single Ziyarat package */
	if (is_singular('ziyarat_package')) {
		$classes[] = 'ast-page-builder-template';
		$classes[] = 'booking-inner-page';
	}
	return $classes;
}

/* ============================================
   ENQUEUE STYLES
   ============================================ */
function booking_astra_child_enqueue_styles()
{
	$ver = '3.0.1'; // Static version — enables browser caching

	/* Parent theme */
	wp_enqueue_style(
		'astra-parent-style',
		get_template_directory_uri() . '/style.css',
		array(),
		wp_get_theme('astra')->get('Version')
	);

	/* Child theme base */
	wp_enqueue_style(
		'booking-astra-child-style',
		get_stylesheet_uri(),
		array('astra-parent-style'),
		$ver
	);

	/* Global design system — loaded on ALL pages */
	wp_enqueue_style('booking-global-styles', get_stylesheet_directory_uri() . '/global-styles.css', array(), $ver);

	/* Home page styles — only on front page (saves ~24KB on inner pages) */
	if (is_front_page()) {
		wp_enqueue_style('booking-home-styles', get_stylesheet_directory_uri() . '/home-styles.css', array('booking-global-styles'), $ver);
	}

	/* Nuclear override — legacy bridge, loads last */
	wp_enqueue_style(
		'booking-nuclear-styles',
		get_stylesheet_directory_uri() . '/nuclear-override.css',
		array('booking-global-styles'),
		$ver
	);

	/* Google Fonts — preloaded to prevent render-blocking */
	wp_enqueue_style(
		'booking-google-fonts',
		'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap',
		array(),
		null
	);
}
add_action('wp_enqueue_scripts', 'booking_astra_child_enqueue_styles', 15);

/* ============================================
   SPEED: Google Fonts — preload + swap
   ============================================ */
add_filter('style_loader_tag', 'booking_preload_google_fonts', 10, 4);
function booking_preload_google_fonts($html, $handle, $href, $media)
{
	if ($handle === 'booking-google-fonts') {
		return '<link rel="preload" as="style" href="' . esc_url($href) . '" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript>' . $html . '</noscript>' . "\n";
	}
	return $html;
}

/* ============================================
   SPEED: Resource Hints — DNS-prefetch + preconnect
   ============================================ */
add_action('wp_head', 'booking_resource_hints', 1);
function booking_resource_hints()
{
	echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">' . "\n";
	echo '<link rel="dns-prefetch" href="//fonts.gstatic.com">' . "\n";
	echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>' . "\n";
	echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}

/* ============================================
   SPEED: Remove WordPress bloat from <head>
   ============================================ */
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');

/* SPEED: Disable emoji script (~10KB + DNS lookup) */
add_action('init', 'booking_disable_emojis');
function booking_disable_emojis()
{
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('admin_print_styles', 'print_emoji_styles');
	add_filter('emoji_svg_url', '__return_false');
}

/* ============================================
   SECURITY: Strip ?ver= from CSS/JS URLs
   ============================================ */
add_filter('style_loader_src', 'booking_remove_version_strings', 9999);
add_filter('script_loader_src', 'booking_remove_version_strings', 9999);
function booking_remove_version_strings($src)
{
	if (strpos($src, 'ver=') !== false) {
		$src = remove_query_arg('ver', $src);
	}
	return $src;
}

/* ============================================
   SECURITY: Restrict REST API to logged-in users
   ============================================ */
add_filter('rest_authentication_errors', 'booking_restrict_rest_api');
function booking_restrict_rest_api($result)
{
	if (true === $result || is_wp_error($result)) {
		return $result;
	}
	// Allow contact-form-7 and other public endpoints
	$public_routes = array('/wp/v2/pages', '/wp/v2/posts');
	$rest_route = isset($GLOBALS['wp']->query_vars['rest_route'])
		? $GLOBALS['wp']->query_vars['rest_route']
		: '';

	// Block REST API root and most routes for non-authenticated users
	if (!is_user_logged_in()) {
		return new WP_Error(
			'rest_forbidden',
			'REST API access restricted.',
			array('status' => 403)
		);
	}
	return $result;
}

/* ============================================
   SECURITY: Disable XML-RPC completely
   ============================================ */
add_filter('xmlrpc_enabled', '__return_false');
add_filter('xmlrpc_methods', function () {
	return array();
});

/* ============================================
   SECURITY: Remove X-Pingback header
   ============================================ */
add_filter('wp_headers', 'booking_remove_pingback_header');
function booking_remove_pingback_header($headers)
{
	unset($headers['X-Pingback']);
	return $headers;
}

/* ============================================
   SECURITY: Remove REST API link from HTTP headers
   ============================================ */
remove_action('template_redirect', 'rest_output_link_header', 11);

/* ============================================
   SECURITY: Hide WordPress version from feeds
   ============================================ */
add_filter('the_generator', '__return_empty_string');

/* ============================================
   SECURITY: Disable user enumeration via REST API
   ============================================ */
add_filter('rest_endpoints', 'booking_disable_user_endpoints');
function booking_disable_user_endpoints($endpoints)
{
	if (isset($endpoints['/wp/v2/users'])) {
		unset($endpoints['/wp/v2/users']);
	}
	if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
		unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
	}
	return $endpoints;
}

/* ============================================
   SECURITY: Remove "WordPress Theme" footer credit
   ============================================ */
add_filter('astra_footer_copyright_text', 'booking_custom_footer_credit', 9999);
function booking_custom_footer_credit($credit)
{
	return '© ' . date('Y') . ' Al-Huda Services. All rights reserved.';
}

/* Override Astra's copyright — multiple hooks for complete coverage */
add_filter('astra_footer_copyright', 'booking_override_full_footer', 9999);
function booking_override_full_footer($html)
{
	// Strip any "Powered by" or "WordPress" or "Astra" references
	$html = preg_replace('/\|.*$/s', '', $html);
	$html = preg_replace('/(Powered by|WordPress|Astra|wpastra)/i', '', $html);
	return $html;
}

/* ============================================
   SECURITY: Output buffering — obfuscate WP paths
   Hide wp-content/wp-includes from page source
   ============================================ */
add_action('template_redirect', 'booking_start_ob', 1);
function booking_start_ob()
{
	ob_start('booking_obfuscate_output');
}

function booking_obfuscate_output($html)
{
	// 1. Rewrite wp-content/themes/ paths → /assets/t/
	$site_url = home_url();
	$html = str_replace(
		$site_url . '/wp-content/themes/',
		$site_url . '/assets/t/',
		$html
	);
	// Also handle relative paths
	$html = str_replace('/booking/wp-content/themes/', '/booking/assets/t/', $html);

	// 2. Rewrite wp-content/uploads/ → /assets/u/
	$html = str_replace(
		$site_url . '/wp-content/uploads/',
		$site_url . '/assets/u/',
		$html
	);
	$html = str_replace('/booking/wp-content/uploads/', '/booking/assets/u/', $html);

	// 3. Rewrite wp-content/plugins/ → /assets/p/
	$html = str_replace(
		$site_url . '/wp-content/plugins/',
		$site_url . '/assets/p/',
		$html
	);
	$html = str_replace('/booking/wp-content/plugins/', '/booking/assets/p/', $html);

	// 4. Rewrite wp-includes/ → /assets/core/
	$html = str_replace('/booking/wp-includes/', '/booking/assets/core/', $html);

	// 5. Strip any remaining "Powered by" footer references
	$html = preg_replace(
		'/\|\s*Powered\s+by\s+<a[^>]*>.*?<\/a>/i',
		'',
		$html
	);

	// 6. Remove any remaining loose "WordPress" text in footer area
	$html = preg_replace(
		'/Astra\s+WordPress\s+Theme/i',
		'',
		$html
	);

	return $html;
}

/* ============================================
   SECURITY: Rewrite rules for obfuscated paths
   Map /assets/t/ → /wp-content/themes/ etc.
   ============================================ */
add_action('init', 'booking_assets_rewrite_rules');
function booking_assets_rewrite_rules()
{
	// These rewrite rules map the obfuscated paths back to real paths
	add_rewrite_rule('^assets/t/(.*)$', 'wp-content/themes/$1', 'top');
	add_rewrite_rule('^assets/u/(.*)$', 'wp-content/uploads/$1', 'top');
	add_rewrite_rule('^assets/p/(.*)$', 'wp-content/plugins/$1', 'top');
	add_rewrite_rule('^assets/core/(.*)$', 'wp-includes/$1', 'top');
}

/* ============================================
   SECURITY: Disable application passwords (WP 5.6+)
   ============================================ */
add_filter('wp_is_application_passwords_available', '__return_false');


/* ============================================
   WHATSAPP FLOAT BUTTON
   ============================================ */
add_action('wp_footer', 'booking_astra_floating_whatsapp');
function booking_astra_floating_whatsapp()
{
	$number = get_theme_mod('booking_whatsapp_number', '966500000000');
	$number_clean = preg_replace('/[^0-9]/', '', $number);
	$message = rawurlencode('Assalamu Alaikum, I would like to inquire about your services.');
	$url = 'https://wa.me/' . $number_clean . '?text=' . $message;
	?>
	<a href="<?php echo esc_url($url); ?>" class="booking-whatsapp-float" target="_blank" rel="noopener"
		aria-label="Contact us on WhatsApp" title="Chat on WhatsApp">
		<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
		</svg>
	</a>
	<style>
		.booking-whatsapp-float {
			position: fixed;
			bottom: 20px;
			right: 20px;
			width: 60px;
			height: 60px;
			background: #25D366;
			color: #fff !important;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 4px 16px rgba(0, 0, 0, .25);
			z-index: 9999;
			transition: all .3s ease
		}

		.booking-whatsapp-float:hover {
			transform: scale(1.1);
			color: #fff !important;
			box-shadow: 0 6px 24px rgba(0, 0, 0, .3)
		}
	</style>
	<!-- Scroll to top -->
	<button class="booking-scroll-top" id="bookingScrollTop" aria-label="Scroll to top">&uarr;</button>
	<script>
		(function () {
			/* Scroll-to-top */
			var btn = document.getElementById('bookingScrollTop');
			if (btn) {
				window.addEventListener('scroll', function () { btn.classList.toggle('visible', window.scrollY > 300) });
				btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }) });
			}

			/* Intersection Observer — scroll-triggered animations */
			var animEls = document.querySelectorAll('.booking-animate');
			if (animEls.length && 'IntersectionObserver' in window) {
				var observer = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-visible');
							observer.unobserve(entry.target);
						}
					});
				}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
				animEls.forEach(function (el) { observer.observe(el); });
			} else {
				/* Fallback: show all immediately */
				animEls.forEach(function (el) { el.classList.add('is-visible'); });
			}
		})();
	</script>
	<?php
}

/* ============================================
   CUSTOMIZER — WhatsApp number
   ============================================ */
add_action('customize_register', 'booking_astra_customize_register');
function booking_astra_customize_register($wp_customize)
{
	$wp_customize->add_section('booking_settings', array(
		'title' => __('Booking Settings', 'booking-astra-child'),
		'priority' => 30,
	));
	$wp_customize->add_setting('booking_whatsapp_number', array(
		'default' => '966500000000',
		'sanitize_callback' => 'sanitize_text_field',
	));
	$wp_customize->add_control('booking_whatsapp_number', array(
		'label' => __('WhatsApp Number (with country code, no +)', 'booking-astra-child'),
		'section' => 'booking_settings',
		'type' => 'text',
	));
}

/* ============================================
   ASTRA CUSTOMIZER DEFAULTS
   ============================================ */
add_filter('astra_theme_defaults', 'booking_astra_customizer_defaults');
function booking_astra_customizer_defaults($defaults)
{
	$defaults['ast-header-retina-logo'] = '';
	$defaults['header-color-site-title'] = '#4A2C00';
	$defaults['header-color-site-tagline'] = '#6D4C41';
	$defaults['global-primary-button-bg-color'] = '#E5A11D';
	$defaults['global-primary-button-text-color'] = '#FFFFFF';
	$defaults['global-primary-button-h-color'] = '#4A2C00';
	$defaults['global-primary-button-h-bg-color'] = '#D4911A';
	$defaults['link-color'] = '#4A2C00';
	$defaults['link-h-color'] = '#E5A11D';
	return $defaults;
}

/* ============================================
   LOAD V2 SHORTCODES (override v1)
   ============================================ */
add_action('init', 'booking_load_v2_shortcodes', 99);
function booking_load_v2_shortcodes()
{
	$v2_file = WP_PLUGIN_DIR . '/booking-forms/includes/shortcodes-v2.php';
	if (file_exists($v2_file)) {
		require_once $v2_file;
	}
}

/* ============================================
   LOAD SEO SITEMAP GENERATOR
   ============================================ */
require_once get_stylesheet_directory() . '/booking-seo-sitemap.php';

/* ============================================
   FORCE INLINE VARIABLES (Cache Buster)
   ============================================ */
add_action('wp_head', 'booking_head_inline_styles', 999);
function booking_head_inline_styles()
{
	?>
	<style id="booking-theme-override">
		:root {
			--booking-gold: #E5A11D !important;
			--booking-gold-light: #FFD54F !important;
			--booking-gold-dark: #D4911A !important;
			--booking-brown: #4A2C00 !important;
			--booking-brown-light: #6D4C41 !important;
			--booking-brown-dark: #2B1800 !important;
			--booking-white: #FFFFFF !important;
			--booking-cream: #F9F7F2 !important;
			--booking-bg: #F0EDE5 !important;
			--booking-text: #2B1800 !important;
			--booking-text-light: #4E342E !important;
			--booking-text-muted: #8D7B68 !important;
			--booking-border: #E0D7C6 !important;
			--booking-heading-font: 'Cinzel', serif;
			--booking-body-font: 'Lato', sans-serif;
			/* Legacy bridge */
			--booking-green: #4A2C00;
			--booking-green-dark: #2B1800;
			--booking-green-light: #6D4C41;
		}

		body,
		p,
		span,
		a,
		li,
		input,
		textarea {
			font-family: var(--booking-body-font);
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		.site-title {
			font-family: var(--booking-heading-font) !important;
			letter-spacing: 0.04em;
		}

		.main-header-bar,
		.ast-primary-header-bar {
			border-bottom-color: var(--booking-gold) !important;
		}

		.ast-footer-overlay {
			background-color: #1A0F00 !important;
		}
	</style>
	<?php
}

/* ============================================
   FORCE THEME MOD OVERRIDES (Fix DB Persistence)
   ============================================ */
// Header
add_filter('theme_mod_header-color-site-title', function () {
	return '#4A2C00';
});
add_filter('theme_mod_header-color-site-tagline', function () {
	return '#6D4C41';
});

// Global Colors
add_filter('theme_mod_text-color', function () {
	return '#2B1800';
});
add_filter('theme_mod_theme-color', function () {
	return '#4A2C00';
});
add_filter('theme_mod_link-color', function () {
	return '#4A2C00';
});
add_filter('theme_mod_link-h-color', function () {
	return '#E5A11D';
});

// Buttons
add_filter('theme_mod_button-bg-color', function () {
	return '#E5A11D';
});
add_filter('theme_mod_button-color', function () {
	return '#FFFFFF';
});
add_filter('theme_mod_button-h-bg-color', function () {
	return '#4A2C00';
});
add_filter('theme_mod_button-h-color', function () {
	return '#FFFFFF';
});

// Astra Global Palette (if used)
add_filter('theme_mod_global-color-palette', function ($palette) {
	return array(
		'#4A2C00', // Primary (Deep Brown)
		'#E5A11D', // Secondary (Gold)
		'#2B1800', // Text (Very Dark Brown)
		'#6D4C41', // Accent Brown
		'#F9F7F2', // Background Cream
		'#FFFFFF', // White
	);
});

/* ============================================
   PRAYER TIMES API (Aladhan)
   ============================================ */
function booking_get_prayer_times()
{
	$cached = get_transient('booking_prayer_times');
	if ($cached)
		return $cached;

	$city = 'Makkah';
	$country = 'Saudi Arabia';
	$url = sprintf('https://api.aladhan.com/v1/timingsByCity?city=%s&country=%s&method=4', urlencode($city), urlencode($country));

	$response = wp_remote_get($url);
	if (is_wp_error($response)) {
		error_log('Prayer API Error: ' . $response->get_error_message());
		return false;
	}

	$body = wp_remote_retrieve_body($response);
	$data = json_decode($body, true);

	if (!empty($data['data']['timings'])) {
		$timings = $data['data']['timings'];
		error_log('Prayer API Success: ' . print_r($timings, true));
		$filtered = array(
			'Fajr' => $timings['Fajr'],
			'Dhuhr' => $timings['Dhuhr'],
			'Asr' => $timings['Asr'],
			'Maghrib' => $timings['Maghrib'],
			'Isha' => $timings['Isha'],
		);
		set_transient('booking_prayer_times', $filtered, 4 * HOUR_IN_SECONDS);
		return $filtered;
	}

	// Typical Fallback for Makkah (if API/Internet fails)
	return array(
		'Fajr' => '05:28',
		'Dhuhr' => '12:32',
		'Asr' => '15:51',
		'Maghrib' => '18:18',
		'Isha' => '19:48',
	);
}

/* ============================================
   SEO ENGINE — Meta Tags, OG, JSON-LD
   ============================================ */

/**
 * Per-page SEO meta map
 */
function booking_seo_meta_map()
{
	return array(
		'front_page' => array(
			'title' => 'Al-Huda Services — Islamic Transport, Ziyarat & More',
			'description' => 'Premium Islamic services in Saudi Arabia. Airport pick & drop, Ziyarat packages, Khajoor, Islamic books & donations. Trusted by thousands.',
		),
		'pick-drop' => array(
			'title' => 'Airport Pick & Drop — Al-Huda Services',
			'description' => 'Reliable airport, hotel & Ziyarat transport in Makkah & Madinah. Comfortable vehicles, professional drivers. Book now.',
		),
		'ziyarat-packages' => array(
			'title' => 'Ziyarat Packages — Al-Huda Services',
			'description' => 'Guided Ziyarat tours to Makkah, Madinah, Taif & Badr. Curated packages for families & groups with experienced guides.',
		),
		'khajoor' => array(
			'title' => 'Premium Khajoor (Dates) — Al-Huda Services',
			'description' => 'Finest Ajwa, Safawi & Mabroom dates from Madinah. Bulk orders & gift boxes available. Direct from the Holy City.',
		),
		'shop' => array(
			'title' => 'Islamic Books & Gifts — Al-Huda Services',
			'description' => 'Authentic Islamic literature, Quran, and educational resources. Shop our curated collection of books & gifts.',
		),
		'donations' => array(
			'title' => 'Sadaqah & Donations — Al-Huda Services',
			'description' => 'Support the Muslim community through Sadaqah. Every contribution makes a difference. Donate securely today.',
		),
		'about-us' => array(
			'title' => 'About Al-Huda Services — Our Story',
			'description' => 'Serving pilgrims & travelers with trust, excellence, and Islamic values. Learn about our team and mission.',
		),
		'contact-us' => array(
			'title' => 'Contact Us — Al-Huda Services',
			'description' => 'Get in touch via WhatsApp, email, or visit us in Saudi Arabia. We\'re here to help with all your travel needs.',
		),
		'faq' => array(
			'title' => 'FAQ — Al-Huda Services',
			'description' => 'Common questions about transport, Ziyarat packages, Khajoor, and the booking process. Find answers here.',
		),
		'terms-conditions' => array(
			'title' => 'Terms & Conditions — Al-Huda Services',
			'description' => 'Read the terms and conditions for using Al-Huda Services. Transparent policies for all our customers.',
		),
		'privacy-policy' => array(
			'title' => 'Privacy Policy — Al-Huda Services',
			'description' => 'Your privacy matters. Read how Al-Huda Services protects your personal data and information.',
		),
	);
}

/**
 * Get SEO data for current page
 */
function booking_get_current_seo()
{
	$map = booking_seo_meta_map();
	$site_name = get_bloginfo('name');

	if (is_front_page()) {
		return $map['front_page'];
	}

	if (is_page()) {
		$slug = get_post_field('post_name', get_the_ID());
		if (isset($map[$slug])) {
			return $map[$slug];
		}
		// Fallback for unmapped pages
		return array(
			'title' => get_the_title() . ' — ' . $site_name,
			'description' => wp_trim_words(get_the_excerpt(), 25, '...'),
		);
	}

	if (is_singular('ziyarat_package')) {
		$title = get_the_title();
		$city = get_post_meta(get_the_ID(), '_ziyarat_city', true);
		return array(
			'title' => $title . ($city ? ' — ' . $city : '') . ' | ' . $site_name,
			'description' => wp_trim_words(get_the_excerpt(), 25, '...'),
		);
	}

	// Archive / other
	return array(
		'title' => wp_get_document_title(),
		'description' => get_bloginfo('description'),
	);
}

/* --- Dynamic <title> --- */
add_filter('pre_get_document_title', 'booking_seo_title', 20);
function booking_seo_title($title)
{
	$seo = booking_get_current_seo();
	return !empty($seo['title']) ? $seo['title'] : $title;
}

/* --- Meta description, canonical, OG, Twitter, JSON-LD --- */
add_action('wp_head', 'booking_seo_head_tags', 2);
function booking_seo_head_tags()
{
	$seo = booking_get_current_seo();
	$site_name = get_bloginfo('name');
	$url = is_front_page() ? home_url('/') : get_permalink();
	$description = !empty($seo['description']) ? $seo['description'] : get_bloginfo('description');
	$title = !empty($seo['title']) ? $seo['title'] : wp_get_document_title();

	/* Meta Description */
	echo '<meta name="description" content="' . esc_attr($description) . '">' . "\n";

	/* Canonical URL */
	echo '<link rel="canonical" href="' . esc_url($url) . '">' . "\n";

	/* Open Graph */
	echo '<meta property="og:type" content="website">' . "\n";
	echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '">' . "\n";
	echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
	echo '<meta property="og:description" content="' . esc_attr($description) . '">' . "\n";
	echo '<meta property="og:url" content="' . esc_url($url) . '">' . "\n";
	echo '<meta property="og:locale" content="en_US">' . "\n";

	/* Twitter Card */
	echo '<meta name="twitter:card" content="summary">' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr($description) . '">' . "\n";
}

/* --- JSON-LD Structured Data --- */
add_action('wp_head', 'booking_seo_jsonld', 3);
function booking_seo_jsonld()
{
	$site_name = get_bloginfo('name');
	$site_url = home_url('/');

	/* LocalBusiness — only on front page */
	if (is_front_page()) {
		$ld = array(
			'@context' => 'https://schema.org',
			'@type' => 'LocalBusiness',
			'name' => $site_name,
			'description' => 'Premium Islamic services in Saudi Arabia — airport transport, Ziyarat packages, Khajoor, Islamic books & community donations.',
			'url' => $site_url,
			'telephone' => '+966500000000',
			'address' => array(
				'@type' => 'PostalAddress',
				'addressLocality' => 'Makkah',
				'addressCountry' => 'SA',
			),
			'geo' => array(
				'@type' => 'GeoCoordinates',
				'latitude' => 21.4225,
				'longitude' => 39.8262,
			),
			'sameAs' => array(),
			'hasOfferCatalog' => array(
				'@type' => 'OfferCatalog',
				'name' => 'Al-Huda Services',
				'itemListElement' => array(
					array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Airport Pick & Drop')),
					array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Ziyarat Tour Packages')),
					array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Product', 'name' => 'Premium Khajoor (Dates)')),
					array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Product', 'name' => 'Islamic Books & Literature')),
				),
			),
		);
		echo '<script type="application/ld+json">' . wp_json_encode($ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . '</script>' . "\n";
	}

	/* BreadcrumbList — inner pages only */
	if (!is_front_page() && (is_page() || is_singular('ziyarat_package'))) {
		$breadcrumbs = array(
			'@context' => 'https://schema.org',
			'@type' => 'BreadcrumbList',
			'itemListElement' => array(
				array(
					'@type' => 'ListItem',
					'position' => 1,
					'name' => 'Home',
					'item' => $site_url,
				),
				array(
					'@type' => 'ListItem',
					'position' => 2,
					'name' => get_the_title(),
					'item' => get_permalink(),
				),
			),
		);
		echo '<script type="application/ld+json">' . wp_json_encode($breadcrumbs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
	}
}

/* ============================================
   SEO: Robots.txt filter
   ============================================ */
add_filter('robots_txt', 'booking_custom_robots_txt', 10, 2);
function booking_custom_robots_txt($output, $public)
{
	$site_url = home_url('/');
	$output = "User-agent: *\n";
	$output .= "Allow: /\n";
	$output .= "Disallow: /wp-admin/\n";
	$output .= "Allow: /wp-admin/admin-ajax.php\n\n";
	$output .= "Sitemap: " . $site_url . "sitemap.xml\n";
	return $output;
}
