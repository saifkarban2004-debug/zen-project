import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRAMES_DIR = path.join(__dirname, '..', 'public', 'frames');
const WEBP_DIR = path.join(FRAMES_DIR, 'webp');
const WEBP_MOBILE_DIR = path.join(FRAMES_DIR, 'webp-mobile');

const WEBP_QUALITY = 85;
const MOBILE_SCALE = 0.5;

const WEBP_OPTIONS = {
  quality: WEBP_QUALITY,
  effort: 6,
  smartSubsample: true,
};

async function convertFrames() {
  // Create output directories
  fs.mkdirSync(WEBP_DIR, { recursive: true });
  fs.mkdirSync(WEBP_MOBILE_DIR, { recursive: true });

  // Get all PNG frames
  const pngFiles = fs.readdirSync(FRAMES_DIR)
    .filter(f => f.startsWith('frame-') && f.endsWith('.png'))
    .sort();

  console.log(`Found ${pngFiles.length} PNG frames to convert`);
  console.log(`Settings: quality=${WEBP_OPTIONS.quality}, effort=${WEBP_OPTIONS.effort}, smartSubsample=${WEBP_OPTIONS.smartSubsample}`);
  console.log();

  let totalPngSize = 0;
  let totalWebpDesktopSize = 0;
  let totalWebpMobileSize = 0;

  const CONCURRENCY = 4;

  for (let i = 0; i < pngFiles.length; i += CONCURRENCY) {
    const batch = pngFiles.slice(i, i + CONCURRENCY);
    
    await Promise.all(batch.map(async (file) => {
      const inputPath = path.join(FRAMES_DIR, file);
      const webpName = file.replace('.png', '.webp');
      const desktopOutPath = path.join(WEBP_DIR, webpName);
      const mobileOutPath = path.join(WEBP_MOBILE_DIR, webpName);

      const pngStats = fs.statSync(inputPath);
      totalPngSize += pngStats.size;

      // Get image metadata for mobile scaling
      const metadata = await sharp(inputPath).metadata();
      const mobileWidth = Math.round((metadata.width || 1920) * MOBILE_SCALE);

      // Desktop WebP (full resolution, high quality)
      await sharp(inputPath)
        .webp(WEBP_OPTIONS)
        .toFile(desktopOutPath);

      const desktopStats = fs.statSync(desktopOutPath);
      totalWebpDesktopSize += desktopStats.size;

      // Mobile WebP (half resolution, high quality, lanczos3 resize)
      await sharp(inputPath)
        .resize({ width: mobileWidth, kernel: 'lanczos3' })
        .webp(WEBP_OPTIONS)
        .toFile(mobileOutPath);

      const mobileStats = fs.statSync(mobileOutPath);
      totalWebpMobileSize += mobileStats.size;
    }));

    const progress = Math.min(i + CONCURRENCY, pngFiles.length);
    process.stdout.write(`\rConverted ${progress}/${pngFiles.length} frames...`);
  }

  console.log('\n\n=== Conversion Results ===');
  console.log(`Total PNG size:            ${(totalPngSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Total WebP Desktop size:   ${(totalWebpDesktopSize / 1024 / 1024).toFixed(1)} MB (${((1 - totalWebpDesktopSize / totalPngSize) * 100).toFixed(0)}% savings)`);
  console.log(`Total WebP Mobile size:    ${(totalWebpMobileSize / 1024 / 1024).toFixed(1)} MB (${((1 - totalWebpMobileSize / totalPngSize) * 100).toFixed(0)}% savings)`);
  console.log(`\nDesktop frames: ${pngFiles.length} files in ${WEBP_DIR}`);
  console.log(`Mobile frames:  ${pngFiles.length} files in ${WEBP_MOBILE_DIR}`);
}

convertFrames().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
