/**
 * Lightweight touch-reactive ambient fluid — inspired by WebGL fluid backgrounds,
 * implemented as a tiny 2D canvas with soft blobs + fade trails (no extra deps).
 * Tuned for mobile touch; mouse works on desktop too.
 */

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
};

function motionReduced(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return document.documentElement.dataset.motion === 'reduce';
}

export function initTouchFluid(canvas: HTMLCanvasElement): () => void {
  if (motionReduced()) return () => {};

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return () => {};

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

  let w = 0;
  let h = 0;
  let frameId = 0;
  let running = true;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
  const blobs: Blob[] = [];
  const blobCount = isMobile ? 4 : 6;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedBlobs() {
    blobs.length = 0;
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        r: (isMobile ? 90 : 120) + Math.random() * (isMobile ? 70 : 100),
        hue: i % 2 === 0 ? 158 : 174, // emerald / teal
      });
    }
  }

  function onPointerMove(clientX: number, clientY: number) {
    pointer.tx = clientX;
    pointer.ty = clientY;
    pointer.active = true;

    // Touch gets a stronger impulse so drags feel obviously reactive.
    const impulse = isTouch ? 2.4 : 1.1;
    for (const b of blobs) {
      const dx = clientX - b.x;
      const dy = clientY - b.y;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = b.r * (isTouch ? 2.2 : 1.6);
      if (dist < reach) {
        const f = (1 - dist / reach) * impulse;
        b.vx += (dx / dist) * f;
        b.vy += (dy / dist) * f;
      }
    }
  }

  const onMove = (e: PointerEvent) => onPointerMove(e.clientX, e.clientY);
  const onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) onPointerMove(t.clientX, t.clientY);
  };
  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) onPointerMove(t.clientX, t.clientY);
  };
  const onLeave = () => {
    pointer.active = false;
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('pointerleave', onLeave);

  function tick() {
    if (!running) return;
    frameId = requestAnimationFrame(tick);

    const light = document.documentElement.dataset.theme === 'light';
    const fade = light ? 'rgba(255, 255, 255, 0.14)' : 'rgba(10, 10, 10, 0.12)';

    // Fade trails — cheap fluid-like persistence.
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, w, h);

    // Spring the pointer follower.
    if (pointer.active) {
      pointer.x += (pointer.tx - pointer.x) * (isTouch ? 0.22 : 0.14);
      pointer.y += (pointer.ty - pointer.y) * (isTouch ? 0.22 : 0.14);
    }

    ctx.globalCompositeOperation = 'lighter';

    for (const b of blobs) {
      // Gentle ambient drift.
      b.vx += Math.sin(performance.now() * 0.0004 + b.hue) * 0.02;
      b.vy += Math.cos(performance.now() * 0.00035 + b.hue) * 0.02;

      // Attract toward pointer when active (stronger on touch).
      if (pointer.active) {
        const dx = pointer.x - b.x;
        const dy = pointer.y - b.y;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = isTouch ? 0.045 : 0.028;
        b.vx += (dx / dist) * pull;
        b.vy += (dy / dist) * pull;
      }

      b.vx *= 0.92;
      b.vy *= 0.92;
      b.x += b.vx;
      b.y += b.vy;

      // Soft wrap at edges.
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r;
      if (b.y > h + b.r) b.y = -b.r;

      const alpha = isTouch ? 0.14 : 0.1;
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      grad.addColorStop(0, `hsla(${b.hue}, 85%, 55%, ${alpha})`);
      grad.addColorStop(0.45, `hsla(${b.hue + 12}, 80%, 45%, ${alpha * 0.55})`);
      grad.addColorStop(1, `hsla(${b.hue}, 70%, 40%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bright cursor blob on touch for obvious feedback.
    if (pointer.active && isTouch) {
      const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 72);
      grad.addColorStop(0, 'hsla(160, 90%, 60%, 0.22)');
      grad.addColorStop(1, 'hsla(160, 80%, 50%, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 72, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const onResize = () => {
    resize();
    seedBlobs();
  };
  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(frameId);
    } else {
      running = true;
      tick();
    }
  };

  resize();
  seedBlobs();
  tick();
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    running = false;
    cancelAnimationFrame(frameId);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
