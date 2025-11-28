# AAG Hero Search Plugin

### A lightweight, reusable WordPress plugin providing:
- A blazing-fast Alpine.js autocomplete search bar
- A background hero video with image fallback + LCP-friendly rendering
- Fully configurable via a simple config.json
- Zero admin settings, zero bloat — perfect for performance-focused sites

This plugin is designed to be dropped into any project and customized via a single JSON file, making it ideal for agency workflows or multi-site reuse.

## 🚀 Features
- ⚡ Super-light, Alpine-based search with autocomplete
- 🎥 Lazy-loading hero background video
- 🖼️ Automatic fade-in when video is ready
- 🔎 Autocomplete indexing driven by config JSON
- 🌐 Portable between sites — no admin setup required
- 🧩 Drop-in shortcode or block template
- 🧱 100/100 Lighthouse friendly
- 🛠 Designed for real-world client work (Astra, Gutenberg, Elementor replacement)

## 📁 Project Structure
```
aag-hero-search/
│
├── aag-hero-search.php          # Main plugin loader
├── config.json                  # All user-customizable options
│
├── assets/
│   ├── front.css                # Styling for search + video layer
│   └── front.js                 # Alpine component + video loader
│
├── templates/
│   └── search-component.php     # HTML output for the hero module
│
└── README.md
```

## ⚙️ Gutenberg Configuration (custom HTML Block)

You will need the following custom html block added in the same container in Wordpress as your shortcode if you want the html5 video: 

```
<div class="hero-video-wrapper">
    <video
        class="hero-bg-video lazy-load"
        playsinline
        muted
        loop
        autoplay
        poster="https://amsterdamactivityguide.test/wp-content/uploads/2025/11/Openboat.jpg"
    >
        <source
            data-src="https://amsterdamactivityguide.test/wp-content/uploads/2025/11/amsterdam-boat-cruise-720-30.mp4"
            type="video/mp4"
        >
    </video>
</div>
```


## ⚙️ Configuration (config.json)

All editable settings for the plugin live inside config.json.
Nothing else needs to be edited for different projects.

```json
{
    "video_src": "/wp-content/uploads/2025/11/amsterdam-boat-cruise-720-30.mp4",
    "video_poster": "/wp-content/uploads/2025/11/Openboat.jpg",
    "taxonomy": "activities",
    "search_fallback_url": "/?s=%query%&wpessid=1367",
    "searchbar_placeholder": "Search activities...",
    "search_button_text": "Search",
    "searchable_items": [
        { "slug": "boat-tours-and-cruises", "title": "Boat Tours & Cruises" },
        { "slug": "amsterdam-light-festival", "title": "Amsterdam Light Festival" },
        { "slug": "adventures-activities", "title": "Daytime / Group Adventures" },
        { "slug": "dinners", "title": "Dinners" },
        { "slug": "shows", "title": "Shows" },
        { "slug": "tours-workshops-and-barcrawls", "title": "Tours Workshops & Bar Crawls" }
    ]
}
```

## 🔍 Config Fields Explained

### video_src

Path to the background video file.
This video is lazy-loaded, overlaid, and faded in once canplaythrough fires.

### video_poster

Image shown until the video fully loads.
This ensures a fast, LCP-friendly hero.

### taxonomy

Not required for the frontend.
Used for future expansion (dynamic taxonomy search loading).

### search_fallback_url

URL to send “generic” search queries to.
%query% will be replaced with the user’s search input.

Example:
"/?s=%query%&wpessid=1367" →
/?s=boat+crawl&wpessid=1367

### searchbar_placeholder

Text displayed inside the search input.

### search_button_text

Text displayed on the search button.

### searchable_items

Array of objects defining autocomplete options.
Each must contain:
- slug: used for the final landing URL (/activities/slug/)
- title: user-visible label

This is the data that powers the Alpine.js autocomplete.

## 🧩 Usage

Insert the search hero anywhere via shortcode:

```
[aag_hero_item_search]
```

```
echo do_shortcode('[aag_hero_item_search]');
```

