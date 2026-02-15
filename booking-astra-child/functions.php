<?php
/**
 * Booking Astra Child Theme Functions
 *
 * @package Booking_Astra_Child
 */

defined( 'ABSPATH' ) || exit;

/* ============================================
   BODY CLASSES
   ============================================ */
add_filter( 'body_class', 'booking_astra_body_class' );
function booking_astra_body_class( $classes ) {
	/* Full-width layout on front page - Tabligh style */
	if ( is_front_page() ) {
		$classes[] = 'ast-page-builder-template';
	}
	/* Full-width on inner pages too */
	if ( is_page() && ! is_front_page() ) {
		$classes[] = 'ast-page-builder-template';
		$classes[] = 'booking-inner-page';
	}
	/* Single Ziyarat package */
	if ( is_singular( 'ziyarat_package' ) ) {
		$classes[] = 'ast-page-builder-template';
		$classes[] = 'booking-inner-page';
	}
	return $classes;
}

/* ============================================
   ENQUEUE STYLES
   ============================================ */
function booking_astra_child_enqueue_styles() {
	$theme_ver = wp_get_theme()->get( 'Version' );

	/* Parent theme */
	wp_enqueue_style(
		'astra-parent-style',
		get_template_directory_uri() . '/style.css',
		array(),
		wp_get_theme( 'astra' )->get( 'Version' )
	);

	/* Child theme base */
	wp_enqueue_style(
		'booking-astra-child-style',
		get_stylesheet_uri(),
		array( 'astra-parent-style' ),
		time() // Force reload
	);

	/* Global design system — loaded on ALL pages */
	wp_enqueue_style(
		'booking-global-styles',
		get_stylesheet_directory_uri() . '/global-styles.css',
			array( 'booking-astra-child-style' ),
			time() // Force reload
		);
		
		// NUCLEAR OVERRIDE - Loads last
		wp_enqueue_style( 
			'booking-nuclear-styles', 
			get_stylesheet_directory_uri() . '/nuclear-override.css', 
			array( 'booking-global-styles' ), 
			time() 
		);

	/* Home page specific styles */
	if ( is_front_page() ) {
		wp_enqueue_style(
			'booking-home-styles',
			get_stylesheet_directory_uri() . '/home-styles.css',
			array( 'booking-global-styles' ),
			time() // Force reload for dev
		);
	}
}
add_action( 'wp_enqueue_scripts', 'booking_astra_child_enqueue_styles', 15 );

/* ============================================
   WHATSAPP FLOAT BUTTON
   ============================================ */
