"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PlaceholderBadge } from "./PlaceholderBadge";

interface GalleryProps {
  images: {
    src: string;
    alt?: string;
    blurDataURL?: string;
  }[];
  columns?: 2 | 3 | 4;
}

export function Gallery({ images, columns = 3 }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const columnClasses = {
    2: "columns-1 md:columns-2",
    3: "columns-1 md:columns-2 lg:columns-3",
    4: "columns-2 md:columns-3 lg:columns-4",
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    
    if (e.key === "Escape") {
      setSelectedImage(null);
    } else if (e.key === "ArrowRight") {
      setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : 0));
    } else if (e.key === "ArrowLeft") {
      setSelectedImage((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : 0
      );
    }
  };

  return (
    <>
      <div className={`${columnClasses[columns]} gap-4`}>
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="relative overflow-hidden cursor-pointer group mb-4 break-inside-avoid"
            onClick={() => setSelectedImage(index)}
          >
            <PlaceholderBadge src={image.src} />
            <Image
              src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder={image.blurDataURL ? "blur" : undefined}
              blurDataURL={image.blurDataURL}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(
                  (prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0)
                );
              }}
              aria-label="Previous image"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : 0));
              }}
              aria-label="Next image"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <PlaceholderBadge src={images[selectedImage].src} />
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt || `Gallery image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
                placeholder={images[selectedImage].blurDataURL ? "blur" : undefined}
                blurDataURL={images[selectedImage].blurDataURL}
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
