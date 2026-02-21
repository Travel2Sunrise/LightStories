import blurData from "@/config/blur-data.json";

const blurMap = blurData as Record<string, string>;

export function getBlurDataURL(src: string): string | undefined {
  return blurMap[src];
}
