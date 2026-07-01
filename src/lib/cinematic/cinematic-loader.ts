import gsap from 'gsap';

function motionOff() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.getAttribute('data-motion') === 'reduce'
  );
}

function animateBoot(loader: HTMLElement) {
  const word = loader.querySelector('.loader-wordmark span');
  const bar = loader.querySelector('.loader-bar');
  if (!word || !bar) return;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.classList.remove('is-boot', 'is-active');
          gsap.set(loader, { clearProps: 'opacity' });
        },
      });
    },
  });

  tl.to(word, { y: 0, duration: 0.55, ease: 'power3.out' })
    .to(bar, { scaleX: 1, duration: 0.65, ease: 'power2.inOut' }, '-=0.2');
}

/** Boot loader once per session — all routes share the cinematic layout. */
export function initCinematicLoader() {
  const loader = document.getElementById('cinematic-loader');
  if (!loader || loader.dataset.loaderBound) return;
  loader.dataset.loaderBound = 'true';

  if (motionOff()) return;

  const booted = sessionStorage.getItem('rk-booted') === '1';
  if (!booted) {
    loader.classList.add('is-boot', 'is-active');
    animateBoot(loader);
    sessionStorage.setItem('rk-booted', '1');
  }
}
