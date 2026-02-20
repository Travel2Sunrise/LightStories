import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { __contentVersion } from "./content-trigger";
void __contentVersion;

/**
 * Get gallery images from a category directory
 * Supports common image formats: jpg, jpeg, png, webp, gif, tiff, tif, bmp
 * Returns images sorted by filename (1.jpg, 2.png, etc.)
 */
export function getCategoryImages(category: string): string[] {
  const imageDir = join(process.cwd(), "public", "images", category);
  
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
      .map((file) => `/images/${category}/${file}`);

    return imageFiles;
  } catch (error) {
    console.error(`Error reading images from ${imageDir}:`, error);
    return [];
  }
}
