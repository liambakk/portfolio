const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/previews');
const OUTPUT_DIR = path.join(__dirname, '../public/previews-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image optimization settings
const sizes = [
  { width: 640, suffix: '-sm' },
  { width: 1280, suffix: '-md' },
  { width: 1920, suffix: '-lg' }
];

async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));

  for (const size of sizes) {
    // Generate WebP version
    await sharp(inputPath)
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85 })
      .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.webp`));

    // Generate optimized PNG version
    await sharp(inputPath)
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.png`));
  }

  console.log(`✓ Optimized ${filename}`);
}

async function optimizeAllImages() {
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file =>
    ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())
  );

  console.log(`Found ${imageFiles.length} images to optimize...`);

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    await optimizeImage(inputPath, file);
  }

  console.log('✅ All images optimized!');
}

optimizeAllImages().catch(console.error);