add_action( 'wp_footer', 'booking_astra_floating_whatsapp' );
function booking_astra_floating_whatsapp() {
	$number = get_theme_mod( 'booking_whatsapp_number', '966500000000' );
	$number_clean = preg_replace( '/[^0-9]/', '', $number );
	$message = rawurlencode( 'Assalamu Alaikum, I would like to inquire about your services.' );
	$url = 'https://wa.me/' . $number_clean . '?text=' . $message;
	?>
	<a href="<?php echo esc_url( $url ); ?>" class="booking-whatsapp-float" target="_blank" rel="noopener" aria-label="Contact us on WhatsApp" title="Chat on WhatsApp">
		<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
	</a>
	<style>.booking-whatsapp-float{position:fixed;bottom:20px;right:20px;width:60px;height:60px;background:#25D366;color:#fff!important;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.25);z-index:9999;transition:all .3s ease}.booking-whatsapp-float:hover{transform:scale(1.1);color:#fff!important;box-shadow:0 6px 24px rgba(0,0,0,.3)}</style>
	<!-- Scroll to top -->
	<button class="booking-scroll-top" id="bookingScrollTop" aria-label="Scroll to top">&uarr;</button>
	<script>
	(function(){
		var btn=document.getElementById('bookingScrollTop');
		if(!btn)return;
		window.addEventListener('scroll',function(){btn.classList.toggle('visible',window.scrollY>300)});
		btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
	})();
	</script>
	<?php
}

/* ============================================
   CUSTOMIZER — WhatsApp number
   ============================================ */
add_action( 'customize_register', 'booking_astra_customize_register' );
function booking_astra_customize_register( $wp_customize ) {
	$wp_customize->add_section( 'booking_settings', array(
		'title'    => __( 'Booking Settings', 'booking-astra-child' ),
		'priority' => 30,
	) );
	$wp_customize->add_setting( 'booking_whatsapp_number', array(
		'default'           => '966500000000',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'booking_whatsapp_number', array(
		'label'   => __( 'WhatsApp Number (with country code, no +)', 'booking-astra-child' ),
		'section' => 'booking_settings',
		'type'    => 'text',
	) );
}

/* ============================================
   ASTRA CUSTOMIZER DEFAULTS
   ============================================ */
add_filter( 'astra_theme_defaults', 'booking_astra_customizer_defaults' );
function booking_astra_customizer_defaults( $defaults ) {
	$defaults['ast-header-retina-logo']             = '';
	$defaults['header-color-site-title']           = '#3E2723';
	$defaults['header-color-site-tagline']         = '#2C1B10';
	$defaults['global-primary-button-bg-color']    = '#3E2723';
	$defaults['global-primary-button-text-color']  = '#FFFFFF';
	$defaults['global-primary-button-h-color']     = '#C9A227';
	$defaults['global-primary-button-h-bg-color']  = '#C9A227';
	$defaults['link-color']                        = '#3E2723';
	$defaults['link-h-color']                     = '#C9A227';
	return $defaults;
}

/* ============================================
   LOAD V2 SHORTCODES (override v1)
   ============================================ */
add_action( 'init', 'booking_load_v2_shortcodes', 99 );
function booking_load_v2_shortcodes() {
	$v2_file = WP_PLUGIN_DIR . '/booking-forms/includes/shortcodes-v2.php';
	if ( file_exists( $v2_file ) ) {
		require_once $v2_file;
	}
}
/* ============================================
   FORCE INLINE VARIABLES (Cache Buster)
   ============================================ */
add_action( 'wp_head', 'booking_head_inline_styles', 999 );
function booking_head_inline_styles() {
	?>
	<style id="booking-theme-override">
		:root {
			--booking-gold: #C9A227 !important;
			--booking-gold-light: #E5C76B !important;
			--booking-gold-dark: #9A7B1A !important;
			--booking-green: #3E2723 !important;      /* Deep Brown */
			--booking-green-light: #5D4037 !important;
			--booking-green-dark: #281A15 !important;
			--booking-white: #FFFFFF !important;
			--booking-cream: #F5F1E6 !important;
			--booking-bg: #EAE6DB !important;
			--booking-text: #2C1B10 !important;
			--booking-text-light: #4E342E !important;
			--booking-border: #D7CCC8 !important;
		}
		/* Force override hardcoded Astra customizer output if any */
		.main-header-bar, .ast-primary-header-bar { border-bottom-color: var(--booking-gold) !important; }
		.ast-footer-overlay { background-color: var(--booking-green-dark) !important; }
		.booking-hero-bg { background: linear-gradient(135deg, #281A15 0%, #3E2723 30%, #5D4037 70%, #8D6E63 100%) !important; }
		.booking-whatsapp-strip { background: var(--booking-green) !important; }
	</style>
	<?php
}

/* ============================================
   FORCE THEME MOD OVERRIDES (Fix DB Persistence)
   ============================================ */
// Header
add_filter( 'theme_mod_header-color-site-title', function() { return '#3E2723'; } );
add_filter( 'theme_mod_header-color-site-tagline', function() { return '#2C1B10'; } );

// Global Colors
add_filter( 'theme_mod_text-color', function() { return '#2C1B10'; } );
add_filter( 'theme_mod_theme-color', function() { return '#3E2723'; } );
add_filter( 'theme_mod_link-color', function() { return '#3E2723'; } );
add_filter( 'theme_mod_link-h-color', function() { return '#C9A227'; } );

// Buttons
add_filter( 'theme_mod_button-bg-color', function() { return '#3E2723'; } );
add_filter( 'theme_mod_button-color', function() { return '#FFFFFF'; } );
add_filter( 'theme_mod_button-h-bg-color', function() { return '#C9A227'; } );
add_filter( 'theme_mod_button-h-color', function() { return '#FFFFFF'; } );

// Astra Global Palette (if used)
add_filter( 'theme_mod_global-color-palette', function($palette) {
    return array(
        '#3E2723', // Primary
        '#C9A227', // Secondary
        '#2C1B10', // Text
        '#281A15', // Extra
        '#F5F1E6', // Inactive/bg
        '#FFFFFF', // White
    );
});

