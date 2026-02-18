"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PlaceholderBadge } from "./PlaceholderBadge";

interface HeroProps {
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  imageSrc?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  overlay?: boolean;
  height?: "full" | "large" | "medium";
}

export function Hero({
  title,
  subtitle,
  videoSrc,
  imageSrc,
  showCta = true,
  ctaText,
  ctaHref = "/projekte",
  overlay = true,
  height = "full",
}: HeroProps) {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
  };

  // Default to video for homepage if neither is specified
  const useVideo = videoSrc || (!imageSrc && !videoSrc);
  const finalVideoSrc = videoSrc || "/images/hero-bg.mp4";

  return (
    <section
      ref={containerRef}
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
    >
      {/* Parallax Background Video or Image */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        {useVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={finalVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageSrc!}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6"
        >
          {title || t("title")}
        </motion.h1>

        {(subtitle ?? t("subtitle")) && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl font-light tracking-wider text-white/90 mb-8"
          >
            {subtitle ?? t("subtitle")}
          </motion.p>
        )}

        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href={ctaHref}
              className="inline-block px-8 py-3 border-2 border-white text-white font-medium tracking-wider text-sm uppercase hover:bg-white hover:text-foreground transition-all duration-300"
            >
              {ctaText || t("cta")}
            </Link>
          </motion.div>
        )}
      </motion.div>

      <PlaceholderBadge src={useVideo ? finalVideoSrc : (imageSrc || "")} className="left-0 top-20" />

      {/* Scroll Indicator */}
      {height === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
