const heroWrapper = document.querySelector('.hero-wrapper');
const hero        = document.querySelector('.hero');
const heroBg      = document.querySelector('.hero-bg');
const heroLogo    = document.querySelector('.hero-logo');

// Animation completes at 75% of scroll, leaving ~100svh where the logo sits alone.
const ANIM_FRAC = 0.75;

function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function updateHero() {
  const scrollY    = window.scrollY;
  const scrollable = heroWrapper.offsetHeight - window.innerHeight;
  const raw        = Math.min(Math.max(scrollY / scrollable, 0), 1);

  // Once the user has scrolled past the wrapper, hide the fixed hero
  // so the sections below can show normally.
  if (raw >= 1) {
    hero.style.visibility = 'hidden';
    return;
  }
  hero.style.visibility = '';

  const t = ease(Math.min(raw / ANIM_FRAC, 1));

  // Background: scale 1→2, fade out
  heroBg.style.transform = `scale(${1 + t})`;
  heroBg.style.opacity   = 1 - t;

  // Logo: scale 2.5→1 (centred), fade in
  heroLogo.style.opacity   = t;
  heroLogo.style.transform = `translate(-50%, -50%) scale(${2.5 - 1.5 * t})`;
}

window.addEventListener('scroll', updateHero, { passive: true });
updateHero();
