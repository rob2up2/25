// Hero scroll zoom + logo reveal using GSAP ScrollTrigger
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // iOS / mobile browser hardening
  ScrollTrigger.config({
    ignoreMobileResize: true,
    anticipatePin: 1,
  });

  // We have a 400vh wrapper and 100vh sticky hero.
  // As you scroll from 0 → 300vh (75% of wrapper),
  // the background scales & fades out while the logo fades & scales in.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      // Total scroll distance while hero stays pinned.
      // (Formerly emulated via .hero-wrapper { height: 400vh } + sticky)
      end: '+=400%',
      scrub: true,
      invalidateOnRefresh: true,
      // GSAP-only pinning (no sticky, no scroll-snap)
      pin: '.hero',
      pinSpacing: true,
    },
  });

  // Background: complete earlier in the scroll (first 50% of the 300vh),
  // so there's a clear gap where the logo is alone.
  tl.to(
    '.hero-bg',
    {
      scale: 2,
      opacity: 0,
      ease: 'none',
      duration: 0.75,
    },
    0
  );

  // Logo: fade in and scale down to ~25vw width
  tl.fromTo(
    '.hero-logo',
    {
      opacity: 0,
      scale: 1.6,
    },
    {
      opacity: 1,
      scale: 1,
      ease: 'none',
      duration: 0.75,
    },
    0
  );

  // Prevent address-bar / font load layout shifts from desyncing triggers
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  document.fonts?.ready?.then(() => ScrollTrigger.refresh());
  ScrollTrigger.refresh();
});
