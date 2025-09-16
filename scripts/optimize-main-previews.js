const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/previews');
const OUTPUT_DIR = path.join(__dirname, '../public/previews-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Only optimize the main preview images (not the numbered ones)
const mainPreviews = ['relay.png', 'neura.png', 'poap.png', 'heuristic.png'];

async function optimizeImage(filename) {
  const inputPath = path.join(INPUT_DIR, filename);
  const nameWithoutExt = path.basename(filename, '.png');

  // Generate optimized WebP version at 1280px width for hover previews
  await sharp(inputPath)
    .resize(1280, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 80 })
    .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`));

  // Generate smaller WebP version for faster initial load
  await sharp(inputPath)
    .resize(640, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 75 })
    .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}-thumb.webp`));

  console.log(`✓ Optimized ${filename}`);
}

async function optimizeAllImages() {
  console.log(`Optimizing ${mainPreviews.length} main preview images...`);

  for (const file of mainPreviews) {
    if (fs.existsSync(path.join(INPUT_DIR, file))) {
      await optimizeImage(file);
    } else {
      console.log(`⚠ ${file} not found, skipping...`);
    }
  }

  console.log('✅ All images optimized!');
}

optimizeAllImages().catch(console.error);