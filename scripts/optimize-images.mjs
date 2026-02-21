/**
 * Image Optimization Script
 *
 * Resizes all images in public/images/ to web-appropriate dimensions
 * and compresses them as high-quality JPEG. Backs up originals first.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # Optimize all images
 *   node scripts/optimize-images.mjs --dry-run   # Preview changes without modifying
 */

import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const imagesDir = join(projectRoot, 'public', 'images');
const backupDir = join(projectRoot, 'originals-backup');

const MAX_DIMENSION = 2400;
const JPEG_QUALITY = 85;

const SUPPORTED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif', '.bmp',
]);

const dryRun = process.argv.includes('--dry-run');

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function optimizeImage(filePath) {
  const relPath = relative(imagesDir, filePath);
  const fileStat = await stat(filePath);
  const originalSize = fileStat.size;

  // Read metadata to check dimensions
  const metadata = await sharp(filePath).metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    console.log(`  SKIP  ${relPath} (could not read dimensions)`);
    return { skipped: true };
  }

  const longestEdge = Math.max(width, height);

  if (longestEdge <= MAX_DIMENSION) {
    console.log(`  SKIP  ${relPath} (${width}x${height}, already ≤ ${MAX_DIMENSION}px)`);
    return { skipped: true };
  }

  // Calculate new dimensions
  const scale = MAX_DIMENSION / longestEdge;
  const newWidth = Math.round(width * scale);
  const newHeight = Math.round(height * scale);

  if (dryRun) {
    console.log(`  WOULD ${relPath}`);
    console.log(`         ${width}x${height} → ${newWidth}x${newHeight} (${formatBytes(originalSize)} → ~estimated)`);
    return { skipped: false, originalSize, newSize: 0 };
  }

  // Backup original
  const backupPath = join(backupDir, relPath);
  const backupDirPath = dirname(backupPath);
  if (!existsSync(backupDirPath)) {
    await mkdir(backupDirPath, { recursive: true });
  }
  if (!existsSync(backupPath)) {
    await copyFile(filePath, backupPath);
  }

  // Optimize: resize, convert to sRGB, strip metadata, output as JPEG
  const outputBuffer = await sharp(filePath)
    .rotate()                              // Apply EXIF orientation
    .resize(newWidth, newHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toColorspace('srgb')
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  // Write optimized image back (keep original extension for .jpg/.jpeg, convert others to .jpg)
  const ext = extname(filePath).toLowerCase();
  let outputPath = filePath;
  if (ext !== '.jpg' && ext !== '.jpeg') {
    // For PNG, WebP, etc. — output as .jpg alongside (and we write the jpg)
    outputPath = filePath.replace(/\.[^.]+$/, '.jpg');
  }

  await writeFile(outputPath, outputBuffer);

  const newSize = outputBuffer.length;
  const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

  console.log(`  DONE  ${relPath}`);
  console.log(`         ${width}x${height} → ${newWidth}x${newHeight} | ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% saved)`);

  return { skipped: false, originalSize, newSize };
}

async function main() {
  console.log(dryRun ? '\n=== DRY RUN (no files will be modified) ===\n' : '\n=== Optimizing images ===\n');

  if (!existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = await getAllImages(imagesDir);
  console.log(`Found ${files.length} images\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let optimizedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    try {
      const result = await optimizeImage(file);
      if (result.skipped) {
        skippedCount++;
      } else {
        optimizedCount++;
        totalOriginal += result.originalSize;
        totalNew += result.newSize;
      }
    } catch (err) {
      console.error(`  ERROR ${relative(imagesDir, file)}: ${err.message}`);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`  Optimized: ${optimizedCount}`);
  console.log(`  Skipped:   ${skippedCount}`);
  if (!dryRun && optimizedCount > 0) {
    const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
    console.log(`  Original:  ${formatBytes(totalOriginal)}`);
    console.log(`  Optimized: ${formatBytes(totalNew)}`);
    console.log(`  Saved:     ${formatBytes(totalOriginal - totalNew)} (${totalSavings}%)`);
    console.log(`\n  Originals backed up to: ${relative(projectRoot, backupDir)}/`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
