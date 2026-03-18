// Hero scroll zoom using GSAP ScrollTrigger (like the bento demo)
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Simple scrubbed zoom on the hero background image
  gsap.to('.hero-bg', {
    scale: 1.4,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      // We already use CSS sticky for the hero, so no extra pinning needed.
      // If you prefer ScrollTrigger pinning instead, uncomment the next line:
      // pin: '.hero',
    },
  });
});
