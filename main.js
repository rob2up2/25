// Hero scroll zoom + logo reveal using GSAP ScrollTrigger
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // We have a 400vh wrapper and 100vh sticky hero.
  // As you scroll from 0 → 300vh (75% of wrapper),
  // the background scales & fades out while the logo fades & scales in.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      // Run the animation over an explicit 300vh of scroll
      // regardless of the wrapper's total height.
      end: '+=300%',
      scrub: true,
    },
  });

  // Background: use the full timeline (0 → 1 mapped to 0 → 300vh)
  // so it's guaranteed to hit opacity: 0 before the extra 100vh.
  tl.to(
    '.hero-bg',
    {
      scale: 2,
      opacity: 0,
      ease: 'none',
      duration: 1,
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
      width: '25vw',
      ease: 'none',
      duration: 1,
    },
    0
  );
});
