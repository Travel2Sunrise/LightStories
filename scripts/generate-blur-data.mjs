/**
 * Blur Placeholder Data Generator
 *
 * Generates tiny base64-encoded blur placeholders for all images in public/images/.
 * Outputs a JSON manifest used by components for Next.js placeholder="blur".
 *
 * Run: node scripts/generate-blur-data.mjs
 */

import sharp from 'sharp';
import { readdir, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const imagesDir = join(projectRoot, 'public', 'images');
const outputPath = join(projectRoot, 'src', 'config', 'blur-data.json');

const SUPPORTED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif', '.bmp',
]);

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

async function generateBlurDataURL(filePath) {
  const buffer = await sharp(filePath)
    .resize(10, undefined, { fit: 'inside' })
    .blur(2)
    .jpeg({ quality: 30 })
    .toBuffer();

  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

async function main() {
  console.log('\n=== Generating blur placeholder data ===\n');

  if (!existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = await getAllImages(imagesDir);
  console.log(`Found ${files.length} images\n`);

  const blurData = {};
  let count = 0;

  for (const file of files) {
    const relPath = relative(join(projectRoot, 'public'), file);
    const webPath = '/' + relPath.split('/').join('/'); // Ensure forward slashes

    try {
      blurData[webPath] = await generateBlurDataURL(file);
      count++;
      if (count % 20 === 0) {
        console.log(`  Processed ${count}/${files.length}...`);
      }
    } catch (err) {
      console.error(`  ERROR ${webPath}: ${err.message}`);
    }
  }

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  await writeFile(outputPath, JSON.stringify(blurData, null, 2));

  console.log(`\n  Generated ${count} blur placeholders`);
  console.log(`  Written to: ${relative(projectRoot, outputPath)}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
