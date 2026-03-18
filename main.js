// Hero scroll zoom (with very visible debug styling)
window.addEventListener('DOMContentLoaded', () => {
  const heroWrapper = document.querySelector('.hero-wrapper');
  const heroBg = document.querySelector('.hero-bg');

  if (!heroWrapper || !heroBg) return;

  function updateHeroZoom() {
    const rect = heroWrapper.getBoundingClientRect();
    const viewport = window.innerHeight;

    // wrapper top goes from 0 (at page top) down to about -2 * viewport
    const totalTravel = viewport * 2;
    const rawProgress = -rect.top / totalTravel;
    const progress = Math.min(Math.max(rawProgress, 0), 1);

    // Massive, obvious changes so we can see it's working
    const scale = 1 + progress * 2; // up to 3x
    heroBg.style.transform = `scale(${scale}) rotate(${progress * 10}deg)`;
    heroBg.style.opacity = 1 - progress * 0.4;
    heroBg.style.borderRadius = `${progress * 80}px`;
    heroBg.style.boxShadow = `0 0 ${progress * 40}px rgba(0,0,0,0.5)`;
  }

  window.addEventListener('scroll', updateHeroZoom, { passive: true });
  window.addEventListener('resize', updateHeroZoom);
  updateHeroZoom();
});
