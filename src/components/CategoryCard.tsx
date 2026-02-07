"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  index?: number;
}

export function CategoryCard({
  title,
  description,
  imageSrc,
  href,
  index = 0,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white/90 text-sm font-light">{description}</p>
          </div>
        </div>
        
        {/* Title Below Image */}
        <div className="mt-4 text-center">
          <h3 className="text-lg md:text-xl font-light tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
