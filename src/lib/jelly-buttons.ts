/**
 * Jelly CTA interactions — pointer ripple + elastic release wobble.
 */

const SELECTOR = '[data-jelly]';

function motionReduced(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return document.documentElement.dataset.motion === 'reduce';
}

function spawnRipple(body: HTMLElement, clientX: number, clientY: number) {
  const ripple = body.querySelector<HTMLElement>('.jelly-btn__ripple');
  if (!ripple) return;

  const rect = body.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const size = Math.max(rect.width, rect.height) * 2.4;

  ripple.style.setProperty('--ripple-x', `${x}px`);
  ripple.style.setProperty('--ripple-y', `${y}px`);
  ripple.style.setProperty('--ripple-size', `${size}px`);
  ripple.classList.remove('is-active');
  void ripple.offsetWidth;
  ripple.classList.add('is-active');
}

function triggerWobble(btn: HTMLElement) {
  const body = btn.querySelector<HTMLElement>('.jelly-btn__body');
  if (!body) return;

  btn.classList.remove('is-wobble');
  void btn.offsetWidth;
  btn.classList.add('is-wobble');

  const onEnd = (e: AnimationEvent) => {
    if (e.target !== body) return;
    btn.classList.remove('is-wobble');
    body.removeEventListener('animationend', onEnd);
  };
  body.addEventListener('animationend', onEnd);
}

export function initJellyButtons(root: ParentNode = document): void {
  if (motionReduced()) return;

  root.querySelectorAll<HTMLElement>(SELECTOR).forEach((btn) => {
    if (btn.dataset.jellyBound) return;
    btn.dataset.jellyBound = 'true';

    const body = btn.querySelector<HTMLElement>('.jelly-btn__body');
    if (!body) return;

    btn.addEventListener('pointerdown', (e) => {
      if (btn.hasAttribute('disabled')) return;
      spawnRipple(body, e.clientX, e.clientY);
    });

    btn.addEventListener('pointerup', () => {
      if (btn.hasAttribute('disabled')) return;
      triggerWobble(btn);
    });

    btn.addEventListener('pointerleave', () => {
      if (btn.matches(':active')) triggerWobble(btn);
    });
  });
}
