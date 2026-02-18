"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Project } from "@/lib/mdx";
import { PlaceholderBadge } from "@/components/PlaceholderBadge";

interface ProjectsGridProps {
  projects: Project[];
}

const categories = ["all", "hochzeit", "portrait", "familie"] as const;

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const t = useTranslations("projects");
  const tCategories = useTranslations("categories");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.frontmatter.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    if (cat === "all") return t("allCategories");
    return tCategories(cat as "hochzeit" | "portrait" | "familie");
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">{t("noProjects")}</p>
      </div>
    );
  }

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors duration-300 ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-muted text-foreground hover:bg-secondary"
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/projekte/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
                <PlaceholderBadge src={project.frontmatter.heroImage} />
                <Image
                  src={project.frontmatter.heroImage}
                  alt={project.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div>
                <p className="text-xs text-primary uppercase tracking-wider mb-1">
                  {tCategories(project.frontmatter.category)}
                </p>
                <h3 className="text-lg font-light tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.frontmatter.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.frontmatter.description || project.frontmatter.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("noProjects")}</p>
        </div>
      )}
    </>
  );
}
