import { watch, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentDir = join(root, "src/content");
const imagesDir = join(root, "public/images");
const triggerFile = join(root, "src/lib/content-trigger.ts");

let debounceTimer;

function writeTrigger(filename) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`[content-watcher] Change detected: ${filename}`);
    writeFileSync(
      triggerFile,
      `// Auto-updated in dev mode when content/image files change to trigger HMR.\nexport const __contentVersion = ${Date.now()};\n`
    );
  }, 100);
}

if (existsSync(contentDir)) {
  watch(contentDir, { recursive: true }, (_event, filename) => {
    if (filename && filename.endsWith(".mdx")) {
      writeTrigger(filename);
    }
  });
}

if (existsSync(imagesDir)) {
  watch(imagesDir, { recursive: true }, (_event, filename) => {
    if (filename && /\.(png|jpe?g|webp|avif|gif|svg|mp4)$/i.test(filename)) {
      writeTrigger(filename);
    }
  });
}

console.log("[content-watcher] Watching src/content/ and public/images/ ...");
