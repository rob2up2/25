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
      end: 'bottom top', // 400vh wrapper - 100vh hero = 300vh of scroll
      scrub: true,
    },
  });

  // Background: zoom from 1 → 1.6 and fade to 0
  tl.to(
    '.hero-bg',
    {
      scale: 1.6,
      opacity: 0,
      ease: 'none',
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
    },
    0
  );
});
