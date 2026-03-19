const heroWrapper = document.querySelector('.hero-wrapper');
const heroBg     = document.querySelector('.hero-bg');
const heroLogo   = document.querySelector('.hero-logo');
const hero       = document.querySelector('.hero');

// CSS viewport units never perfectly match window.innerHeight on iOS Safari.
// Set the height directly in JS so it's always pixel-perfect.
function setHeroHeight() {
  hero.style.height = window.innerHeight + 'px';
}
setHeroHeight();

// Only re-measure on width changes (orientation flip).
// Ignores height-only resize events caused by Chrome's bottom bar sliding away.
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    setHeroHeight();
  }
}, { passive: true });

// Animation completes at this fraction of the total scroll distance.
// 300vh of 400vh total = 0.75, leaving ~100vh where the logo sits alone.
const ANIM_FRAC = 0.75;

function ease(t) {
  // Smooth ease-in-out
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function updateHero() {
  const scrollY    = window.scrollY;
  const scrollable = heroWrapper.offsetHeight - window.innerHeight;
  const raw        = Math.min(Math.max(scrollY / scrollable, 0), 1);

  // Normalise to 0→1 over the animation window, clamp after that
  const t = ease(Math.min(raw / ANIM_FRAC, 1));

  // Background: scale 1→2, fade out
  heroBg.style.transform = `scale(${1 + t})`;
  heroBg.style.opacity   = 1 - t;

  // Logo: scale 2.5→1 (centred), fade in
  const logoScale = 2.5 - 1.5 * t;
  heroLogo.style.opacity   = t;
  heroLogo.style.transform = `translate(-50%, -50%) scale(${logoScale})`;
}

window.addEventListener('scroll', updateHero, { passive: true });
updateHero();
