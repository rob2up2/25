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
      // Run the animation over 200vh of scroll,
      // then leave ~100vh of "dead" scroll where nothing changes.
      end: '+=200%',
      scrub: true,
      invalidateOnRefresh: true,
      // On touch devices, pin via ScrollTrigger instead of CSS sticky
      pin: ScrollTrigger.isTouch ? '.hero' : false,
      pinSpacing: false,
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
      duration: 0.5,
    },
    0
  );

  // Logo: fade in and scale down to ~25vw width
  tl.fromTo(
    '.hero-logo',
    {
      opacity: 0,
      width: '70vw',
    },
    {
      opacity: 1,
      width: '35vw',
      ease: 'none',
      duration: 0.5,
    },
    0
  );

  // Prevent address-bar / font load layout shifts from desyncing triggers
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  document.fonts?.ready?.then(() => ScrollTrigger.refresh());
  ScrollTrigger.refresh();
});
