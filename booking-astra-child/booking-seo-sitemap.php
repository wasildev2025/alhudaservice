<?php
/**
 * Al-Huda Services — Lightweight XML Sitemap Generator
 * No plugin needed. Auto-generates /sitemap.xml via WP rewrite rules.
 *
 * @package Booking_Astra_Child
 */

defined('ABSPATH') || exit;

/* --- Register the /sitemap.xml rewrite rule --- */
add_action('init', 'booking_sitemap_rewrite');
function booking_sitemap_rewrite()
{
    add_rewrite_rule('^sitemap\.xml$', 'index.php?booking_sitemap=1', 'top');
}

add_filter('query_vars', 'booking_sitemap_query_var');
function booking_sitemap_query_var($vars)
{
    $vars[] = 'booking_sitemap';
    return $vars;
}

/* --- Render the sitemap XML --- */
add_action('template_redirect', 'booking_render_sitemap');
function booking_render_sitemap()
{
    if (!get_query_var('booking_sitemap')) {
        return;
    }

    header('Content-Type: application/xml; charset=UTF-8');
    header('X-Robots-Tag: noindex');

    $site_url = home_url('/');

    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    /* Homepage — highest priority */
    echo booking_sitemap_url($site_url, date('Y-m-d'), 'daily', '1.0');

    /* Published pages */
    $pages = get_pages(array('post_status' => 'publish', 'sort_column' => 'menu_order'));
    foreach ($pages as $page) {
        $slug = $page->post_name;
        $priority = '0.7';
        $freq = 'weekly';

        // Boost key pages
        if (in_array($slug, array('pick-drop', 'ziyarat-packages', 'khajoor', 'shop', 'donations'))) {
            $priority = '0.8';
            $freq = 'weekly';
        }
        if (in_array($slug, array('terms-conditions', 'privacy-policy'))) {
            $priority = '0.3';
            $freq = 'monthly';
        }

        echo booking_sitemap_url(
            get_permalink($page->ID),
            get_the_modified_date('Y-m-d', $page->ID),
            $freq,
            $priority
        );
    }

    /* Ziyarat packages (custom post type) */
    $packages = get_posts(array(
        'post_type' => 'ziyarat_package',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    ));
    foreach ($packages as $pkg) {
        echo booking_sitemap_url(
            get_permalink($pkg->ID),
            get_the_modified_date('Y-m-d', $pkg->ID),
            'weekly',
            '0.8'
        );
    }

    echo '</urlset>' . "\n";
    exit;
}

/**
 * Format a single <url> entry
 */
function booking_sitemap_url($loc, $lastmod, $changefreq, $priority)
{
    $out = "  <url>\n";
    $out .= "    <loc>" . esc_url($loc) . "</loc>\n";
    $out .= "    <lastmod>" . esc_html($lastmod) . "</lastmod>\n";
    $out .= "    <changefreq>" . esc_html($changefreq) . "</changefreq>\n";
    $out .= "    <priority>" . esc_html($priority) . "</priority>\n";
    $out .= "  </url>\n";
    return $out;
}

/* --- Flush rewrite rules on theme activation --- */
add_action('after_switch_theme', 'booking_sitemap_flush');
function booking_sitemap_flush()
{
    booking_sitemap_rewrite();
    flush_rewrite_rules();
}
