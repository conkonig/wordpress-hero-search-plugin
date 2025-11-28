<?php 

function aag_hero_item_search_shortcode() {
    $cfg = aag_hero_config();
    $searchable_items = isset($cfg['searchable_items']) ? $cfg['searchable_items'] : [];

    ob_start();
?>
<div class="aag-hero-search"
     x-data='aagActivitySearch(<?php echo json_encode($searchable_items); ?>)'
     @click.outside="filtered = []; activeIndex = -1">

    <form class="aag-hero-search-form" role="search" @submit.prevent="submit">
        <input type="search"
               class="aag-hero-input"
               placeholder="  <?php echo isset($cfg['searchbar_placeholder']) ? esc_attr($cfg['searchbar_placeholder']) : 'Search...'; ?>"
               autocomplete="off"
               aria-label="<?php echo isset($cfg['searchbar_placeholder']) ? esc_attr($cfg['searchbar_placeholder']) : 'Search...'; ?>"
               x-model="query"
               @input="filter"
               @focus="showAll"
               @keydown.down.prevent="moveHighlight(1)"
               @keydown.up.prevent="moveHighlight(-1)"
               @keydown.enter.prevent="chooseHighlighted"
               @keydown.escape="filtered = []; activeIndex = -1">
        <button type="submit" class="aag-hero-button"><?php echo isset($cfg['search_button_text']) ? esc_html($cfg['search_button_text']) : 'Search'; ?></button>
    </form>

    <ul class="aag-autocomplete-list" x-show="filtered.length > 0" x-transition>
        <template x-for="(item, index) in filtered" :key="item.slug">
            <li class="aag-autocomplete-item"
                x-text="item.title"
                @click="query = item.title; go(item.slug)"
                :class="{ 'is-active': index === activeIndex }"
                @mouseenter="activeIndex = index"></li>
        </template>
    </ul>
</div>
<?php
return ob_get_clean();
}

add_shortcode('aag_hero_item_search', 'aag_hero_item_search_shortcode');