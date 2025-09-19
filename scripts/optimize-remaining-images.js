const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(__dirname, '../public/remaining-images-optimized');

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

// List of remaining large images to optimize
const remainingImages = [
  'liamlook.jpg',
  'neura.gif',
  'neurabox.gif'
];

async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  const ext = path.extname(filename).toLowerCase();

  for (const size of sizes) {
    try {
      // For GIFs, convert to static PNG/WebP (first frame)
      if (ext === '.gif') {
        // Generate WebP version (static, first frame)
        await sharp(inputPath, { animated: false })
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 85 })
          .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.webp`));

        // Generate optimized PNG version (static, first frame)
        await sharp(inputPath, { animated: false })
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.png`));
      } else {
        // For JPEG/PNG, optimize normally
        // Generate WebP version
        await sharp(inputPath)
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 85 })
          .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.webp`));

        // Generate optimized version in original format
        if (ext === '.jpg' || ext === '.jpeg') {
          await sharp(inputPath)
            .resize(size.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .jpeg({ quality: 85, progressive: true })
            .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.jpg`));
        } else {
          await sharp(inputPath)
            .resize(size.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}${size.suffix}.png`));
        }
      }
    } catch (error) {
      console.error(`✗ Error optimizing ${filename} at ${size.width}px:`, error.message);
    }
  }

  console.log(`✓ Optimized ${filename}`);
}

async function optimizeRemainingImages() {
  console.log(`Starting optimization of ${remainingImages.length} remaining images...`);

  for (const file of remainingImages) {
    const inputPath = path.join(INPUT_DIR, file);
    
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, file);
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  }

  console.log('✅ All remaining images optimized!');
}

optimizeRemainingImages().catch(console.error);