import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { __contentVersion } from "./content-trigger";
void __contentVersion;

/**
 * Get gallery images from an image directory (relative to public/images/).
 * Supports common image formats: jpg, jpeg, png, webp, gif, tiff, tif, bmp
 * Returns images sorted by filename (1.jpg, 2.png, etc.)
 * Excludes hero images (hero.*, hero-bg.*).
 */
export function getImagesFromDir(dir: string): string[] {
  const imageDir = join(process.cwd(), "public", "images", dir);
  
  if (!existsSync(imageDir)) {
    return [];
  }

  const supportedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".tiff",
    ".tif",
    ".bmp",
  ];

  try {
    const files = readdirSync(imageDir);
    
    // Filter for supported image formats, excluding hero images
    const imageFiles = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."));
        const nameWithoutExt = file.substring(0, file.lastIndexOf(".")).toLowerCase();

        return (
          supportedExtensions.includes(ext) &&
          !nameWithoutExt.startsWith("hero")
        );
      })
      .sort((a, b) => {
        const nameA = a.substring(0, a.lastIndexOf("."));
        const nameB = b.substring(0, b.lastIndexOf("."));
        // Sort numbered files first, then alphabetically
        const numA = parseInt(nameA);
        const numB = parseInt(nameB);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        if (!isNaN(numA)) return -1;
        if (!isNaN(numB)) return 1;
        return nameA.localeCompare(nameB);
      })
      .map((file) => `/images/${dir}/${file}`);

    return imageFiles;
  } catch (error) {
    console.error(`Error reading images from ${imageDir}:`, error);
    return [];
  }
}

/** Backwards-compatible alias for category pages. */
export function getCategoryImages(category: string): string[] {
  return getImagesFromDir(category);
}

/**
 * Auto-discover gallery images for a project based on its heroImage path.
 * Derives the directory from e.g. "/images/projekte/anna-portrait/hero.jpg"
 * → reads all non-hero images from public/images/projekte/anna-portrait/.
 */
export function getProjectImages(heroImage: string): string[] {
  // heroImage is like "/images/projekte/taufe-max/hero.png"
  // Strip leading "/images/" and take the directory part
  const withoutPrefix = heroImage.replace(/^\/images\//, "");
  const dir = withoutPrefix.substring(0, withoutPrefix.lastIndexOf("/"));
  return getImagesFromDir(dir);
}
