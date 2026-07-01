/** Cursor-tracking spotlight reveal for the hero headshot. Zero-lerp, rAF-batched px coords. */
export function initFlashlightHero() {
  const heroes = document.querySelectorAll<HTMLElement>('[data-flashlight-hero]');
  if (!heroes.length) return;

  const isTouch = window.matchMedia('(hover: none)').matches;
  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.getAttribute('data-motion') === 'reduce';

  heroes.forEach((hero) => {
    if (hero.dataset.flashlightBound) return;
    hero.dataset.flashlightBound = 'true';

    if (isTouch) {
      hero.classList.add('is-touch');
      return;
    }

    if (prefersReduced) {
      hero.classList.add('is-reduced');
      return;
    }

    let x = -9999;
    let y = -9999;
    let active = false;
    let frame = 0;

    const paint = () => {
      frame = 0;
      hero.style.setProperty('--flash-x', `${x}px`);
      hero.style.setProperty('--flash-y', `${y}px`);
      hero.classList.toggle('is-active', active);
    };

    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    hero.addEventListener(
      'pointerenter',
      (e) => {
        active = true;
        const r = hero.getBoundingClientRect();
        x = e.clientX - r.left;
        y = e.clientY - r.top;
        queue();
      },
      { passive: true },
    );

    hero.addEventListener(
      'pointermove',
      (e) => {
        const r = hero.getBoundingClientRect();
        x = e.clientX - r.left;
        y = e.clientY - r.top;
        active = true;
        queue();
      },
      { passive: true },
    );

    hero.addEventListener(
      'pointerleave',
      () => {
        active = false;
        x = -9999;
        y = -9999;
        queue();
      },
      { passive: true },
    );

    hero.addEventListener(
      'pointercancel',
      () => {
        active = false;
        x = -9999;
        y = -9999;
        queue();
      },
      { passive: true },
    );
  });
}
