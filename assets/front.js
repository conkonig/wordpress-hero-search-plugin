// Alpine Search Component Factory
function aagActivitySearch(items) {
    return {
        query: '',
        filtered: [],
        activeIndex: -1,
        items: items,

        showAll() {
            this.filtered = this.items;
            this.activeIndex = -1;
        },

        filter() {
            const q = this.query.trim().toLowerCase();
            this.filtered = q
                ? this.items.filter(i => i.title.toLowerCase().includes(q))
                : this.items;
            this.activeIndex = -1;
        },

        moveHighlight(dir) {
            if (!this.filtered.length) return;
            const last = this.filtered.length - 1;

            if (this.activeIndex === -1) {
                this.activeIndex = dir === 1 ? 0 : last;
                return;
            }

            this.activeIndex += dir;
            if (this.activeIndex > last) this.activeIndex = 0;
            if (this.activeIndex < 0)   this.activeIndex = last;
        },

        chooseHighlighted() {
            if (this.activeIndex >= 0 && this.filtered[this.activeIndex]) {
                const item = this.filtered[this.activeIndex];
                this.query = item.title;
                this.go(item.slug);
                return;
            }
            this.submit();
        },

        go(slug) {
            window.location.href = `/${AAGHeroConfig.taxonomy}/${slug}/`;
        },

        submit() {
            const fallback = AAGHeroConfig.search_fallback_url;
            const q = encodeURIComponent(this.query.trim());
            window.location.href = fallback.replace('%query%', q);
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {

    // Mobile guard
    if (/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }

    const cover = document.querySelector('.hero-hero-cover');
    if (!cover) return;

    const inner   = cover.querySelector('.wp-block-cover__inner-container');
    const wrapper = cover.querySelector('.hero-video-wrapper');
    if (!inner || !wrapper) return;

    // Move wrapper out of inner container
    cover.insertBefore(wrapper, inner);

    const video  = wrapper.querySelector('.hero-bg-video');
    const source = video.querySelector('source');

    console.log(AAGHeroConfig);

    // Pull from config.json
    video.poster = AAGHeroConfig.video_poster;
    source.src   = AAGHeroConfig.video_src;

    // Autoplay-safe attributes
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;

    video.addEventListener('canplaythrough', () => {
        cover.classList.add('has-video-loaded');
        video.play().catch(()=>{});
    });

    video.load();
});