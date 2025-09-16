const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(__dirname, '../public/project-images-optimized');

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

// List of project images to optimize (excluding previews and already optimized images)
const projectImages = [
  'relayfull.png',
  'relayofull.png',
  'relaylogo.png',
  'relaycolors.png',
  'relaydesign.png',
  'neuraext.png',
  'box.png',
  'neurabox.png',
  'neura.gif',
  'neurabox.gif'
];

async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  const ext = path.extname(filename).toLowerCase();

  // Skip GIFs for now (Next.js handles them differently)
  if (ext === '.gif') {
    console.log(`⏭️  Skipping GIF: ${filename}`);
    return;
  }

  for (const size of sizes) {
    try {
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
    } catch (error) {
      console.error(`✗ Error optimizing ${filename} at ${size.width}px:`, error.message);
    }
  }

  console.log(`✓ Optimized ${filename}`);
}

async function optimizeAllProjectImages() {
  console.log(`Starting optimization of ${projectImages.length} project images...`);

  for (const file of projectImages) {
    const inputPath = path.join(INPUT_DIR, file);
    
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, file);
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  }

  console.log('✅ All project images optimized!');
}

optimizeAllProjectImages().catch(console.error);