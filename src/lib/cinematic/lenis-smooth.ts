import Lenis from 'lenis';

let lenis: Lenis | null = null;
let rafId = 0;
let bound = false;

function motionOff() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.getAttribute('data-motion') === 'reduce'
  );
}

/** One Lenis instance + one rAF loop for the whole session. */
export function initLenisSmooth() {
  if (bound || motionOff()) return;
  bound = true;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
}

/** After View Transition swaps, recalc scroll container and reset scroll position. */
export function refreshLenis() {
  if (!lenis) return;
  lenis.resize();
  lenis.scrollTo(0, { immediate: true });
}

export function destroyLenisSmooth() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  lenis?.destroy();
  lenis = null;
  bound = false;
}
