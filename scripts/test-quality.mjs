import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRAMES_DIR = path.join(__dirname, '..', 'public', 'frames');
const TEST_DIR = path.join(FRAMES_DIR, 'quality-test');

// Test with frames that likely have fine detail: early (label), mid (bottle), late (close-up)
const TEST_FRAMES = ['frame-0001.png', 'frame-0050.png', 'frame-0100.png', 'frame-0150.png'];

const QUALITY_LEVELS = [65, 75, 80, 85, 90];

async function runTests() {
  fs.mkdirSync(TEST_DIR, { recursive: true });

  console.log('=== SOURCE FRAME ANALYSIS ===\n');

  for (const frame of TEST_FRAMES) {
    const inputPath = path.join(FRAMES_DIR, frame);
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${frame} not found, skipping`);
      continue;
    }

    const metadata = await sharp(inputPath).metadata();
    const stats = fs.statSync(inputPath);
    console.log(`${frame}:`);
    console.log(`  Resolution: ${metadata.width} × ${metadata.height}`);
    console.log(`  Format: ${metadata.format}, Channels: ${metadata.channels}, Space: ${metadata.space}`);
    console.log(`  PNG size: ${(stats.size / 1024).toFixed(0)} KB`);
    console.log();
  }

  console.log('=== QUALITY COMPARISON ===\n');
  console.log('Frame'.padEnd(20) + QUALITY_LEVELS.map(q => `Q${q}`.padStart(10)).join('') + '  nearLoss'.padStart(12) + '  lossless'.padStart(12));
  console.log('-'.repeat(20 + QUALITY_LEVELS.length * 10 + 24));

  for (const frame of TEST_FRAMES) {
    const inputPath = path.join(FRAMES_DIR, frame);
    if (!fs.existsSync(inputPath)) continue;

    const baseName = frame.replace('.png', '');
    let row = baseName.padEnd(20);

    // Test each quality level with optimized settings
    for (const quality of QUALITY_LEVELS) {
      const outPath = path.join(TEST_DIR, `${baseName}_q${quality}.webp`);
      await sharp(inputPath)
        .webp({
          quality,
          effort: 6,            // Higher effort = better compression at same quality
          smartSubsample: true,  // Smarter chroma subsampling for gradients
        })
        .toFile(outPath);

      const size = fs.statSync(outPath).size;
      row += `${(size / 1024).toFixed(0)} KB`.padStart(10);
    }

    // Near-lossless mode
    const nlPath = path.join(TEST_DIR, `${baseName}_nearLossless.webp`);
    await sharp(inputPath)
      .webp({
        nearLossless: true,
        effort: 6,
      })
      .toFile(nlPath);
    const nlSize = fs.statSync(nlPath).size;
    row += `${(nlSize / 1024).toFixed(0)} KB`.padStart(12);

    // Lossless mode
    const llPath = path.join(TEST_DIR, `${baseName}_lossless.webp`);
    await sharp(inputPath)
      .webp({
        lossless: true,
        effort: 6,
      })
      .toFile(llPath);
    const llSize = fs.statSync(llPath).size;
    row += `${(llSize / 1024).toFixed(0)} KB`.padStart(12);

    console.log(row);
  }

  // Also test the MOBILE resize quality
  console.log('\n=== MOBILE RESIZE QUALITY CHECK ===\n');
  console.log('Testing resize algorithms on frame-0100.png at 50% width:\n');

  const mobileTestFrame = path.join(FRAMES_DIR, 'frame-0100.png');
  if (fs.existsSync(mobileTestFrame)) {
    const metadata = await sharp(mobileTestFrame).metadata();
    const halfWidth = Math.round((metadata.width || 1920) * 0.5);

    const resizeKernels = ['nearest', 'cubic', 'lanczos2', 'lanczos3'];
    
    for (const kernel of resizeKernels) {
      const outPath = path.join(TEST_DIR, `mobile_resize_${kernel}_q85.webp`);
      await sharp(mobileTestFrame)
        .resize({ width: halfWidth, kernel })
        .webp({ quality: 85, effort: 6, smartSubsample: true })
        .toFile(outPath);

      const size = fs.statSync(outPath).size;
      console.log(`  ${kernel.padEnd(12)} → ${(size / 1024).toFixed(0)} KB`);
    }

    // Check what the DEFAULT resize kernel is (sharp defaults to 'lanczos3')
    const defaultPath = path.join(TEST_DIR, `mobile_resize_default_q85.webp`);
    await sharp(mobileTestFrame)
      .resize({ width: halfWidth })  // No kernel specified = sharp default
      .webp({ quality: 85, effort: 6, smartSubsample: true })
      .toFile(defaultPath);
    const defaultSize = fs.statSync(defaultPath).size;
    console.log(`  default.    → ${(defaultSize / 1024).toFixed(0)} KB (sharp default = lanczos3)`);
  }

  console.log(`\n=== TEST FILES SAVED ===`);
  console.log(`Open ${TEST_DIR} to visually compare quality.`);
  console.log(`Compare especially: label text sharpness, gradient smoothness, condensation detail.`);
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
