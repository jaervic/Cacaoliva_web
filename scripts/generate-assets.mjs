/**
 * generate-assets.mjs
 * -----------------------------------------------------------------------------
 * Regenera los assets del sitio de forma reproducible:
 *   - Variantes responsive en WebP de las fotografías (public/images/*.webp)
 *   - Favicon, apple-touch-icon e iconos PWA desde public/logo.png
 *   - Imagen Open Graph 1200x630 (public/og-image.jpg)
 *
 * Uso:  npm run assets
 */
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imgDir = path.join(root, 'public', 'images');
const publicDir = path.join(root, 'public');

const UNSPLASH = 'https://images.unsplash.com';
const CACAO = { r: 0x2d, g: 0x1a, b: 0x11 }; // --color-cacao-900
const USER_AGENT = 'CacaolivaSite/1.0 (generación de assets)';

const unsplash = (id, width) =>
  `${UNSPLASH}/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&fm=jpg&w=${width}`;

// Fuente y variantes de ancho a generar para cada fotografía.
// `download(width)` devuelve la URL del tamaño mayor desde la que se reescala.
const PHOTOS = {
  hero: { download: (w) => unsplash('photo-1606312619070-d48b4c652a52', w), widths: [1920, 1280, 800] },
  // Cocoa Pods.JPG — dominio público (Medicaster), vía Wikimedia Commons
  historia: {
    download: () =>
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Cocoa_Pods.JPG/960px-Cocoa_Pods.JPG',
    widths: [960, 640],
  },
  'bombones-de-autor': {
    // Rocky Mountain chocolates.jpg — CC0, vía Wikimedia Commons
    download: () =>
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Rocky_Mountain_chocolates.jpg/1280px-Rocky_Mountain_chocolates.jpg',
    widths: [1200, 700],
  },
  'trufas-aterciopeladas': {
    // Truffles with nuts and chocolate dusting.jpg — CC BY 2.0, vía Wikimedia Commons
    download: () =>
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Truffles_with_nuts_and_chocolate_dusting.jpg/960px-Truffles_with_nuts_and_chocolate_dusting.jpg',
    widths: [960, 640],
  },
  'tableta-chuao': {
    download: (w) => unsplash('photo-1610450949065-1f2841536c88', w),
    widths: [1600, 800],
  },
  marquesa: { download: (w) => unsplash('photo-1578985545062-69928b1d9587', w), widths: [1600, 800] },
};

const fetchBuffer = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`No se pudo descargar ${url} (HTTP ${res.status})`);
  return Buffer.from(await res.arrayBuffer());
};

const circleMask = (size) =>
  Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
     </svg>`,
  );

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

async function buildPhotos() {
  await mkdir(imgDir, { recursive: true });
  for (const [name, photo] of Object.entries(PHOTOS)) {
    const widest = Math.max(...photo.widths);
    // Se descarga el tamaño mayor y se reescala para no depender del CDN a la hora de recortar
    const source = await fetchBuffer(photo.download(widest));
    for (const width of photo.widths) {
      const out = path.join(imgDir, `${name}-${width}.webp`);
      await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(out);
      console.log(`  · images/${name}-${width}.webp`);
    }
  }
}

async function buildBrandAssets() {
  const logoPath = path.join(root, 'brand', 'logo.png');
  if (!(await exists(logoPath))) {
    console.warn('  ! No se encontró brand/logo.png, se omiten los assets de marca.');
    return;
  }

  // Iconos con esquinas transparentes recortados en círculo
  for (const size of [32, 48, 96, 192, 512]) {
    const input = await sharp(logoPath)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: circleMask(size), blend: 'dest-in' }])
      .png()
      .toBuffer();
    const out = path.join(publicDir, size === 192 || size === 512 ? `icon-${size}.png` : `favicon-${size}.png`);
    await sharp(input).toFile(out);
    console.log(`  · ${path.basename(out)}`);
  }

  // apple-touch-icon: iOS no maneja bien la transparencia, se aplana sobre cacao
  await sharp(logoPath)
    .resize(180, 180, { fit: 'cover' })
    .composite([{ input: circleMask(180), blend: 'dest-in' }])
    .flatten({ background: CACAO })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('  · apple-touch-icon.png');

  // Marca circular (footer / usos varios), fondo transparente
  await sharp(logoPath)
    .resize(320, 320, { fit: 'cover' })
    .composite([{ input: circleMask(320), blend: 'dest-in' }])
    .png()
    .toFile(path.join(imgDir, 'logo-mark.png'));
  console.log('  · images/logo-mark.png');

  // Imagen Open Graph 1200x630: marca circular sobre fondo cacao
  const markSize = 430;
  const mark = await sharp(logoPath)
    .resize(markSize, markSize, { fit: 'cover' })
    .composite([{ input: circleMask(markSize), blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: CACAO },
  })
    .composite([{ input: mark, top: Math.round((630 - markSize) / 2), left: Math.round((1200 - markSize) / 2) }])
    .jpeg({ quality: 86 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('  · og-image.jpg');
}

console.log('Generando fotografías…');
await buildPhotos();
console.log('Generando assets de marca…');
await buildBrandAssets();
console.log('Listo.');
