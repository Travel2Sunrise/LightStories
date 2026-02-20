"use client";

import { isPlaceholder } from "@/lib/placeholders";

export function PlaceholderBadge({ src, className }: { src: string; className?: string }) {
  if (!isPlaceholder(src)) return null;

  return (
    <div
      className={`absolute top-0 left-0 z-40 overflow-hidden pointer-events-none ${className || ""}`}
      style={{ width: "150px", height: "150px" }}
      aria-hidden="true"
    >
      <div
        className="absolute text-white text-xs font-bold tracking-widest uppercase text-center"
        style={{
          width: "200px",
          transform: "rotate(-45deg) translateX(-50px) translateY(-10px)",
          backgroundColor: "rgba(220, 38, 38, 0.85)",
          padding: "6px 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        PLACEHOLDER
      </div>
    </div>
  );
}
