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
    
    // Filter for numbered images (1.jpg, 2.png, etc.) and supported formats
    const imageFiles = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."));
        const nameWithoutExt = file.substring(0, file.lastIndexOf("."));
        
        // Check if it's a numbered file (matches pattern like "1", "2", "10", etc.)
        const isNumbered = /^\d+$/.test(nameWithoutExt);
        
        return (
          isNumbered &&
          supportedExtensions.includes(ext) &&
          !file.includes("hero")
        );
      })
      .sort((a, b) => {
        // Sort numerically by the number in the filename
        const numA = parseInt(a.substring(0, a.lastIndexOf(".")));
        const numB = parseInt(b.substring(0, b.lastIndexOf(".")));
        return numA - numB;
      })
      .map((file) => `/images/${category}/${file}`);

    return imageFiles;
  } catch (error) {
    console.error(`Error reading images from ${imageDir}:`, error);
    return [];
  }
}
