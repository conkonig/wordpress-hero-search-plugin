// Alpine Search Component Factory
function aagActivitySearch(items) {
    // Ensure items is an array
    const safeItems = Array.isArray(items) ? items : [];
    
    return {
        query: '',
        filtered: [],
        activeIndex: -1,
        items: safeItems,

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
                this.go(item.url);
                return;
            }
            this.submit();
        },

        go(url) {
            // If URL is relative, prepend site URL; if absolute, use as-is
            if (url.startsWith('http://') || url.startsWith('https://')) {
                window.location.href = url;
                return;
            }
            
            // Safely get site URL with fallback
            const siteUrl = (typeof AAGHeroConfig !== 'undefined' && AAGHeroConfig.site_url) 
                ? AAGHeroConfig.site_url.replace(/\/$/, '') 
                : window.location.origin;
            
            window.location.href = siteUrl + url;
        },

        submit() {
            const fallback = (typeof AAGHeroConfig !== 'undefined' && AAGHeroConfig.search_fallback_url)
                ? AAGHeroConfig.search_fallback_url
                : '/?s=%query%';
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
    if (!video) return;
    
    const source = video.querySelector('source');

    // Safely pull from config.json with fallbacks
    if (typeof AAGHeroConfig !== 'undefined') {
        if (AAGHeroConfig.video_poster) {
            video.poster = AAGHeroConfig.video_poster;
        }
        if (AAGHeroConfig.video_src && source) {
            source.src = AAGHeroConfig.video_src;
        }
    }

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