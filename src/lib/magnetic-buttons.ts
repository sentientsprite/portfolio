/**
 * Magnetic cursor pull for primary CTAs — desktop pointer only.
 * Buttons lean slightly toward the cursor when it is nearby.
 */

const SELECTORS = '[data-jelly], .btn-primary, [data-magnetic]';
const MAX_PULL = 0.38; // fraction of offset toward cursor at closest range
const RANGE = 1.35; // multiplier on element size for activation radius

function motionReduced(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return document.documentElement.dataset.motion === 'reduce';
}

function isFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function initMagneticButtons(root: ParentNode = document): void {
  if (motionReduced() || !isFinePointer()) return;

  root.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = 'true';
    el.classList.add('magnetic-target');

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * RANGE;
      if (dist > radius) {
        el.style.setProperty('--mag-x', '0px');
        el.style.setProperty('--mag-y', '0px');
        return;
      }
      const t = 1 - dist / radius;
      const pull = t * t * MAX_PULL;
      el.style.setProperty('--mag-x', `${dx * pull}px`);
      el.style.setProperty('--mag-y', `${dy * pull}px`);
    };

    const onLeave = () => {
      el.style.setProperty('--mag-x', '0px');
      el.style.setProperty('--mag-y', '0px');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
  });
}
