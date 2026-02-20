import placeholderManifest from "@/config/placeholder-media.json";

const SHOW_PLACEHOLDERS =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

const placeholderSet = new Set(placeholderManifest.media);

export function isPlaceholder(src: string): boolean {
  if (!SHOW_PLACEHOLDERS) return false;
  return placeholderSet.has(src);
}
