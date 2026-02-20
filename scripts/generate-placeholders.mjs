/**
 * Placeholder Image Generator using Sharp
 * 
 * This script creates placeholder images for development.
 * Replace these with actual photos before production.
 * 
 * Run: node scripts/generate-placeholders.mjs
 */

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');

const escapeXml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const generatePlaceholder = async (outputPath, width, height, text, bgColor = '#d4c4b0') => {
  const escapedText = escapeXml(text);
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
<rect width="100%" height="100%" fill="${bgColor}"/>
<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 15}" fill="#8b7355" text-anchor="middle" dy=".3em">${escapedText}</text>
</svg>`;
  
  const fullPath = join(publicDir, outputPath);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 80 })
    .toFile(fullPath);
  
  console.log(`Created: ${outputPath}`);
};

const images = [
  // Hero images
  { path: 'hero/main.jpg', text: 'LIGHTSTORIES', w: 1920, h: 1080 },
  { path: 'hochzeit/hero.jpg', text: 'HOCHZEIT', w: 1920, h: 1080 },
  { path: 'portrait/hero.jpg', text: 'PORTRAIT', w: 1920, h: 1080 },
  { path: 'familie/hero.jpg', text: 'FAMILIE', w: 1920, h: 1080 },
  
  // Hochzeit gallery
  ...Array.from({ length: 6 }, (_, i) => ({
    path: `hochzeit/${i + 1}.jpg`,
    text: `Hochzeit ${i + 1}`,
    w: 1200,
    h: 1500
  })),
  
  // Portrait gallery
  ...Array.from({ length: 6 }, (_, i) => ({
    path: `portrait/${i + 1}.jpg`,
    text: `Portrait ${i + 1}`,
    w: 1200,
    h: 1500
  })),
  
  // Familie gallery
  ...Array.from({ length: 6 }, (_, i) => ({
    path: `familie/${i + 1}.jpg`,
    text: `Familie ${i + 1}`,
    w: 1200,
    h: 1500
  })),
  
  // Project: Babybauch Sarah
  { path: 'projekte/babybauch-sarah/hero.jpg', text: 'Babybauch Sarah', w: 1920, h: 1080 },
  ...Array.from({ length: 6 }, (_, i) => ({
    path: `projekte/babybauch-sarah/${i + 1}.jpg`,
    text: `Babybauch ${i + 1}`,
    w: 1200,
    h: 1500
  })),
  
  // Project: Anna Portrait
  { path: 'projekte/anna-portrait/hero.jpg', text: 'Anna Portrait', w: 1920, h: 1080 },
  ...Array.from({ length: 4 }, (_, i) => ({
    path: `projekte/anna-portrait/${i + 1}.jpg`,
    text: `Portrait ${i + 1}`,
    w: 1200,
    h: 1500
  })),
  
  // Project: Taufe Max
  { path: 'projekte/taufe-max/hero.jpg', text: 'Taufe Max', w: 1920, h: 1080 },
  ...Array.from({ length: 5 }, (_, i) => ({
    path: `projekte/taufe-max/${i + 1}.jpg`,
    text: `Taufe ${i + 1}`,
    w: 1200,
    h: 1500
  })),
];

console.log('Generating placeholder images...\n');

for (const { path, text, w, h } of images) {
  await generatePlaceholder(path, w, h, text);
}

console.log('\nPlaceholder images created!');
console.log('Note: Replace these with actual photos before production.');
