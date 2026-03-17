import { FlutedGlass } from 'https://esm.sh/@paper-design/shaders@0.0.71';

const canvas = document.getElementById('hero-canvas');
const LOGO_PNG = 'images/logo-twentyfive.png';
const ASPECT = 483 / 1178;

function getCanvasSize() {
  const w = Math.min(1178, window.innerWidth * 0.85);
  return { width: Math.round(w), height: Math.round(w * ASPECT) };
}

const { width, height } = getCanvasSize();
canvas.width = width;
canvas.height = height;

const shader = new FlutedGlass({
  canvas,
  image: LOGO_PNG,
  fit: 'contain',
  scale: 1,
  size: 0.83,
  shape: 'wave',
  angle: -125,
  distortionShape: 'contour',
  distortion: 0.62,
  shift: 0,
  blur: 0.8,
  edges: 0.21,
  stretch: 0.11,
  highlights: 0,
  shadows: 0,
  grainOverlay: 0,
  grainMixer: 0.13,
  colorBack: '#00000000',
  colorHighlight: '#FFFFFF',
  colorShadow: '#000000',
});

shader.play();

let rafId;
window.addEventListener('resize', () => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const { width, height } = getCanvasSize();
    shader.setSize(width, height);
  });
}, { passive: true });
