// Scroll-reveal: fade/slide elements in as they enter the viewport.
(function () {
    'use strict';

    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    // Fallback: no IntersectionObserver -> just show everything.
    if (!('IntersectionObserver' in window)) {
        for (var i = 0; i < els.length; i++) els[i].classList.add('is-visible');
        return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    els.forEach(function (el) { observer.observe(el); });
})();

// Magnetic hover: the VISION CTA drifts toward the cursor, then springs back.
(function () {
    var mq = window.matchMedia;
    var reduced = mq && mq('(prefers-reduced-motion: reduce)').matches;
    var finePointer = mq && mq('(pointer: fine)').matches;
    if (reduced || !finePointer) return; // skip on touch / reduced-motion

    var cta = document.querySelector('.vision-badge');
    if (!cta) return;

    var STRENGTH = 0.4; // 0 = none, 1 = follows cursor exactly

    cta.addEventListener('mousemove', function (e) {
        var rect = cta.getBoundingClientRect();
        var x = e.clientX - (rect.left + rect.width / 2);
        var y = e.clientY - (rect.top + rect.height / 2);
        cta.style.transform = 'translate(' + (x * STRENGTH).toFixed(2) + 'px, ' +
                              (y * STRENGTH).toFixed(2) + 'px) scale(1.06)';
    });

    cta.addEventListener('mouseleave', function () {
        cta.style.transform = '';
    });
})();

