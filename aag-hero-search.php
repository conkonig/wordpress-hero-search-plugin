<?php

/**
 * Plugin Name: AAG Hero Search
 * Description: Reusable Alpine.js hero search + background video component.
 * Version: 1.0.5
 */
define('AAG_HERO_PATH', __DIR__);
define('AAG_HERO_URL', plugin_dir_url(__FILE__));

/**
 * Load config.json
 */
function aag_hero_config()
{
    static $config = null;

    if ($config !== null) {
        return $config;
    }

    $file = AAG_HERO_PATH . '/config.json';

    if (!file_exists($file)) {
        return $config = [];
    }

    $json = file_get_contents($file);
    $decoded = json_decode($json, true);

    return $config = (is_array($decoded) ? $decoded : []);
}

// Load the template
require __DIR__ . '/templates/search-component.php';

/** Enqueue assets only on the front page */
add_action('wp_enqueue_scripts', function () {
    $cfg = aag_hero_config();

    error_log(print_r($cfg['rendering_page_id'], true));

    if (!is_page($cfg['rendering_page_id']))
            return;

    wp_enqueue_style(
        'aag-hero-css',
        AAG_HERO_URL . 'assets/front.css',
        [],
        '1.0.0'
    );

    wp_enqueue_script(
        'alpinejs',
        'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
        [],
        null,
        false
    );

    wp_enqueue_script(
        'aag-hero-js',
        AAG_HERO_URL . 'assets/front.js',
        ['alpinejs'],
        '1.0.5',
        true
    );

    // Prepare config for localization
    $localized_config = array_merge($cfg, [
        'site_url' => home_url('/')
    ]);
    
    // Ensure searchable_items exists and is an array
    if (!isset($localized_config['searchable_items']) || !is_array($localized_config['searchable_items'])) {
        $localized_config['searchable_items'] = [];
    }
    
    // Localize script - WordPress will output this inline script right before aag-hero-js
    wp_localize_script('aag-hero-js', 'AAGHeroConfig', $localized_config);

    add_filter('script_loader_tag', function ($tag, $handle) {
        if ($handle === 'alpinejs') {
            return str_replace('src=', 'defer src=', $tag);
        }
        return $tag;
    }, 10, 2);
});
