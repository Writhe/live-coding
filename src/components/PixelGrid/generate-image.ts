import { IMAGE_RESOLUTION, IMAGE_SIZE } from '../../config';

const PADDING = 5;
const COLORS = ['deepskyblue', '#5c84b1', '#E69A8D', '#CDB599', '#F95700'];

const blockMainThread = (ms: number) => {
  let start = Date.now();
  while (Date.now() < start + Math.max(ms, 0)) {}
};

const getHash = (input: string): number =>
  Array.from(input).reduce(
    (acc, char) => 0 | (31 * acc + char.charCodeAt(0)),
    0
  );

// NOTE: Mulberry32 PRNG (https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32)
const getPRNG = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function drawSquare(
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  size: number
) {
  const nx = PADDING + x * size;
  const ny = PADDING + y * size;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(nx, ny, size, size);
  ctx.fill();
  ctx.closePath();
}

function generateImage(canvas: HTMLCanvasElement, data: string): string {
  blockMainThread(200);

  const cellSize = (IMAGE_SIZE - PADDING * 2) / IMAGE_RESOLUTION;

  const ctx = canvas?.getContext('2d');

  if (!canvas || !ctx) throw new Error('Your browser ran out of canvas.');

  const rng = getPRNG(getHash(data));
  const background = COLORS[Math.floor(rng() * COLORS.length)];
  const foreground = COLORS[Math.floor(rng() * COLORS.length)];

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  for (let x = 0; x < IMAGE_RESOLUTION; x++) {
    for (let y = 0; y < IMAGE_RESOLUTION; y++) {
      if (rng() > 0.5) drawSquare(ctx, foreground, x, y, cellSize);
    }
  }

  return canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
}

export function generateImageDataURL(data: string, size: number): string {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', String(size));
  canvas.setAttribute('height', String(size));

  generateImage(canvas, data);

  return canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
}
