/** Lazy-load demo iframes when the frame scrolls into view. */
export function initLazyDemoFrames() {
  document.querySelectorAll<HTMLElement>('[data-demo-lazy]').forEach((frame) => {
    if (frame.dataset.demoLazyBound) return;
    frame.dataset.demoLazyBound = '1';

    const src = frame.dataset.demoSrc;
    if (!src) return;

    const load = () => {
      if (frame.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = frame.dataset.demoTitle ?? 'Live demo preview';
      iframe.loading = 'lazy';
      iframe.setAttribute('tabindex', '-1');
      iframe.className = 'h-full w-full border-0';
      frame.querySelector('[data-demo-poster]')?.remove();
      frame.appendChild(iframe);
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(frame);
  });
}
